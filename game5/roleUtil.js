const { cpuExceedsLimit } = require('util');
const { ROLES, ALFRED, WOODHOUSE } = require('constants');

function isEmpty(creep) {
    return creep.store[RESOURCE_ENERGY] === 0;
}

function isFull(creep) {
    return creep.store.getFreeCapacity() === 0;
}

function getSource(creep, sourceIndex = 0) {
    const sources = creep.room.find(FIND_SOURCES);
    const source = sources[sourceIndex];

    if (source.energy === 0) {
        return null;
    }

    return sources[sourceIndex];
}

function harvest(creep, pathColor = 'yellow') {
    let sourceIndex = 1;

    try {
        if (creep.memory.type === WOODHOUSE) {
            sourceIndex = 0;
        }
    } catch (error) {
        console.log('Error while accessing creep role.');
        console.log(error.stack);
    }

    const source = getSource(creep, sourceIndex);

    if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
            visualizePathStyle: { stroke: pathColor }
        });
    }
}

function store(creep) {
    let structureFilter = structure =>
        structure.structureType === STRUCTURE_EXTENSION ||
        structure.structureType === STRUCTURE_SPAWN;

    if (creep.memory.type === ALFRED) {
        structureFilter = structure =>
            structure.structureType === STRUCTURE_CONTAINER;
    }

    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => {
            return (
                structureFilter(structure) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
        }
    });

    // Containers are full
    if (creep.memory.type === ALFRED && !target) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => {
                return (
                    (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                );
            }
        });
    }

    // Extensions are full
    if (creep.memory.type === WOODHOUSE && !target) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => {
                return (
                    structure.structureType === STRUCTURE_CONTAINER &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                );
            }
        });
    }

    if (target) {
        // creep.say('🔋store');
        creep.memory.storing = true;
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: { stroke: 'white' }
            });
        }
    }
}

function build(creep) {
    const target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
    if (target) {
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: { stroke: ROLES.builder.color }
            });
        }
    }
}

function withdraw(creep, pathColor = 'yellow') {
    const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => {
            return (
                structure.structureType === STRUCTURE_CONTAINER &&
                structure.store[RESOURCE_ENERGY] > 0
            );
        }
    });

    if (
        container &&
        creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE
    ) {
        creep.moveTo(container, {
            visualizePathStyle: { stroke: pathColor }
        });
    }

    if (!container && creep.memory.destination) {
        creep.moveTo(creep.memory.destination.x, creep.memory.destination.y, {
            visualizePathStyle: { stroke: pathColor }
        });
    }

    // Remember target to keep going there even if it's empty
    if (container) {
        creep.memory.destination = { x: container.pos.x, y: container.pos.y };
    }
}

module.exports = {
    isEmpty,
    isFull,
    harvest,
    store,
    build,
    withdraw
};
