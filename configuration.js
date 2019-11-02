var configuration = {
    // System
    cleanActive: true,
    cleanInterval: 1000,
    
    // Spawn
    numHarvester: 3,
    numUpgrader: 3,
    numBuilder: 3,
    partsDefault: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
    
    // Builder
    builderRepair: 0.72,
    
    // Tower
    towerReserve: 200,
    towerRepair: 0.72

};

module.exports = configuration;