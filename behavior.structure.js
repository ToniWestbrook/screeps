var behaviorStructure = {
    behaviors: {
        tower: require('behavior.tower'),
    },

    setup: function() {
        // Setup configurations
        this.configGlobal = require("configuration");
        this.configStructure = configuration.rooms[this.room.name].structures[this.structureType];
        
        if (this.structureType in this.behaviors) {
            Object.assign(this, this.behaviors[this.structureType]);
        }
    },
    
    run: function() { }
};

module.exports = behaviorStructure;