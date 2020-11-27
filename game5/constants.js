const MAIN_ROOM = 'E35N2';

const CONSTRUCTION_QUEUE = [
    {
        roomName: MAIN_ROOM,
        x: 21,
        y: 20,
        type: STRUCTURE_TOWER
    },
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
];

const GRAND_TRAVAUX = 10;

const MAX_BUILDER = 8;
const MAX_BUILDER_GRAND_TRAVAUX = MAX_BUILDER + 2;

const MAX_UPGRADERS = 12;
const MAX_HARVESTERS = 10;

module.exports = {
    MAIN_ROOM,
    GRAND_TRAVAUX,
    MAX_BUILDER,
    MAX_BUILDER_GRAND_TRAVAUX,
    MAX_UPGRADERS,
    MAX_HARVESTERS,
    CONSTRUCTION_QUEUE
};
