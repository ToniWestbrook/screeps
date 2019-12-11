var behaviorGeneric = {

    run: function() {
       this.reportInfo();

        // Creeps with no storage always in service mode
        if (this.store.getCapacity() == null) {
            this.memory.mode = "service";
        }
        else {
            if ((this.memory.mode != "collect") && (this.store.getUsedCapacity() == 0)) {
                this.memory.mode = "collect";
            }
            if ((this.memory.mode != "service") && (this.store.getFreeCapacity() == 0)) {
                this.memory.mode = "service";
            }
        }        

        // All creeps scavenge in collect mode
        //if (this.memory.mode == "collect") this.scavenge()
        
        // Perform action
        this.action(this.memory.mode);
	},
	
	
};

module.exports = behaviorGeneric;