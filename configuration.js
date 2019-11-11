global.CONF_TARGET_TYPE = 0;
global.CONF_TARGET_INDEX = 1;
global.CONF_TARGET_FILTERS = 2;
global.CONF_TARGET_ARGS = 3;
global.CONF_CHOOSE_CLOSEST = -1;
global.FIND_CONTROLLERS = -1;

var configuration = {
    // System
    cleanActive: true,
    cleanInterval: 1000,
    
    // HUD
    hudActive: true,
    
    // Tower
    towerReserve: 200,
    towerRepair: 0.85,
    towerHeal: true,

    // ----------
    // Profiles
    profiles: {
        harvester: {
            behavior: "behavior.generic",
            parts: [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            collect: {
                actions: {
                    harvest: {
                        method: "harvest",
                        targets: [[FIND_SOURCES, 0, [], []]],
                    },
                },
            },
            service: {
                actions: {
                    transferSpawn: {
                        method: "transfer",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_SPAWN], [RESOURCE_ENERGY]], 
                                  [FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_EXTENSION], [RESOURCE_ENERGY]]],
                    },
                    transferTower: {
                        method: "transfer",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_TOWER], [RESOURCE_ENERGY]]],
                    }
                },
            },
            
        },    
        
        builder: {
            behavior: "behavior.generic",
            parts: [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            collect: {
                actions: {
                    harvest: {
                        method: "harvest",
                        targets: [[FIND_SOURCES, 0, [], []]],
                    },
                },
            },
            service: {
                actions: {
                    repair: {
                        method: "repair",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_ROAD, 0.85], []]],
                    },
                    build: {
                        method: "build",
                        targets: [[FIND_MY_CONSTRUCTION_SITES, CONF_CHOOSE_CLOSEST, [], []]],
                    },
                },
            },
        },    

        upgrader: {
            behavior: "behavior.generic",
            parts: [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            collect: {
                actions: {
                    harvest: {
                        method: "harvest",
                        targets: [[FIND_SOURCES, 0, [], []]],
                    },
                },
            },
            service: {
                actions: {
                    upgrade: {
                        method: "upgradeController",
                        targets: [[FIND_CONTROLLERS, 0, [], []]],
                    },
                },
            },
        },    

        reserver: {
            behavior: "behavior.generic",
            parts: [CLAIM,CLAIM,MOVE],
            collect: { 
                actions: { }
            },
            service: {
                actions: {
                    reserve: {
                        method: "reserveController",
                        targets: [[FIND_CONTROLLERS, 0, [], []]],
                    },
                },
            },
        },    

        signer: {
            behavior: "behavior.generic",
            parts: [MOVE],
            collect: { 
                actions: { }
            },
            service: {
                actions: {
                    reserve: {
                        method: "signController",
                        targets: [[FIND_CONTROLLERS, 0, [], ["Greetings, welcome to the Boz Collective!"]]],
                    },
                },
            },
        },    


        
    },
    
    // Rooms (actions may be overridden)
    rooms: {
        W43N1: {
            creeps: {
                harvester: {
                    count: 3,
                    collect: { },
                    service: { },
                },
                
                builder: {
                    count: 3,
                    collect: {
                        actions: {
                            // Override harvest for second source
                            harvest: {
                                method: "harvest",
                                targets: [[FIND_SOURCES, 1, [], []]],
                            },
                        },
                    },
                    service: { },
                },
                
                upgrader: {
                    count: 4,
                    collect: {
                        // Override collection room to next door
                        room: "W44N1",
                    },
                    service: { },
                },

                reserver: {
                    count: 1,
                    collect: { },
                    service: { 
                        // Reserve next door
                        room: "W44N1",
                    },
                },
                
                signer: {
                    count: 0,
                    collect: { },
                    service: { 
                        // Sign specified room
                        room: "W43N1",
                    },
                },
                
            },
            
            structures: {
                tower: {
                    reserve: 200,
                    repair: 0.85,
                    heal: true,
                }, 
            },
        }, 
        
        W44N2: {
            creeps: {
                harvester: {
                    count: 3,
                    collect: { },
                    service: { },
                },
                
                builder: {
                    count: 3,
                    collect: { },
                    service: { },
                },
                
                upgrader: {
                    count: 3,
                    collect: { },
                    service: { },
                },
                  
            },
            
            structures: {
                tower: {
                    reserve: 200,
                    repair: 0.85,
                    heal: true,
                }, 
            },
        },  
    },
};

module.exports = configuration;

// Test part lists
/*
partsDefault: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
partsDefault: [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
*/