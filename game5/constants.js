const MAX_HARVESTERS = 9;
const MAX_MAINTAINERS = 3;
const MAX_UPGRADERS = 3;
const MAX_BUILDER = 4;
const MAX_BUILDER_GRANDS_TRAVAUX = MAX_BUILDER + 2;

const CONSTRUCTION_QUEUE = [];

const GRANDS_TRAVAUX = 10;

// const MAIN_ROOM = 'E35N2';

const ROLES = {
    harvester: {
        name: 'harvester',
        generation: 3,
        // Fast movement and fast work
        bodyParts: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_HARVESTERS,
        color: 'yellow'
    },
    maintainer: {
        name: 'maintainer',
        generation: 3,
        // Super fast movement and good capacity
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        max: MAX_MAINTAINERS,
        color: 'blue'
    },
    upgrader: {
        name: 'upgrader',
        generation: 3,
        // Great capacity
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        max: MAX_UPGRADERS,
        color: 'purple'
    },
    builder: {
        name: 'builder',
        generation: 3,
        // Great capacity and fast movement
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        max: MAX_BUILDER,
        color: 'green'
    }
};

module.exports = {
    GRANDS_TRAVAUX,
    MAX_BUILDER,
    MAX_BUILDER_GRANDS_TRAVAUX,
    MAX_UPGRADERS,
    MAX_HARVESTERS,
    MAX_MAINTAINERS,
    CONSTRUCTION_QUEUE,
    ROLES
};
