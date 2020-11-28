const MAX_HARVESTERS = 8;
const MAX_MAINTAINERS = 2;
const MAX_REPAIRERS = 3;
const MAX_UPGRADERS = 3;
const MAX_BUILDER = 4;
const MAX_BUILDER_GRANDS_TRAVAUX = MAX_BUILDER + 2;

const CONSTRUCTION_QUEUE = [];

const GRANDS_TRAVAUX = 10;

const MAIN_ROOM = 'E35N2';

const WOODHOUSE = 'Woodhouse';

const AMMON = 'Ammon';

const BETH = 'Beth';

const KRIEGER = 'Krieger';

const RICK = 'Rick';

// Add new roles here
const ROLES = {
    harvester: {
        name: 'harvester',
        types: [WOODHOUSE],
        generation: 3,
        // Fast movement and fast work
        bodyParts: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_HARVESTERS,
        color: 'yellow'
    },
    maintainer: {
        name: 'maintainer',
        types: [AMMON],
        generation: 3,
        // Super fast movement and good capacity
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        max: MAX_MAINTAINERS,
        color: 'blue'
    },
    repairer: {
        name: 'repairer',
        types: [BETH],
        generation: 1,
        // Great capacity and fast movement
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_REPAIRERS,
        color: 'red'
    },
    upgrader: {
        name: 'upgrader',
        types: [KRIEGER],
        generation: 3,
        // Great capacity
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        max: MAX_UPGRADERS,
        color: 'purple'
    },
    builder: {
        name: 'builder',
        types: [RICK],
        generation: 3,
        // Great capacity and fast movement
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_BUILDER,
        color: 'green'
    }
};

const HP = {
    HP_250K: 250000,
    HP_1MILLION: 100000000,
    HP_250K: 250000,
    HP_500K: 500000
};

module.exports = {
    MAIN_ROOM,
    GRANDS_TRAVAUX,
    MAX_BUILDER,
    MAX_BUILDER_GRANDS_TRAVAUX,
    MAX_UPGRADERS,
    MAX_HARVESTERS,
    MAX_MAINTAINERS,
    CONSTRUCTION_QUEUE,
    ROLES,
    HP
};
