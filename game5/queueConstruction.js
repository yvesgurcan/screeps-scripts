const { CONSTRUCTION_QUEUE } = require('constants');

function queueConstruction() {
    CONSTRUCTION_QUEUE.forEach(({ roomName, x, y, type }) => {
        const lookAt = Game.rooms[roomName].lookAt(x, y);
        const occupied = lookAt.find(
            geography => geography.structure || geography.constructionSite
        );

        if (occupied) {
            const obstacle = occupied.structure || occupied.constructionSite;
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
}

module.exports = queueConstruction;
