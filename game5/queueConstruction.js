const { CONSTRUCTION_QUEUE } = require('constants');

function buildRoadToSources(room) {
    const path = PathFinder.search(
        room.spawns[0].pos,
        Game.spawns[room.spawns[0].name].room.find(FIND_SOURCES)[0].pos
    ).path;

    path.map(({ roomName, x, y }) => {
        Game.rooms[roomName].createConstructionSite(x, y, STRUCTURE_ROAD);
    });
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
        }
    } catch (error) {
        console.log('Error in construction queue.');
        console.log(error.stack);
    }
}

module.exports = queueConstruction;
