var behaviorStructure = {
    behaviors: {
        tower: require('behavior.tower'),
    },

    setup: function() {
        if (this.structureType in this.behaviors) {
            Object.assign(this, this.behaviors[this.structureType]);
        }
    },
    
    run: function() { }
};

module.exports = behaviorStructure;