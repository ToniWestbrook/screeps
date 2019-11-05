var behaviorCreep = {
    behaviors: {
        harvester: require('behavior.harvester'),
        upgrader: require('behavior.upgrader'),
        builder: require('behavior.builder'),
    },

    setup: function() {
        Object.assign(this, this.behaviors[this.memory.behavior]);
    },
    
    run: function() { },
    
    // Move to new room
    moveRoom: function(room) {
        if (this.room.name != room) {
            this.moveTo(new RoomPosition(30, 30, room));
            return true;    
        }
        
        return false;
    },
    
    // Move home
    moveHome: function() {
        return this.moveRoom(this.memory.home);
    },

    // Move remote room
    moveRemote: function() {
        configuration = require("configuration");
        return this.moveRoom(configuration.remoteRoom[this.memory.home]);
    },
    
    // Move to source room
    moveSource: function() {
        configuration = require("configuration");

        // Only use remote sources when not hiding
        if (configuration.sourceRemote[this.memory.behavior] && (this.hits == this.hitsMax)) {
            return this.moveRemote();
        }
        else {
            return this.moveHome();
        }
    },

    // Scavenge tombstones/energy (TODO energy)
    scavenge: function() {
        // Check for tombstone
        var tombstones = this.pos.findInRange(FIND_TOMBSTONES, 1);

        if (tombstones.length) {
            // Ignore if empty
            if (tombstones[0].store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                return false;
            }
            
            var result = this.withdraw(tombstones[0], RESOURCE_ENERGY);
            if (result == OK) {
                Game.notify("Scavenged a tombstone.");
                return true;
            }
            if (result == ERR_NOT_IN_RANGE) {
                this.moveTo(tombstones[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                return true;
            }
        }
        
        // Check for energy
        var energy = this.pos.findInRange(FIND_DROPPED_RESOURCES, 1,
            {filter: function(object) {object.resourceType == RESOURCE_ENERGY}});
        
        if (energy.length) {
            var result = this.pickup(energy[0]);
            if (result == OK) {
                Game.notify("Scavenged energy.");
                return true;
            }
            if (result == ERR_NOT_IN_RANGE) {
                this.moveTo(energy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                return true;
            }
            
        }
        
        return false;
    },
    
    // Harvest from source
    harvestFull: function() {
        configuration = require("configuration");
        
        // Scavenge, then move to source room
        if (this.scavenge()) return true;
        if (this.moveSource()) return true;

        // Harvest
        var sources = this.room.find(FIND_SOURCES);
        source = sources[configuration.sourceIndex[this.memory.behavior]];
        if(this.harvest(source) == ERR_NOT_IN_RANGE) {
            this.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }

        return true;
    },
    
    // Report first initial of role, number, and TTL
    reportInfo: function() {
        this.say(`${this.name}:${this.ticksToLive}`);
    },
    
    // Report mode change
    reportMode: function() {
        this.say(this.memory.mode);
        // this.say('🔄 harvest');
        // this.say('⚡ upgrade');
    },

};

module.exports = behaviorCreep;