const MAX_HARVESTERS = 8;
const MAX_MAINTAINERS = 2;
const MAX_REPAIRERS = 3;
const MAX_UPGRADERS = 3;
const MAX_BUILDER = 4;
const MAX_BUILDER_GRANDS_TRAVAUX = MAX_BUILDER + 2;
const MAX_CLAIMERS = 1;

const CONSTRUCTION_QUEUE = [];

const GRANDS_TRAVAUX = 10;

const MAIN_ROOM = 'E35N2';

const WOODHOUSE = 'Woodhouse';
const ALFRED = 'Alfred';

const AMMON = 'Ammon';

const BETH = 'Beth';

const KRIEGER = 'Krieger';

const RICK = 'Rick';

const DUNCAN = 'Duncan';

// Add new roles here
const ROLES = {
    harvester: {
        name: 'harvester',
        types: [
            {
                name: WOODHOUSE,
                ratio: (((1 / MAX_HARVESTERS) * MAX_HARVESTERS) / 4) * 3
            },
            { name: ALFRED, ratio: ((1 / MAX_HARVESTERS) * MAX_HARVESTERS) / 4 }
        ],
        generation: 3,
        // Fast movement and fast work
        bodyParts: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_HARVESTERS,
        color: 'yellow'
    },
    maintainer: {
        name: 'maintainer',
        types: [
            { name: AMMON, ratio: (1 / MAX_MAINTAINERS) * MAX_MAINTAINERS }
        ],
        generation: 3,
        // Super fast movement and good capacity
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        max: MAX_MAINTAINERS,
        color: 'blue'
    },
    repairer: {
        name: 'repairer',
        types: [{ name: BETH, ratio: (1 / MAX_REPAIRERS) * MAX_REPAIRERS }],
        generation: 1,
        // Great capacity and fast movement
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_REPAIRERS,
        color: 'red'
    },
    upgrader: {
        name: 'upgrader',
        types: [{ name: KRIEGER, ratio: (1 / MAX_UPGRADERS) * MAX_UPGRADERS }],
        generation: 3,
        // Great capacity
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        max: MAX_UPGRADERS,
        color: 'purple'
    },
    builder: {
        name: 'builder',
        types: [{ name: RICK, ratio: (1 / MAX_BUILDER) * MAX_BUILDER }],
        generation: 3,
        // Great capacity and fast movement
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_BUILDER,
        color: 'green'
    },
    claimer: {
        name: 'claimer',
        types: [{ name: DUNCAN, ratio: (1 / MAX_CLAIMERS) * MAX_CLAIMERS }],
        generation: 1,
        // Super fast movement
        bodyParts: [CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE],
        max: MAX_CLAIMERS,
        color: 'orange'
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
