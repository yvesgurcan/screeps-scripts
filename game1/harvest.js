function harvest(spawnerName) {
    return function (creepName) {
        const creep = Game.creeps[creepName];
        if (creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            const harvestResult = creep.harvest(sources[0]);
            console.log(harvestResult, ERR_NOT_IN_RANGE);
            if (harvestResult === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
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
