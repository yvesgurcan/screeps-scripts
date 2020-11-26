const { getCreepNamesFromType, getCreepActionsFromType } = require('util');

function spawn(creepType) {
    function from(spawnerName) {
        const creepActions = getCreepActionsFromType(creepType);
        const creepNumber = getCreepNamesFromType(creepType).length + 1;
        const spawnResult = Game.spawns[spawnerName].spawnCreep(
            creepActions,
            `${creepType}${creepNumber}`,
            { memory: { type: creepType } }
        );
    }

    return {
        from
    };
}

module.exports = spawn;
