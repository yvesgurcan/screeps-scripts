const roleBuilder = require('role.builder');
const { harvest } = require('util');

const roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // No need to harvest if we're not building creeps
        if (!Memory.buildingCreeps) {
            roleBuilder.run(creep);
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
