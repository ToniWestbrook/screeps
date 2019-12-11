var events = {
    configuration: require("configuration"),

    setup: function() {
        // Setup events if necessary
        if (!Object.keys(Memory).includes("events")) {
            Memory.events = {
                queue: [],
            }
        }
    },
    
    run: function() {
        this.setup();

        for (var idx = Memory.events.queue.length - 1 ; idx >= 0 ; idx--) {
            event = Memory.events.queue[idx];

            // Process current events
            if (event[2]-- <= 0) {
                this.actions[event[0]](event[1]);    
                
                // Remove event from queue
                Memory.events.queue.splice(idx, 1);
            }
        }
	},
	
	receive: function(event, info, time) {
        Memory.events.queue.push([event, info, time])
	},
	
	actions: {
	    attack: function(info) {
	        var attackConfig = configuration.rooms["W43N1"].creeps["autoAttacker"];
	        attackConfig.service.room = info;
	        attackConfig.count = 1;

	        Game.notify(`Enemy attacked in room ${info}, activating response creep!`);
	    },
	},
};

module.exports = events;