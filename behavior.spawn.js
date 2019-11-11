var behaviorSpawn = {

    setup: function() { },
    
    run: function() {
        var configuration = require("configuration");
        var creepBehavior = require("behavior.creep");

        // Cooldown necessary as this.spawning not set for 2 ticks
        if (this.memory.cooldown == null || this.memory.cooldown < 0) {
            this.memory.cooldown = 0;
        }
        
        // Create new creeps if not spawning
        if (!this.spawning && this.memory.cooldown-- <= 0) {
            
            for (profile of Object.keys(configuration.rooms[this.room.name].creeps)) {
                // Count number of creeps belonging to this room
                var creeps = _.filter(Game.creeps, (creep) => 
                    (creep.memory.profile == profile) && (creep.memory.home == this.room.name));

                // Generate creeps if under max
                if(creeps.length < configuration.rooms[this.room.name].creeps[profile].count) {
                    var newName = this.nameCreep(profile);
                    
                    console.log(`Spawning new ${profile} in ${this.room.name}: ${newName}`);
                    this.spawnCreep(configuration.profiles[profile].parts, newName, 
                        {memory: {profile: profile, home: this.room.name}});
                    this.memory.cooldown = 5;
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
	nameCreep: function(type) {
	    var nextNum = 0;
	    
	    while (`${type[0]}${nextNum}` in Game.creeps) {
	        nextNum++;
	    }
	    
	    return `${type[0]}${nextNum}`;
	}
};

module.exports = behaviorSpawn;