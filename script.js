function getNextCreeperNumberFromType(creeperType) {
    return Object.keys(Game.creeps).filter(creepName => creepName.includes(creeperType)).length + 1;
}

function getCreeperActionsFromType(creeperType) {
    switch(creeperType) {
        default: {
            return [WORK, CARRY, MOVE];
        }
    }
}


function spawn(creeperType) {
    function from(spawnerName) {
        const creeperActions = getCreeperActionsFromType(creeperType);
        const creeperNumber = getNextCreeperNumberFromType(creeperType);
        Game.spawns[spawnerName].spawnCreep(creeperActions, `${creeperType}${creeperNumber}`);
    }
  
    return {
        from
    };
}

module.exports.loop = function () {
    spawn('Harvester').from('Spawn1');
    
    var creep = Game.creeps['Harvester1'];

    if (creep.store.getFreeCapacity() > 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
        return;
    }
    
    if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE ) {
        creep.moveTo(Game.spawns['Spawn1']);
        return;
    }
    
}
