
var behaviorHarvester = {

    run: function() {
        this.reportInfo();

       if ((this.memory.mode != "harvest") && (this.store.getUsedCapacity() == 0)) {
            this.memory.mode = "harvest";
            this.reportMode();
            
        }
        if ((this.memory.mode != "service") && (this.store.getFreeCapacity() == 0)) {
            this.memory.mode = "service";
            this.reportMode();
        }

        // Perform operation
	    if (this.memory.mode == "service") {
	        // Service home room
	        if (this.moveHome()) return;
            
            // Spawn and extensions have highest service priority
            var targets = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                this.serviceTarget(targets[0]);
                return;
            }
            
            // Service towers next
            var targets = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                this.serviceTarget(targets[0]);
                return;
            }
        }
        else {
            // Harvest
            this.harvestFull();
        }
	},
	
	serviceTarget: function serviceTarget(target) {
        if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
	},

};

module.exports = behaviorHarvester;