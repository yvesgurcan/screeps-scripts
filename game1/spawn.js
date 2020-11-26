const { getCreepNamesFromType, getCreepActionsFromType } = require('util');

function spawn(creepType) {
    function from(spawnerName) {
        const creepActions = getCreepActionsFromType(creepType);
        const creepNumber = getCreepNamesFromType(creepType).length + 1;
        Game.spawns[spawnerName].spawnCreep(
            creepActions,
            `${creepType}${creepNumber}`
        );
    }

    return {
        from
    };
}

module.exports = spawn;
