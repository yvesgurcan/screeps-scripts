const builderRoutine = require('role.builder');
const upgarderRoutine = require('role.upgrader');
const { harvest, store } = require('roleUtil');

function harvesterRoutine(creep) {
    const roomName = creep.room.name;

    // Switch task if creep queue is empty and energy capacity is maxed out
    if (
        Memory.rooms[roomName].energy ===
            Memory.rooms[roomName].energyCapacity &&
        Memory.rooms[roomName].creepsQueueEmpty
    ) {
        // Construction sites exist
        if (Memory.rooms[roomName].sites.length > 0) {
            builderRoutine(creep);
            return;
        }

        // Default to upgrade control room
        upgarderRoutine(creep);
        return;
    }

    if (creep.memory.storing && creep.store[RESOURCE_ENERGY] === 0) {
        creep.say('🔄harvest');
        creep.memory.storing = false;
    }

    if (creep.memory.storing) {
        store(creep);
        return;
    }

    if (creep.store.getFreeCapacity() > 0) {
        harvest(creep);
    } else {
        store(creep);
    }
}

module.exports = harvesterRoutine;
