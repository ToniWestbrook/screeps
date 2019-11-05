var behaviorUpgrader = {

    /** @param {Creep} creep **/
    run: function() {
        this.reportInfo();

       if ((this.memory.mode != "harvest") && (this.store.getUsedCapacity() == 0)) {
            this.memory.mode = "harvest";
            this.reportMode();
            
        }
        if ((this.memory.mode != "upgrade") && (this.store.getFreeCapacity() == 0)) {
            this.memory.mode = "upgrade";
            this.reportMode();
        }

	    if(this.memory.mode == "upgrade") {
	        // Upgrade home room
	        if (this.moveHome()) return;

            if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
                this.moveTo(this.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                return;
            }
        }
        else {
            // Harvest
            this.harvestFull();
        }
	}
};

module.exports = behaviorUpgrader;