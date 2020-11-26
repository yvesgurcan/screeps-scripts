const { getCreepNamesFromType } = require('util');
const harvest = require('harvest');
const spawn = require('spawn');

module.exports.loop = function () {
    spawn('Harvester').from('Spawn1');

    const harvesterNames = getCreepNamesFromType('Harvester');
    harvesterNames.forEach(harvest('Spawner1'));
};
