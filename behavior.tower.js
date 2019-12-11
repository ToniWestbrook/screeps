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
        for (var type of ["repair", "defense"]) {
            var structures = this.room.find(FIND_STRUCTURES, 
                {filter: function(object) {
                    result = (type == "defense") && [STRUCTURE_WALL, STRUCTURE_RAMPART].includes(object.structureType);
                    result = result || ((type == "repair") && ![STRUCTURE_WALL, STRUCTURE_RAMPART].includes(object.structureType));
                    hits = (type == "defense") ? object.hits : object.hits / object.hitsMax;
                    
                    return result && (hits < this.configStructure[type]);
                }.bind(this)});
            
            if (structures.length > 0) {
                // Find structure with most damage
                var minHits = (type == "defense") ? 1e20 : 1.0;
                var minIdx = 0;
                
                for (var idx = 0 ; idx < structures.length ; idx++) {
                    hits = (type == "defense") ? structures[idx].hits : structures[idx].hits / structures[idx].hitsMax;
                    if (hits < minHits) {
                        minHits = hits;
                        minIdx = idx;
                    }
                }
                
                // Repair structure
                this.repair(structures[minIdx]);
                break;
            }
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
	
};

module.exports = behaviorTower;