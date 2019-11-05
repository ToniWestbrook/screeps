var hud = {
    display: function() {
        configuration = require("configuration");
        room1 = Game.rooms[Object.keys(Game.rooms)[0]]
        
        // Build HUD Info
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.behavior == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.behavior == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.behavior == 'builder');
        var gclPercent = Math.round(Game.gcl.progress / Game.gcl.progressTotal * 100);
        var controllerPercent = Math.round(room1.controller.progress / room1.controller.progressTotal * 100);
        var wallPercent = Math.round(this.getRampartHealth(room1) * 100);
        
        hudInfo = {
            GCL: `${Game.gcl.level} (${gclPercent}%)`,
            Rm1_Control: `${room1.controller.level} (${controllerPercent}%)`,
            Rm1_Energy: `${room1.energyAvailable}/${room1.energyCapacityAvailable}`,
            Rm1_Ramps: `${wallPercent}%`,
            Construction: Object.keys(Game.constructionSites).length,
            Harvesters: `${harvesters.length}/${configuration.numCreeps["harvester"]}`,
            Upgraders: `${upgraders.length}/${configuration.numCreeps["upgrader"]}`,
            Builders: `${builders.length}/${configuration.numCreeps["builder"]}`,
        }
        
        // Display HUD
        hudWidth = 13;
        hudHeight = Object.keys(hudInfo).length + 2.5
        hudX = 49 - hudWidth;
        hudY = 49 - hudHeight;
        new RoomVisual().rect(hudX, hudY, hudWidth, hudHeight, {stroke: 'green', strokeWidth: 0.2, fill: 'green', opacity: 0.25});
        
        posY = hudY + 1.5
        for (var field in hudInfo) {
            new RoomVisual().text(`${field.replace("_"," ")}:`, hudX + 1, posY, {color: 'lightgreen', font: 1, align: "left"}); 
            new RoomVisual().text(`${hudInfo[field]}`, hudX + 8, posY, {color: 'lightgreen', font: 1, align: "left"}); 
            posY += 1.2
        }
    },
    
    getRampartHealth: function(room) {
        var ramparts = room.find(FIND_STRUCTURES, {filter: function(object) {return object.structureType == STRUCTURE_RAMPART}});
        
        mean = 0;
        for (var rampart of ramparts) {
            mean += rampart.hits / rampart.hitsMax;
        }
        mean /= ramparts.length;
        
        return mean;
    },
};

module.exports = hud;