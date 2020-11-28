const harvesterRoutine = require('role.harvester');
const upgraderRoutine = require('role.upgrader');
const builderRoutine = require('role.builder');
const maintainerRoutine = require('role.maintainer');

const routines = {
    harvesterRoutine,
    upgraderRoutine,
    builderRoutine,
    maintainerRoutine
};

function runRoles() {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];

        try {
            routines[`${creep.memory.role}Routine`](creep);
        } catch (error) {
            console.log('Error while executing routine.');
            console.log(error.stack);
        }
    }
}

function getSource(creep, sourceIndex) {
    const sources = creep.room.find(FIND_SOURCES);
    return sources[sourceIndex || 0];
}

function harvest(creep) {
    // TODO: Distribute sources more intelligently
    let sourceIndex = 1;

    try {
        if (
            creep.memory.role === 'harvester' ||
            creep.memory.role === 'upgrader'
        ) {
            sourceIndex = 0;
        }
    } catch (error) {
        console.log('Error while accessing creep role.');
        console.log(error.stack);
    }

    const source = getSource(creep, sourceIndex);

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
            visualizePathStyle: { stroke: '#ffaa00' }
        });
    }
}

function store(creep) {
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
        // creep.say('🔋store');
        creep.memory.storing = true;
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
                visualizePathStyle: { stroke: '#ffffff' }
            });
        }
    }
}

module.exports = { runRoles, harvest, store };
