var behaviorTower = {

    run: function() {
        // Search for hostiles
        var hostiles = this.room.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            // Attack hostile and send email
            this.attackHostile(hostiles[0]);
            return;
        }
        
        // Leave energy remaining for attacks
        if (this.store[RESOURCE_ENERGY] <= this.configStructure.reserve) {
            return;
        }
        
        // Search for creeps to heal
        if (this.configStructure.heal) {
            var creeps = this.room.find(FIND_MY_CREEPS, {filter: function(object) {return object.hits < object.hitsMax}});
            if (creeps.length > 0) {
                // Heal Creep
                this.healCreep(creeps[0]);
                return;
            }
        }

        // Search for structures to repair
        var structures = this.room.find(FIND_STRUCTURES, 
            {filter: function(object) {return object.hits / object.hitsMax < this.configStructure.repair}.bind(this)});
            
        if (structures.length > 0) {
            // Find structure with most damage
            var minHits = 1.0;
            var minIdx = 0;
            
            for (var idx = 0 ; idx < structures.length ; idx++) {
                curHits = structures[idx].hits / structures[idx].hitsMax;
                if (curHits < minHits) {
                    minHits = curHits;
                    minIdx = idx;
                }
            }
            
            // Repair structure
            this.repairStructure(structures[minIdx]);
        }
        
	},
	
	attackHostile: function(target) {
        var username = target.owner.username;
        var roomname = this.room.name;
        
        Game.notify(`User ${username} spotted in room ${roomname}`);
        this.attack(target);
	},
	
	healCreep: function(target) {
        this.heal(target);
	},
	
	repairStructure: function(target) {
        this.repair(target);
	},
	
};

module.exports = behaviorTower;