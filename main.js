// Change behavior: Game.creeps["Upgrader11987251"].memory.behavior = "harvester"

function cleanMemory() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Cleaning non-existing creep memory:', name);
        }
    }
}

module.exports.loop = function () {
    // Setup prototypes and modules
    configuration = require("configuration");
    hud = require("hud");
    
    Object.assign(Spawn.prototype, require('behavior.spawn'));
    Object.assign(Structure.prototype, require('behavior.structure'));
    Object.assign(Creep.prototype, require('behavior.creep'));    
    
    // Clean memory periodically
    if (configuration.cleanActive && (Game.time % configuration.cleanInterval == 0)) {
        cleanMemory();    
    }
    
    // Display HUD
    hud.display();
    
    // Add all objects to processing array
    var objects = [];
    Object.keys(Game.spawns).forEach(function(key) {objects.push(Game.spawns[key])});
    Object.keys(Game.structures).forEach(function(key) {objects.push(Game.structures[key])});
    Object.keys(Game.creeps).forEach(function(key) {objects.push(Game.creeps[key])});

    // Process all objects
    for (object of objects) {
        object.setup();
        object.run();
    }
}