const builderRoutine = require('role.builder');
const upgraderRoutine = require('role.upgrader');
const { withdraw } = require('roleUtil');
const { ROLES } = require('constants');

function maintainerRoutine(creep) {
    if (creep.store.getFreeCapacity() > 0) {
        withdraw(creep, ROLES.maintainer.color);
    } else {
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
                return (
                    structure.structureType === STRUCTURE_TOWER &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                );
            }
        });
        if (targets.length > 0) {
            // creep.say('🔆maintain');
            if (
                creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(targets[0], {
                    visualizePathStyle: { stroke: ROLES.maintainer.color }
                });
            }
            // Switch task if no tower needs energy
        } else {
            // Construction sites exist
            if (creep.room.memory.sites.length > 0) {
                builderRoutine(creep);
                return;
            }

            // Default to upgrade control room
            upgraderRoutine(creep);
            return;
        }
    }
}

module.exports = maintainerRoutine;
