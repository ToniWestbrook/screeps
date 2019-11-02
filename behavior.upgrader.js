var behaviorUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say("U:" + creep.ticksToLive);
        
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
	        // Move to correct room if necessary
	        
	        if (creep.room.name != "W43N1") {
	            creep.moveTo(new RoomPosition(30, 30, "W43N1"));
	            return;    
	        }
	        
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // Check for energy and tombstones
            var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
            if (energy.length) {
                if (creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return;
            }

            // Check for tombstone
            var tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 1);
            if (tombstones.length) {
                creep.withdraw(tombstones[0], RESOURCE_ENERGY);
                //creep.moveTo(tombstones[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                return;
            }
            
	        // Move to correct room if necessary
	        if (creep.room.name != "W44N1") {
	            creep.moveTo(new RoomPosition(30, 30, "W44N1"));
	            return;    
	        }
	        
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = behaviorUpgrader;