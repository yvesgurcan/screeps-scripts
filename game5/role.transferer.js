const { withdrawFromExtensions, storeIntoContainers } = require('roleUtil');
const { ROLES } = require('constants');

function transfererRoutine(creep) {
    if (creep.memory.storing && creep.store[RESOURCE_ENERGY] === 0) {
        creep.say('🔄withdraw');
        creep.memory.storing = false;
    }

    if (creep.memory.storing) {
        storeIntoContainers(creep);
        return;
    }

    if (creep.store.getFreeCapacity() > 0) {
        if (
            Memory.rooms[creep.room.name].energy /
                Memory.rooms[creep.room.name].energyCapacity <
            0.3
        ) {
            return;
        }

        withdrawFromExtensions(creep, ROLES.transferer.color);
    } else {
        storeIntoContainers(creep, ROLES.transferer.color);
    }
}

module.exports = transfererRoutine;
