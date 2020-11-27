const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const spawnCreeps = require('spawnCreeps');
const gameInfo = require('gameInfo');
const queueConstruction = require('queueConstruction');
const { defendRooms, cleanUpCreepMemory } = require('util');

function runRoles() {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }

        if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }

        if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }
}

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
    defendRooms();
    cleanUpCreepMemory();
    queueConstruction();
};
