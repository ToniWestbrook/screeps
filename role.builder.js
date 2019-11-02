var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say("B:" + creep.ticksToLive);
        
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        // First check for repairs
	        var targets = creep.room.find(FIND_STRUCTURES, {filter: function(object) {return object.hits / object.hitsMax < 0.5}});
            if(targets.length) {
                found = false;
                for (target of targets) {
                    found = found || (creep.repair(target) != ERR_NOT_IN_RANGE)
                }
                
                if (!found) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                // If no repairs necessary, build new
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    found = false;
                    for (target of targets) {
                        found = found || (creep.build(target) != ERR_NOT_IN_RANGE)
                    }
                    
                    if (!found) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;