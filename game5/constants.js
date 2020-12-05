const MAX_HARVESTERS = 6;
const MAX_MAINTAINERS = 1;
const MAX_REPAIRERS = 4;
const MAX_REPAIRERS_VETUSTE = MAX_REPAIRERS + 3;
const MAX_UPGRADERS = 1;
const MAX_BUILDERS = 3;
const MAX_BUILDERS_GRANDS_TRAVAUX = MAX_BUILDERS + 3;
const MAX_TRANSFERERS = 2;
const MAX_CLAIMERS = 0;

const CONSTRUCTION_QUEUE = [];

const GRANDS_TRAVAUX = 10;
const VETUSTE = 40;

const WOODHOUSE = 'Woodhouse';
const ALFRED = 'Alfred';

const AMMON = 'Ammon';

const BETH = 'Beth';

const KRIEGER = 'Krieger';

const RICK = 'Rick';

const LAVOISIER = 'Lavoisier';

const DUNCAN = 'Duncan';

// Add new roles here
const ROLES = {
    harvester: {
        name: 'harvester',
        types: [
            {
                name: WOODHOUSE,
                ratio: 0.5
            },
            { name: ALFRED, ratio: 0.5 }
        ],
        generation: 3,
        // Fast movement and fast work
        bodyParts: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_HARVESTERS,
        color: 'yellow'
    },
    builder: {
        name: 'builder',
        types: [{ name: RICK, ratio: 1 }],
        generation: 3,
        // Great capacity and fast movement
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_BUILDERS,
        boostSpawnRule: (creeps, roomName) => {
            const constructionSites = Game.rooms[roomName].find(
                FIND_MY_CONSTRUCTION_SITES
            ).length;

            if (
                constructionSites >= GRANDS_TRAVAUX &&
                creeps.length < MAX_BUILDERS_GRANDS_TRAVAUX
            ) {
                console.log(`Build an extra ${RICK}.`);
                return RICK;
            }

            return false;
        },
        color: 'green'
    },
    repairer: {
        name: 'repairer',
        types: [{ name: BETH, ratio: 1 }],
        generation: 2,
        // Great capacity and fast movement
        bodyParts: [
            WORK,
            WORK,
            CARRY,
            CARRY,
            CARRY,
            CARRY,
            MOVE,
            MOVE,
            MOVE,
            MOVE
        ],
        max: MAX_REPAIRERS,
        boostSpawnRule: (creeps, roomName) => {
            const decayedStructures =
                Memory.rooms[roomName].decayedStructures.length;

            if (
                decayedStructures >= VETUSTE &&
                creeps.length < MAX_REPAIRERS_VETUSTE
            ) {
                console.log(`Build an extra ${BETH}.`);
                return BETH;
            }

            return false;
        },
        color: 'red'
    },
    upgrader: {
        name: 'upgrader',
        types: [{ name: KRIEGER, ratio: 1 }],
        generation: 4,
        // Great capacity
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        max: MAX_UPGRADERS,
        color: 'purple'
    },
    maintainer: {
        name: 'maintainer',
        types: [{ name: AMMON, ratio: 1 }],
        generation: 5,
        bodyParts: [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        max: MAX_MAINTAINERS,
        color: 'blue'
    },

    transferer: {
        name: 'transferer',
        types: [
            {
                name: LAVOISIER,
                ratio: 1
            }
        ],
        generation: 1,
        // Fast movement and fast work
        bodyParts: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        max: MAX_TRANSFERERS,
        color: 'black'
    },
    // Claimer is too expensive to get built: Other creeps die before room can gather enough energy to afford Duncan
    claimer: {
        name: 'claimer',
        types: [{ name: DUNCAN, ratio: 1 }],
        generation: 2,
        // Super fast movement
        bodyParts: [CLAIM, MOVE, MOVE, MOVE, MOVE, CARRY, WORK],
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

const ROOM_WIDTH = 50;
const ROOM_HEIGHT = 50;

module.exports = {
    GRANDS_TRAVAUX,
    VETUSTE,
    MAX_BUILDERS,
    MAX_BUILDERS_GRANDS_TRAVAUX,
    MAX_UPGRADERS,
    MAX_HARVESTERS,
    MAX_MAINTAINERS,
    MAX_REPAIRERS,
    MAX_REPAIRERS_VETUSTE,
    RICK,
    ALFRED,
    WOODHOUSE,
    CONSTRUCTION_QUEUE,
    ROLES,
    HP,
    ROOM_WIDTH,
    ROOM_HEIGHT
};
