const MAX_HARVESTERS = 9;
const MAX_UPGRADERS = 4;
const MAX_BUILDER = 6;
const MAX_BUILDER_GRAND_TRAVAUX = MAX_BUILDER + 2;
const MAX_MAINTAINERS = 2;

const GRAND_TRAVAUX = 10;

const MAIN_ROOM = 'E35N2';

const CONSTRUCTION_QUEUE = [
    /*
    {
        roomName: MAIN_ROOM,
        x: 20,
        y: 33,
        type: STRUCTURE_TOWER
    },
    {
        roomName: MAIN_ROOM,
        x: 38,
        y: 11,
        type: STRUCTURE_TOWER
    },
    {
        roomName: MAIN_ROOM,
        x: 40,
        y: 33,
        type: STRUCTURE_TOWER
    },
    {
        roomName: MAIN_ROOM,
        x: 16,
        y: 4,
        type: STRUCTURE_TOWER
    }
    */
];

module.exports = {
    MAIN_ROOM,
    GRAND_TRAVAUX,
    MAX_BUILDER,
    MAX_BUILDER_GRAND_TRAVAUX,
    MAX_UPGRADERS,
    MAX_HARVESTERS,
    MAX_MAINTAINERS,
    CONSTRUCTION_QUEUE
};
