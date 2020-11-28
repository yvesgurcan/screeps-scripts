function getSource(creep, sourceIndex = 0) {
    const sources = creep.room.find(FIND_SOURCES);
    const source = sources[sourceIndex];

    if (source.energy === 0) {
        if (sourceIndex === 0 && sources[1].energy > 0) {
            return sources[1];
        }

        if (sourceIndex === 1 && sources[0].energy > 0) {
            return sources[0];
        }

        console.log(`Source 0 and 1 are both depleted.`);

        return null;
    }

    return sources[sourceIndex];
}

function harvest(creep, pathColor = 'yellow') {
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

    if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
            visualizePathStyle: { stroke: pathColor }
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
                visualizePathStyle: { stroke: 'white' }
            });
        }
    }
}

module.exports = { harvest, store };
