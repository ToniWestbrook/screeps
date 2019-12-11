var behaviorSpawn = {

    setup: function() { },
    
    run: function() {
        var globalConfig = require("configuration");
        var creepBehavior = require("behavior.creep");

        // Cooldown necessary as this.spawning not set for 2 ticks, and to sync between spawns
        if (this.room.memory.spawnCool == null || this.room.memory.spawnCool < 0) {
            this.room.memory.spawnCool = 0;
        }
        
        // Create new creeps if not spawning
        if (!this.spawning && this.room.memory.spawnCool-- <= 0) {
            // Lookup each class of creep within room
            for (var clsName of Object.keys(globalConfig.rooms[this.room.name].creeps)) {
                // Lookup profile assigned to this class
                var classConfig = globalConfig.rooms[this.room.name].creeps[clsName];

                // Count number of creeps belonging to this room
                var creeps = _.filter(Game.creeps, (creep) => 
                    (creep.memory.cls == clsName) && (creep.memory.home == this.room.name));

                // Generate creeps if under max
                if(creeps.length < classConfig.count) {
                    var newName = this.nameCreep(clsName, classConfig);
                    
                    console.log(`Spawning new ${clsName} in ${this.room.name} (${this.name}): ${newName}`);
                    this.spawnCreep(globalConfig.profiles[classConfig.profile].parts, newName, 
                        {memory: {cls: clsName, home: this.room.name}});
                    this.room.memory.spawnCool = 10;
                    break;
                }
            }
        }
        
        // Note current spawn        
        if(this.spawning) { 
            var spawningCreep = Game.creeps[this.spawning.name];
            this.room.visual.text(
                '🛠️' + spawningCreep.name,
                this.pos.x + 1, 
                this.pos.y, 
                {align: 'left', opacity: 0.8});
        }

	},
	
	// Find next free creep name for given type
	nameCreep: function(cls, classConfig) {
	    var nextNum = 0;
	    var base = cls[0];
	    
	    // Use name if manually specified
	    if ("name" in classConfig) {
	        base = classConfig.name;
	    }

	    while (`${base}${nextNum}` in Game.creeps) {
	        nextNum++;
	    }
	    
	    return `${base}${nextNum}`;
	}
};

module.exports = behaviorSpawn;