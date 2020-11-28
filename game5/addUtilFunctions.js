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
}

module.exports = addUtilFunctions;
