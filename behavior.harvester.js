
var behaviorHarvester = {

    run: function(creep) {
        creep.say("H:" + creep.ticksToLive);

        // Calculate harvest/service mode
        if (creep.store.getUsedCapacity() == 0) {
            creep.memory.mode = "harvest";
        }
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.mode = "service";
        }

        // Perform operation
	    if(creep.memory.mode == "harvest") {
            var sources = creep.room.find(FIND_SOURCES);
            this.harvestTarget(creep, sources[0]);
        }
        else {
            // Spawn and extensions have highest service priority
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                this.serviceTarget(creep, targets[0]);
                return;
            }
            
            // Service towers next
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                this.serviceTarget(creep, targets[0]);
                return;
            }
            
        }
	},
	
	harvestTarget: function harvestTarget(creep, target) {
        if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
	},
	
	serviceTarget: function serviceTarget(creep, target) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
	},

};

module.exports = behaviorHarvester;