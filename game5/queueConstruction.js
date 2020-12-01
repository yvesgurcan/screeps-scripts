const { CONSTRUCTION_QUEUE } = require('constants');
const { isTick } = require('util');

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

        const area = Game.rooms[room.name].lookAtArea(
            goal.y + Y_RELATIVE_TO_GOAL[0],
            goal.x + X_RELATIVE_TO_GOAL[0],
            goal.y + Y_RELATIVE_TO_GOAL[Y_RELATIVE_TO_GOAL.length - 1],
            goal.x + X_RELATIVE_TO_GOAL[X_RELATIVE_TO_GOAL.length - 1]
        );

        // Build roads around energy source
        for (let i = 0; i < 8; i++) {
            const x = goal.x + X_RELATIVE_TO_GOAL[i];
            const y = goal.y + Y_RELATIVE_TO_GOAL[i];

            const tile = area[y][x];
            if (tile.find(t => t.terrain === 'wall')) {
                continue;
            }

            Game.rooms[room.name].createConstructionSite(x, y, STRUCTURE_ROAD);
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

    room.criticalPaths.map(coordinates => {
        const [x, y] = coordinates.split('-');
        Game.rooms[room.name].createConstructionSite(
            Number(x),
            Number(y),
            STRUCTURE_RAMPART
        );
    });
}

function queueConstruction() {
    try {
        if (!isTick(10)) {
            return;
        }

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
            const room = { ...Memory.rooms[roomName], name: roomName };
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
