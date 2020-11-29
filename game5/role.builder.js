const upgraderRoutine = require('role.upgrader');
const { withdraw, build } = require('roleUtil');
const { ROLES } = require('constants');

function builderRoutine(creep) {
    const roomName = creep.room.name;

    // Switch task if no construction sites exist
    if (Memory.rooms[roomName].sites.length <= 0) {
        // Default to upgrade control room
        upgraderRoutine(creep);
        return;
    }

    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.building = false;
        creep.say('🔄withdraw');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
        creep.memory.building = true;
        creep.say('🚧build');
    }

    if (creep.memory.building) {
        build(creep);
    } else {
        withdraw(creep, ROLES.builder.color, false);
    }
}

module.exports = builderRoutine;
