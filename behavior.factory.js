var behaviorFactory = {

    run: function() {
        // Produce configured product
        if (this.configStructure.active) {
            this.produce(this.configStructure.product);    
        }
	},
};

module.exports = behaviorFactory;