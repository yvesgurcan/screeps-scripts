const gameInfo = require('gameInfo');
const { getBodyCost } = require('util');
const { MAIN_ROOM } = require('constants');

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
        global.removeConstructions = () => {
            const sites = Game.rooms[MAIN_ROOM].find(FIND_CONSTRUCTION_SITES);
            for (const site of sites) {
                site.remove();
            }
        };
    }
}

module.exports = addUtilFunctions;
