
var behaviorSpawn = {

    run: function(spawn) {
        configuration = require("configuration");

        // Get list of creeps
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.behavior == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.behavior == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.behavior == 'builder');
        
        // Create new builders
        if(builders.length < configuration.numBuilder) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            spawn.spawnCreep(configuration.partsDefault, newName, 
                {memory: {behavior: 'builder'}});        
        }
    
        // Create new upgraders
        if(upgraders.length < configuration.numUpgrader) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            spawn.spawnCreep(configuration.partsDefault, newName, 
                {memory: {behavior: 'upgrader'}});        
        }
    
        // Create new harvesters
        if(harvesters.length < configuration.numHarvester) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            spawn.spawnCreep(configuration.partsDefault, newName, 
                {memory: {behavior: 'harvester'}});        
        }

        // Note current spawn        
        if(spawn.spawning) { 
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.behavior,
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }

	}
};

module.exports = behaviorSpawn;