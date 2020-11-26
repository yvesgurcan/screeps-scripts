function getCreepNamesFromType(creepType) {
    return Object.keys(Game.creeps).filter(creepName => creepName.includes(creepType));
}

function getCreepActionsFromType(creepType) {
    switch(creepType) {
        default: {
            return [WORK, CARRY, MOVE];
        }
    }
}


function spawn(creepType) {
    function from(spawnerName) {
        const creepActions = getCreepActionsFromType(creepType);
        const creepNumber = getCreepNamesFromType(creepType).length + 1;
        Game.spawns[spawnerName].spawnCreep(creepActions, `${creepType}${creepNumber}`);
    }
  
    return {
        from
    };
}

function harvest(spawnerName) {
    return function (creepName) {
        const creep = Game.creeps[creepName];
        if (creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }

            return;
        }

        if (creep.transfer(Game.spawns[spawnerName], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns[spawnerName]);
        }
    }
}

module.exports.loop = function () {
    spawn('Harvester').from('Spawn1');
    
    const harvesterNames = getCreepNamesFromType('Harvester');
    harvesterNames.forEach(harvest('Spawn1'));
}
