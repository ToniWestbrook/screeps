var behaviorTower = {

    run: function(tower) {
        configuration = require("configuration");
        
        // Search for hostiles
        var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            // Attack hostile and send email
            this.attackHostile(tower, hostiles[0]);
            return;
        }
        
        // Leave energy remaining for attacks
        if (tower.store[RESOURCE_ENERGY] <= configuration.towerReserve) {
            return;
        }
        
        // Search for creeps to heal
        var creeps = tower.room.find(FIND_MY_CREEPS, {filter: function(object) {return object.hits < object.hitsMax}});
        if (creeps.length > 0) {
            // Heal Creep
            this.healCreep(tower, creeps[0]);
            return;
        }
        
        // Search for structures to repair
        var structures = tower.room.find(FIND_STRUCTURES, {filter: function(object) {return object.hits / object.hitsMax < configuration.towerRepair}});
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
            this.repairStructure(tower, structures[minIdx]);
            return;
        }
        
	},
	
	attackHostile: function(tower, target) {
        var username = target.owner.username;
        var roomname = tower.room.name;
        
        Game.notify(`User ${username} spotted in room ${roomname}`);
        tower.attack(target);
	},
	
	healCreep: function(tower, target) {
        tower.heal(target);
	},
	
	repairStructure: function(tower, target) {
        tower.repair(target);
	},
	
};

module.exports = behaviorTower;