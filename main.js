// Change behavior: Game.creeps["Upgrader11987251"].memory.behavior = "harvester"

// Setup behaviors
behaviors = {
    spawn: require('behavior.spawn'),
    tower: require('behavior.tower'),
    harvester: require('behavior.harvester'),
    upgrader: require('behavior.upgrader'),
    builder: require('behavior.builder'),
};

function cleanMemory() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Cleaning non-existing creep memory:', name);
        }
    }
}

module.exports.loop = function () {
    configuration = require("configuration");
    hud = require("hud");
    
    // Clean memory periodically
    if (configuration.cleanActive && (Game.time % configuration.cleanInterval == 0)) {
        cleanMemory();    
    }
    
    // Display HUD
    hud.display();
    
    // Process spawns
    for (var name in Game.spawns) {
        spawn = Game.spawns[name];
        behaviors["spawn"].run(spawn);
    }
    
    // Process structures with behaviors
    for (var name in Game.structures) { 
        structure = Game.structures[name];
        if (structure.structureType in behaviors) {
            behaviors[structure.structureType].run(structure);
        }
    }
    
    // Process creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        behaviors[creep.memory.behavior].run(creep);
    }
}