var behaviorLink = {

    run: function() {
        // Check for number of links in the room
        var links = this.room.find(FIND_STRUCTURES, { filter: function(object) { return object.structureType == STRUCTURE_LINK}});
        //var maxTransfer = Math.floor(this.store.getCapacity(RESOURCE_ENERGY) / (links.length - 1));

        // Source links send to target when filled
        var targetID = this.configStructure.target;
        if (this.id != targetID) {
            if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                this.transferEnergy(Game.structures[targetID]);
            }
        }
	},
	

	
};

module.exports = behaviorLink;