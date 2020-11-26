const { pickNumberInRange } = require('util');

function assignSourceFromList(sources) {
    return sources[0];
    const randomNumber = pickNumberInRange(0, sources.length);
    return sources[randomNumber];
}

function harvest(spawnerName) {
    return function (creepName) {
        const creep = Game.creeps[creepName];
        if (creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            const source = assignSourceFromList(sources);

            const harvestResult = creep.harvest(source);
            if (harvestResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

            return;
        }

        const transferResult = creep.transfer(
            Game.spawns[spawnerName],
            RESOURCE_ENERGY
        );
        if (transferResult === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns[spawnerName]);
        }
    };
}

module.exports = harvest;
