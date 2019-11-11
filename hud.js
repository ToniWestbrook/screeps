var hud = {
    display: function() {
        var configuration = require("configuration");

        if (!configuration.hudActive) return;
        
        // Get HUD content
        hudRows = this.getHudRows(); 
        
        // Display HUD
        hudWidth = 13;
        hudHeight = Object.keys(hudRows).length + 3;
        hudX = 49 - hudWidth;
        hudY = 49 - hudHeight;
        new RoomVisual().rect(hudX, hudY, hudWidth, hudHeight, {stroke: 'green', strokeWidth: 0.2, fill: 'green', opacity: 0.20});
        
        posY = hudY + 1.5
        for (var row of hudRows) {
            if (row.length > 0) {
                new RoomVisual().text(`${row[0]}`, hudX + 1, posY, {color: 'lightgreen', font: 0.9, align: "left"}); 
                new RoomVisual().text(`${row[1]}`, hudX + 8, posY, {color: 'lightgreen', font: 0.9, align: "left"}); 
            }
            else {
                new RoomVisual().line(hudX, posY - 0.4, hudX + 13, posY - 0.4, {color: 'darkgreen'});
            }
            posY += 1.1
        }
    },
    
    getHudRows: function() {
        var configuration = require("configuration");

        // Global info
        var hudRows = [];
        hudRows.push(["GCL:", `${Game.gcl.level} (${Math.round(Game.gcl.progress / Game.gcl.progressTotal * 100)}%)`]);
        hudRows.push(["Construction:", `${Object.keys(Game.constructionSites).length}`]);
        hudRows.push([]);

        // Room info
        for (var roomName of Object.keys(configuration.rooms)) {
            var room = Game.rooms[roomName];
            hudRows.push([room.name, ""]);
            hudRows.push(["   Control:", `${room.controller.level} (${Math.round(room.controller.progress / room.controller.progressTotal * 100)}%)`]);
            hudRows.push(["   Energy:", `${room.energyAvailable}/${room.energyCapacityAvailable}`]);
            hudRows.push(["   Ramps:", `${Math.round(this.getRampartHealth(room) * 100)}%`]);
            //hudRows.push(["   Construct:", `${room.find(FIND_MY_CONSTRUCTION_SITES).length}`]);
            
            for (var profile of Object.keys(configuration.rooms[roomName].creeps)) {
                numCreeps = _.filter(Game.creeps, (creep) => 
                    (creep.memory.profile == profile) && (creep.memory.home == roomName)).length;
                totalCreeps = configuration.rooms[roomName].creeps[profile].count;
                    
                hudRows.push([`   ${profile}s:`, `${numCreeps}/${totalCreeps}`]);
            }
            
            hudRows.push([]);
        }
        hudRows.pop();
        
        return hudRows;
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