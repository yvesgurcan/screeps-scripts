const { CONSTRUCTION_QUEUE } = require('constants');

const Y_RELATIVE_TO_GOAL = [-1, -1, -1, 0, 0, 1, 1, 1];
const X_RELATIVE_TO_GOAL = [-1, 0, 1, -1, 1, -1, 0, 1];

function buildRoadToSources(room) {
    const origin = room.spawns[0].pos;

    const sources = Game.spawns[room.spawns[0].name].room.find(FIND_SOURCES);

    for (let i = 0; i < sources.length; i++) {
        const goal = sources[i].pos;
        const path = PathFinder.search(origin, { pos: goal, range: 1 }).path;

        path.map(({ roomName, x, y }) => {
            Game.rooms[roomName].createConstructionSite(x, y, STRUCTURE_ROAD);
        });

        // Build roads around energy source
        for (let i = 0; i < 8; i++) {
            const x = goal.x + X_RELATIVE_TO_GOAL[i];
            const y = goal.y + Y_RELATIVE_TO_GOAL[i];
            Game.rooms[roomName].createConstructionSite(x, y, STRUCTURE_ROAD);
        }
    }
}

function buildRoadToController(room) {
    const origin = room.spawns[0].pos;
    const goal = Game.rooms.E35N2.controller.pos;
    const path = PathFinder.search(origin, { pos: goal, range: 2 }).path;

    path.map(({ roomName, x, y }) => {
        Game.rooms[roomName].createConstructionSite(x, y, STRUCTURE_ROAD);
    });
}

function blockCriticalPaths(room) {
    if (!room.criticalPaths) {
        return;
    }
}

function queueConstruction() {
    try {
        CONSTRUCTION_QUEUE.forEach(({ roomName, x, y, type }) => {
            const lookAt = Game.rooms[roomName].lookAt(x, y);
            const occupied = lookAt.find(
                geography => geography.structure || geography.constructionSite
            );

            if (occupied) {
                const obstacle =
                    occupied.structure || occupied.constructionSite;
                /*
                console.log(
                    `Can not build ${type} at {${x}, ${y}}: Occupied by ${
                        obstacle.structureType
                    } ${obstacle.name || ''}`
                );
                */
                return;
            }

            const resultSite = Game.rooms[roomName].createConstructionSite(
                x,
                y,
                type
            );

            /*
            console.log(
                `Construction site placement result: ${JSON.stringify(resultSite)}`
            );
            */
        });

        for (let roomName in Game.rooms) {
            const room = Memory.rooms[roomName];
            buildRoadToSources(room);
            buildRoadToController(room);
            blockCriticalPaths(room);
        }
    } catch (error) {
        console.log('Error in construction queue.');
        console.log(error.stack);
    }
}

module.exports = queueConstruction;
