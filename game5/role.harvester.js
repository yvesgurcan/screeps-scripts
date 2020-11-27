const roleBuilder = require('role.builder');
const roleUpgrader = require('role.upgrader');
const { harvest } = require('util');

const roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        const roomName = creep.room.name;

        // Switch task if creep queue is empty and energy capacity is maxed out
        if (
            Memory.rooms[roomName].energy ===
                Memory.rooms[roomName].energyCapacity &&
            Memory.rooms[roomName].creepsQueueEmpty
        ) {
            // Construction sites exist
            if (Memory.rooms[roomName].sites > 0) {
                roleBuilder.run(creep);
                return;
            }

            // Default to upgrade control room
            roleUpgrader.run(creep);
            return;
        }

        if (creep.store.getFreeCapacity() > 0) {
            harvest(creep);
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return (
                        (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    );
                }
            });
            if (targets.length > 0) {
                if (
                    creep.transfer(targets[0], RESOURCE_ENERGY) ===
                    ERR_NOT_IN_RANGE
                ) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: { stroke: '#ffffff' }
                    });
                }
            }
        }
    }
};

module.exports = roleHarvester;
