const gameInfo = require('gameInfo');
const { getBodyCost } = require('util');

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
        };
    }
}

module.exports = addUtilFunctions;
