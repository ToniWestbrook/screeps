var hud = {
    display: function() {
        var configuration = require("configuration");

        if (!configuration.hudActive) return;
        
        // Get HUD content
        hudRows = this.getHudRows(); 
        
        // Display HUD
        hudWidth = 13;
        hudHeight = Object.keys(hudRows).length + 4.5;
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
        hudRows.push(["CPU Bucket:", Game.cpu.bucket]);
        hudRows.push([]);

        // Room info
        for (var roomName of Object.keys(configuration.rooms)) {
            var room = Game.rooms[roomName];
            hudRows.push([`${configuration.rooms[roomName].name} (${room.name})`, ""]);
            hudRows.push(["   Control:", `${room.controller.level} (${Math.round(room.controller.progress / room.controller.progressTotal * 100)}%)`]);
            hudRows.push(["   Energy:", `${room.energyAvailable}/${room.energyCapacityAvailable}`]);

            if (this.getStorageUsed(room, RESOURCE_ENERGY) > 0) hudRows.push(["   Storage (E):", `${this.getStorageUsed(room, RESOURCE_ENERGY)}`]);
            if (this.getStorageUsed(room, RESOURCE_UTRIUM) > 0) hudRows.push(["   Storage (U):", `${this.getStorageUsed(room, RESOURCE_UTRIUM)}`]);
            if (this.getStorageUsed(room, RESOURCE_HYDROGEN) > 0) hudRows.push(["   Storage (H):", `${this.getStorageUsed(room, RESOURCE_HYDROGEN)}`]);

            hudRows.push(["   Defenses:", `${Math.round(this.getDefenseHealth(room) * 100)}%`]);
            //hudRows.push(["   Construct:", `${room.find(FIND_MY_CONSTRUCTION_SITES).length}`]);
            
            // Report creeps
            for (var clsName of Object.keys(configuration.rooms[roomName].creeps)) {
                numCreeps = _.filter(Game.creeps, (creep) => 
                    (creep.memory.cls == clsName) && (creep.memory.home == roomName)).length;
                totalCreeps = configuration.rooms[roomName].creeps[clsName].count;
                
                // Only report missing creeps or detail view
                report = numCreeps < totalCreeps;
                report = report || (configuration.hudDetail.includes(roomName) && (totalCreeps > 0));
                if (report) {
                    hudRows.push([`   ${clsName}s:`, `${numCreeps}/${totalCreeps}`]);
                }
            }
            
            hudRows.push([]);
        }
        hudRows.pop();
        
        return hudRows;
    },
    
    getDefenseHealth: function(room) {
        var defenses = room.find(FIND_STRUCTURES, {filter: function(object) {return object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_WALL}});
        
        mean = 0;
        for (var defense of defenses) {
            mean += defense.hits / defense.hitsMax;
        }
        mean /= defenses.length;
        
        return mean;
    },
    
    getStorageUsed: function(room, resource) {
        var storage = room.find(FIND_STRUCTURES, {filter: function(object) {return object.structureType == STRUCTURE_STORAGE}});
        if (storage.length > 0) {
            return storage[0].store.getUsedCapacity(resource);    
        }
        
        return -1;
    },
    
};

module.exports = hud;