var behaviorCreep = {

    setup: function() {
        // Setup configurations
        this.configGlobal = require("configuration");
        this.configClass = configuration.rooms[this.memory.home].creeps[this.memory.cls];

        // Add behavior methods
        Object.assign(this, require(this.configGlobal.profiles[this.configClass.profile].behavior));
        
        // Add default items not present in profile
        for (mode of ["collect", "service"]) {
            // Add room if not present
            if (!("room" in this.configClass[mode])) {
                this.configClass[mode].room = this.memory.home;
            }
            
            // Add actions key if not present
            if (!("actions" in this.configClass[mode])) {
                this.configClass[mode].actions = {};
            }
            
            // Add any default actions and rooms not overridden
            for (action of Object.keys(configuration.profiles[this.configClass.profile][mode].actions)) {
                if (!(action in this.configClass[mode].actions)) {
                    this.configClass[mode].actions[action] = configuration.profiles[this.configClass.profile][mode].actions[action];
                }
            } 
        }
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
    
    // Perform filter per method/type
    actionFilter: function(object, method, target) {
        // Method independent targets
        if ([FIND_SOURCES, FIND_MY_CONSTRUCTION_SITES, FIND_RUINS, FIND_HOSTILE_CREEPS].includes(target[CONF_TARGET_TYPE])) return true;

        // Method dependent targets
        switch (method) {
            case "transfer":
                if (target[CONF_TARGET_TYPE] == FIND_STRUCTURES) {
                    result = true;
                    if (target[CONF_TARGET_FILTERS].length > 0) {
                        result = (object.structureType == target[CONF_TARGET_FILTERS][0])
                    }
                    
                    if (!target[CONF_TARGET_FILTERS][1]) return result;
                    return (result && (object.store.getFreeCapacity(target[CONF_TARGET_ARGS][0]) > 0));
                }
                break;

            case "withdraw":
                if (target[CONF_TARGET_TYPE] == FIND_STRUCTURES) {
                    result = true;
                    if (target[CONF_TARGET_FILTERS].length > 0) {
                        result = (object.structureType == target[CONF_TARGET_FILTERS][0])
                    }
                    
                    if (!target[CONF_TARGET_FILTERS][1]) return result;
                    return (result && (object.store.getUsedCapacity(target[CONF_TARGET_ARGS][0]) > 0));
                }
                
                if (target[CONF_TARGET_TYPE] == FIND_TOMBSTONES) {
                    result = true;

                    if (!target[CONF_TARGET_FILTERS][0]) return result;
                    return (result && (object.store.getUsedCapacity(target[CONF_TARGET_ARGS][0]) > 0));
                }
                
                break;

            case "harvest":
                if (target[CONF_TARGET_TYPE] == FIND_MINERALS) {
                    result = true;
                    if (!target[CONF_TARGET_FILTERS][0]) return result;
                    return (result && (object.mineralAmount > 0));
                }
                break;

            case "pickup":
                if (target[CONF_TARGET_TYPE] == FIND_DROPPED_RESOURCES) {
                    result = true;
                    if (target[CONF_TARGET_FILTERS].length > 0) {
                        result = (object.resourceType == target[CONF_TARGET_FILTERS][0])
                    }
                    
                    return result;
                }
                break;

            case "repair":
                if (target[CONF_TARGET_TYPE] == FIND_STRUCTURES) {
                    result = true;
                    if (target[CONF_TARGET_FILTERS].length > 0) {
                        result = (object.structureType == target[CONF_TARGET_FILTERS][0])
                    }
                    
                    if (!target[CONF_TARGET_FILTERS][1]) return result;
                    return (result && (object.hits / object.hitsMax < target[CONF_TARGET_FILTERS][2]));
                }
                break;
                
        }

        // Unhandled target        
        return false;
    },
    
    // Perform action
    action: function(mode) {
        // Work in mode's room unless damaged
        var room = (this.hits == this.hitsMax) ? this.configClass[mode].room : this.memory.home;
        if (this.moveRoom(room)) return true;

        // Process each action type
        for (action of Object.keys(this.configClass[mode].actions)) {
            // Process each target per action
            var method = this.configClass[mode].actions[action].method;
            var chosenTarget = [];
            
            for (target of this.configClass[mode].actions[action].targets) {
                if (target[CONF_TARGET_TYPE] == FIND_CONTROLLERS) {
                    // Mimic room.find for controllers
                    var locations = [this.room.controller];    
                }
                else {
                    // Find all locations for target
                    var locations = this.room.find(target[CONF_TARGET_TYPE], {
                        filter: (object) => this.actionFilter(object, method, target)});
                }
                
                // If a location was found, record target
                if(locations.length > 0) {
                    if (target[CONF_TARGET_INDEX] == CONF_CHOOSE_CLOSEST) {
                        // Check each location in current action for closest
                        for (location of locations) {
                            var distance = this.pos.getRangeTo(location);
                            // Check if current location is the new closest
                            if ((chosenTarget.length == 0) || (distance < chosenTarget[1])) {
                                chosenTarget[0] = location;
                                chosenTarget[1] = distance;
                            }
                        }
                    }
                    else {
                        // Manually specified index is considered closest
                        chosenTarget[0] = locations[target[CONF_TARGET_INDEX]];
                        chosenTarget[1] = -1;
                        break;
                    }
                }
            }
            
            // Perform action on location and move if not in range
            if (chosenTarget.length > 0) {
                if(this[method](chosenTarget[0], ...target[CONF_TARGET_ARGS]) == ERR_NOT_IN_RANGE) {
                    this.moveTo(chosenTarget[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return;
                
            }
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
            if (result == OK) return true;
            if (result == ERR_NOT_IN_RANGE) {
                this.moveTo(tombstones[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                return true;
            }
        }
        
        // Check for energy
        var energy = this.pos.findInRange(FIND_DROPPED_RESOURCES, 1,
            {filter: function(object) {return (object.resourceType == RESOURCE_ENERGY)}});

        if (energy.length) {
            var result = this.pickup(energy[0]);
            if (result == OK) return true;
            if (result == ERR_NOT_IN_RANGE) {
                this.moveTo(energy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                return true;
            }
            
        }
        
        return false;
    },
    
    // Report first initial of role, number, and TTL
    reportInfo: function() {
        if (this.configGlobal["displayInfo"]) {
            mode = "?";
            if (this.memory.mode) {
                mode = this.memory.mode[0]
            }
            
            this.say(`${this.name}:${mode}:${this.ticksToLive}`);
        }
    },
    
    // Report mode change
    reportMode: function() {
        if (this.configGlobal["displayInfo"]) {
            this.say(this.memory.mode);
        }
        // this.say('🔄 harvest');
        // this.say('⚡ upgrade');
    },

};

module.exports = behaviorCreep;