const { harvest } = require('roleUtil');
const { ROLES } = require('constants');

function upgraderRoutine(creep) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.upgrading = false;
        creep.say('🔄harvest');
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
        creep.memory.upgrading = true;
        creep.say('⚡upgrade');
    }

    if (creep.memory.upgrading) {
        if (
            creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE
        ) {
            creep.moveTo(creep.room.controller, {
                visualizePathStyle: { stroke: ROLES.upgrader.color }
            });
        }
    } else {
        harvest(creep, ROLES.upgrader.color);
    }
}

module.exports = upgraderRoutine;
