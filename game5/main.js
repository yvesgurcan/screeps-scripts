const spawnCreeps = require('spawnCreeps');
const gameInfo = require('gameInfo');
const queueConstruction = require('queueConstruction');
const { runRoles } = require('roles');
const defend = require('defend');
const { cleanUpCreepMemory } = require('util');

module.exports.loop = function () {
    if (!Memory.gameInfo) {
        Memory.gameInfo = () => {
            console.log('===============');
            gameInfo(true);
            console.log('===============');
            return '';
        };
    }

    gameInfo();
    spawnCreeps();
    runRoles();
    defend();
    cleanUpCreepMemory();
    queueConstruction();
};
