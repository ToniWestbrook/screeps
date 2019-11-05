var configuration = {
    // System
    cleanActive: true,
    cleanInterval: 1000,
    
    // Rooms
    remoteRoom: {
        W43N1: "W44N1", 
    },
    
    // Spawn
    numCreeps: {
        harvester: 3,
        upgrader: 3,
        builder: 3,
    },
    partsDefault: [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],

    // Creeps
    sourceRemote: {
        harvester: false,
        upgrader: true,
        builder: false,
    },
    
    sourceIndex: {
        harvester: 0,
        upgrader: 0,
        builder: 1,
    },
    
    // Builder
    builderRepair: 0.8,
    
    // Tower
    towerReserve: 200,
    towerRepair: 0.8,

};

module.exports = configuration;

// Test part lists
/*
partsDefault: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
partsDefault: [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
*/