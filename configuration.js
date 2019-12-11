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
    
    // HUD/Displays
    hudActive: true,
    hudDetail: ["W43N1"],
    displayInfo: true,
    
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
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_SPAWN, true], [RESOURCE_ENERGY]], 
                                  [FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_EXTENSION, true], [RESOURCE_ENERGY]]],
                    },
                    transferTower: {
                        method: "transfer",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_TOWER, true], [RESOURCE_ENERGY]]],
                    }
                },
            },
        },    

        transporter: {
            behavior: "behavior.generic",
            parts: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
            collect: {
                actions: {
                    transferStorage: {
                        method: "withdraw",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_STORAGE, false], [RESOURCE_ENERGY]]],
                    },
                },
            },
            service: {
                actions: {
                    transferSpawn: {
                        method: "transfer",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_SPAWN, true], [RESOURCE_ENERGY]], 
                                  [FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_EXTENSION, true], [RESOURCE_ENERGY]]],
                    },
                    transferTower: {
                        method: "transfer",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_TOWER, true], [RESOURCE_ENERGY]]],
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
                    build: {
                        method: "build",
                        targets: [[FIND_MY_CONSTRUCTION_SITES, CONF_CHOOSE_CLOSEST, [], []]],
                    },
                    repair: {
                        method: "repair",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_ROAD, true, 0.85], []]],
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

        upgraderBig: {
            behavior: "behavior.generic",
            parts: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
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

        claimer: {
            behavior: "behavior.generic",
            parts: [CLAIM,MOVE],
            collect: { 
                actions: { }
            },
            service: {
                actions: {
                    claim: {
                        method: "claimController",
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
        
        miner: {
            behavior: "behavior.generic",
            parts: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
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
                    transferLink: {
                        method: "transfer",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_LINK, false], [RESOURCE_ENERGY]]],
                    },
                },
            },
        },

        storer: {
            behavior: "behavior.generic",
            parts: [CARRY,MOVE],
            collect: {
                actions: {
                    transferLink: {
                        method: "withdraw",
                        targets: [[FIND_STRUCTURES, 0, [STRUCTURE_LINK, false], [RESOURCE_ENERGY]]],
                    },
                },
            },
            service: {
                actions: {
                    transferStorage: {
                        method: "transfer",
                        targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_STORAGE, false], [RESOURCE_ENERGY]]],
                    },
                },
            },
        },

        attacker: {
            behavior: "behavior.generic",
            parts: [TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK],
            collect: {
                actions: {
                },
            },
            service: {
                actions: {
                    attack: {
                        method: "attack",
                        targets: [[FIND_HOSTILE_CREEPS, CONF_CHOOSE_CLOSEST, [], []]],
                    },
                },
            },
        },

        
    },
    
    // Rooms (actions may be overridden)
    rooms: {
        W43N1: {
            name: "Central Control E",
            creeps: {
                harvester: {
                    profile: "harvester",
                    count: 0,
                    collect: { },
                    service: { },
                },

                minerTop: {
                    profile: "miner",
                    count: 1,
                    collect: {
                        actions: {
                            harvest: {
                                method: "harvest",
                                targets: [[FIND_SOURCES, 0, [], []]],
                            },
                        },
                    },
                    service: { },
                },

                minerBottom: {
                    profile: "miner",
                    count: 1,
                    collect: {
                        actions: {
                            harvest: {
                                method: "harvest",
                                targets: [[FIND_SOURCES, 1, [], []]],
                            },
                        },
                    },
                    service: { },
                },

                storer: {
                    profile: "storer",
                    count: 1,
                    collect: { },
                    service: { },
                },

                transporter: {
                    profile: "transporter",
                    count: 3,
                    collect: { },
                    service: { },
                },

                transporterR: {
                    profile: "transporter",
                    count: 0,
                    collect: { 
                        room: "W44N2",
                    },
                    service: { 
                        room: "W44N2",
                    },
                },

                transporterS: {
                    profile: "transporter",
                    count: 0,
                    collect: {
                        actions: {
                            // Override harvest to storage
                            harvest: {
                                method: "withdraw",
                                targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_STORAGE, false], [RESOURCE_ENERGY]]],
                            },
                        },
                    },
                    service: {
                        actions: {
                            transferStorage: {
                                method: "transfer",
                                targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_TERMINAL, false], [RESOURCE_ENERGY]]],
                            },
                        },
                    },
                },
                
                builder: {
                    profile: "builder",
                    count: 1,
                    collect: {
                        actions: {
                            // Override harvest to storage
                            harvest: {
                                method: "withdraw",
                                targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_STORAGE, false], [RESOURCE_ENERGY]]],
                            },
                        },
                    },
                    service: { },
                },

                builderR: {
                    profile: "builder",
                    count: 1,
                    collect: {
                        room: "W44N1",
                    },
                    service: { 
                        room: "W44N1",
                    },
                },
                
                upgrader: {
                    profile: "upgrader",
                    count: 5, // was 6
                    collect: {
                        // Override collection room to next door
                        room: "W44N1",
                    },
                    service: { },
                },

                upgraderC: {
                    profile: "upgrader",
                    name: "uc",
                    count: 2, // was 1
                    collect: {
                        actions: {
                            // Override harvest to storage
                            harvest: {
                                method: "withdraw",
                                targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_STORAGE, false], [RESOURCE_ENERGY]]],
                            },
                        },
                    },
                    service: { },
                },

                reserver: {
                    profile: "reserver",
                    count: 1,
                    collect: { },
                    service: { 
                        // Reserve next door
                        room: "W44N1",
                    },
                },

                harvestMineral: {
                    profile: "harvester",
                    count: 1,
                    collect: {
                        //room: "W44N2",
                        actions: {
                            harvestGround: {
                                method: "pickup",
                                targets: [[FIND_DROPPED_RESOURCES, CONF_CHOOSE_CLOSEST, [RESOURCE_UTRIUM], []]],
                            },
                            harvestTomb: {
                                method: "withdraw",
                                targets: [[FIND_TOMBSTONES, CONF_CHOOSE_CLOSEST, [true], [RESOURCE_UTRIUM]]],
                            },
                            harvestWall: {
                                method: "harvest",
                                targets: [[FIND_MINERALS, 0, [true], []]],
                            },
                        },
                    },
                    service: { 
                        //room: "W44N2",
                        actions: {
                            transferStorage: {
                                method: "transfer",
                                targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_STORAGE, false], [RESOURCE_UTRIUM]]],
                            },
                        },
                    },
                },

                harvestMineralR: {
                    profile: "harvester",
                    count: 1,
                    collect: {
                        room: "W44N2",
                        actions: {
                            harvestGround: {
                                method: "pickup",
                                targets: [[FIND_DROPPED_RESOURCES, CONF_CHOOSE_CLOSEST, [RESOURCE_HYDROGEN], []]],
                            },
                            harvestTomb: {
                                method: "withdraw",
                                targets: [[FIND_TOMBSTONES, CONF_CHOOSE_CLOSEST, [true], [RESOURCE_HYDROGEN]]],
                            },
                            harvestWall: {
                                method: "harvest",
                                targets: [[FIND_MINERALS, 0, [true], []]],
                            },
                        },
                    },
                    service: { 
                        room: "W44N2",
                        actions: {
                            transferStorage: {
                                method: "transfer",
                                targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_STORAGE, false], [RESOURCE_HYDROGEN]]],
                            },
                        },
                    },
                },

                // New room related
                claimer: {
                    profile: "claimer",
                    count: 0,
                    collect: { },
                    service: { 
                        room: "W42N1",
                    },
                },

                newHarvester: {
                    profile: "harvester",
                    name: "nh",
                    count: 0,
                    collect: {
                        room: "W42N1",
                        actions: {
                            harvest: {
                                method: "harvest",
                                targets: [[FIND_SOURCES, 1, [], []]],
                            },
                        },
                    },
                    service: { 
                        room: "W42N1",
                    },
                },

                newUpgrader: {
                    profile: "upgrader",
                    name: "nu",
                    count: 0,
                    collect: {
                        room: "W42N1",

                    },
                    service: { 
                        room: "W42N1",
                    },
                },
                
                newBuilder: {
                    profile: "builder",
                    name: "nb",
                    count: 0,
                    collect: {
                        room: "W42N1",
                        actions: {
                            harvest: {
                                method: "harvest",
                                targets: [[FIND_SOURCES, 1, [], []]],
                            },
                        },
                    },
                    service: { 
                        room: "W42N1",
                    },
                },

                signer: {
                    profile: "signer",
                    count: 0,
                    collect: { },
                    service: { 
                        // Sign specified room
                        room: "W41N1",
                    },
                },
                
                // Automated classes
                
                autoAttacker: {
                    profile: "attacker",
                    count: 0, 
                    collect: { },
                    service: { 
                        room: "W44N1",
                    },
                },
                
            },
            
            structures: {
                tower: {
                    reserve: 800,
                    repair: 0.85,
                    defense: 5.0e6,
                    heal: true,
                },
                
                link: {
                    target: "5dbbac49e0163f21a1f7699f",
                },

                factory: {
                    active: true,
                    product: RESOURCE_UTRIUM_BAR,
                },
                
                
            },
        }, 
        
        W44N2: {
            name: "Central Control N",
            creeps: {
                miner: {
                    profile: "miner",
                    count: 1,
                    collect: { },
                    service: { },
                },

                storer: {
                    profile: "storer",
                    count: 1,
                    collect: {
                        actions: {
                            transferLink: {
                                method: "withdraw",
                                targets: [[FIND_STRUCTURES, 1, [STRUCTURE_LINK, false], [RESOURCE_ENERGY]]],
                            },
                        },
                    },
                    service: { },
                },

                transporter: {
                    profile: "transporter",
                    count: 1,
                    collect: { },
                    service: { },
                },

                
                harvester: {
                    profile: "harvester",
                    count: 0,
                    collect: { },
                    service: { },
                },
                
                builder: {
                    profile: "builder",
                    count: 0,
                    collect: {
                        actions: {
                            // Override harvest to storage
                            harvest: {
                                method: "withdraw",
                                targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_STORAGE, false], [RESOURCE_ENERGY]]],
                            },
                        },
                    },
                    service: { },
                },
                
                upgrader: {
                    profile: "upgrader",
                    count: 2,
                    collect: {
                        actions: {
                            // Override harvest to storage
                            harvest: {
                                method: "withdraw",
                                targets: [[FIND_STRUCTURES, CONF_CHOOSE_CLOSEST, [STRUCTURE_STORAGE, false], [RESOURCE_ENERGY]]],
                            },
                        },
                    },
                    service: { },
                },
                  
            },
            
            structures: {
                tower: {
                    reserve: 600,
                    repair: 0.85,
                    defense: 20e6,
                    heal: true,
                },
                
                link: {
                    target: "5dca1db897e15e048e8e8577",
                },
            },
        },  
        
        W45N1: {
            name: "Central Control W",
            creeps: {
                harvester: {
                    profile: "harvester",
                    count: 3,
                    collect: { },
                    service: { },
                },
                
                builder: {
                    profile: "builder",
                    count: 1,
                    collect: { },
                    service: { },
                },
                
                upgrader: {
                    profile: "upgrader",
                    count: 3,
                    collect: { },
                    service: { },
                },
                  
            },
            
            structures: {
                tower: {
                    reserve: 600,
                    repair: 0.85,
                    defense: 2.62e6,
                    heal: true,
                },
                
                link: {
                    target: "5dca1db897e15e048e8e8577",
                },
            },
        },  

        W42N1: {
            name: "Support Base 1 SW",
            creeps: {
                harvester: {
                    profile: "harvester",
                    count: 3,
                    collect: {
                        actions: {
                            harvest: {
                                method: "harvest",
                                targets: [[FIND_SOURCES, 1, [], []]],
                            },
                        },
                    },
                    service: { },
                },
                
                builder: {
                    profile: "builder",
                    count: 1,
                    collect: { },
                    service: { },
                },
                
                upgrader: {
                    profile: "upgrader",
                    count: 2,
                    collect: { },
                    service: { },
                },

                upgraderR: {
                    profile: "upgrader",
                    name: "ur",
                    count: 5,
                    collect: {
                        room: "W41N1",
                        actions: {
                            harvest: {
                                method: "harvest",
                                targets: [[FIND_SOURCES, 0, [], []]],
                            },
                        },
                    },
                    service: { },
                },

                
                reserver: {
                    profile: "reserver",
                    count: 1,
                    collect: { },
                    service: { 
                        room: "W41N1",
                    },
                },
                  
            },
            
            structures: {
                tower: {
                    reserve: 600,
                    repair: 0.85,
                    defense: 7e6,
                    heal: true,
                },
                
                link: {
                    target: "5dca1db897e15e048e8e8577",
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