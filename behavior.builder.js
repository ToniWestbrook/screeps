var behaviorBuilder = {

    /** @param {Creep} creep **/
    run: function() {
        configuration = require("configuration");

        this.reportInfo();

        if ((this.memory.mode != "harvest") && (this.store[RESOURCE_ENERGY] == 0)) {
            this.memory.mode = "harvest";
            this.reportMode();
            
        }
        if ((this.memory.mode != "build") && (this.store.getFreeCapacity() == 0)) {
            this.memory.mode = "build";
            this.reportMode();
        }

	    if (this.memory.mode == "build") {
	        // First check for repairs
	        var targets = this.room.find(FIND_STRUCTURES, 
	            {filter: function(object) {return (object.hits / object.hitsMax < configuration.builderRepair) && (object.structureType != STRUCTURE_RAMPART)}});
            
            if(targets.length) {
                found = false;
                for (target of targets) {
                    found = found || (this.repair(target) != ERR_NOT_IN_RANGE)
                }
                
                if (!found) {
                    this.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                // If no repairs necessary, build new
    	        var targets = this.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    found = false;
                    for (target of targets) {
                        found = found || (this.build(target) != ERR_NOT_IN_RANGE)
                    }
                    
                    if (!found) {
                        this.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
	    }
	    else {
            // Harvest
            this.harvestFull();
	    }
	}
};

module.exports = behaviorBuilder;