const spawnCreeps = require('spawnCreeps');
const gameInfo = require('gameInfo');
const queueConstruction = require('queueConstruction');
const runRoles = require('runRoles');
const { defend } = require('defend');
const addUtilFunctions = require('addUtilFunctions');
const { cleanUpCreepMemory } = require('util');

console.log('Script updated.');

module.exports.loop = function () {
    addUtilFunctions();
    gameInfo();
    spawnCreeps();
    runRoles();
    defend();
    cleanUpCreepMemory();
    queueConstruction();
};
