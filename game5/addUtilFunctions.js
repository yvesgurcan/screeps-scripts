const gameInfo = require('gameInfo');
const { getBodyCost, isCriticalTiles } = require('util');

function addUtilFunctions() {
    if (!global.gameInfo) {
        global.gameInfo = () => {
            console.log('===============');
            gameInfo(true);
            console.log('===============');
            return '';
        };
    }

    if (!global.getBodyCost) {
        global.getBodyCost = getBodyCost;
    }

    if (!global.removeConstructions) {
        global.removeConstructions = roomName => {
            const sites = Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES);
            for (const site of sites) {
                site.remove();
            }

            return 'done';
        };
    }

    if (!global.registerCriticalTiles) {
        global.registerCriticalTiles = (roomName, x, y) => {
            const terrain = Game.map.getRoomTerrain(roomName);
            let criticalPaths = new Set();

            const save = isCriticalTiles(x, y, terrain, roomName);
            if (save && save.size > 0) {
                criticalPaths = new Set([...criticalPaths, ...save]);
            }

            criticalPaths.delete(false);

            console.log('New critical tiles:', Array.from(criticalPaths));

            const room = Memory.rooms[roomName];
            if (!room) {
                room = {};
            }

            if (!room.criticalPaths) {
                room.criticalPaths = [];
            }

            room.criticalPaths = [
                ...new Set([
                    ...room.criticalPaths,
                    ...Array.from(criticalPaths)
                ])
            ];

            return room.criticalPaths;
        };
    }
}

module.exports = addUtilFunctions;
