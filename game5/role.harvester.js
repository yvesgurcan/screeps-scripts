const builderRoutine = require('role.builder');
const upgarderRoutine = require('role.upgrader');
const { harvest, store } = require('roleUtil');
const { WOODHOUSE } = require('constants');

function harvesterRoutine(creep) {
    // Switch task if creep queue is empty and energy capacity is maxed out
    if (
        creep.memory.type === WOODHOUSE &&
        creep.room.memory.energy === creep.room.memory.energyCapacity &&
        creep.room.memory.creepsQueueEmpty
    ) {
        // Construction sites exist
        if (creep.room.memory.sites.length > 0) {
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
