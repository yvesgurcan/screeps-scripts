const { getCreepNamesFromType } = require('util');
const { harvest, transfer, upgrade } = require('harvest');
const spawn = require('spawn');

module.exports.loop = function () {
    spawn('Harvester').from('Spawn1');

    const harvesterNames = getCreepNamesFromType('Harvester');
    harvesterNames.forEach(harvest().and(transfer('Spawner1')));

    // const upgraderNames = getCreepNamesFromType('Upgrader');
    // upgraderNames.forEach(harvest('Spawn1'));
};
