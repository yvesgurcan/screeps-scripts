const MAX_HARVESTERS = 9;
const MAX_MAINTAINERS = 2;
const MAX_UPGRADERS = 4;
const MAX_BUILDER = 6;
const MAX_BUILDER_GRANDS_TRAVAUX = MAX_BUILDER + 2;

const CONSTRUCTION_QUEUE = [];

const GRANDS_TRAVAUX = 10;

// const MAIN_ROOM = 'E35N2';

const ROLES = {
    harvester: {
        name: 'harvester',
        max: MAX_HARVESTERS
    },
    maintainer: {
        name: 'maintainer',
        max: MAX_MAINTAINERS
    },
    upgrader: {
        name: 'upgrader',
        max: MAX_UPGRADERS
    },
    builder: {
        name: 'builder',
        max: MAX_BUILDER
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
