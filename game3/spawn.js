const { getCreepActionsFromRole } = require('util');

function spawn(creepRole) {
    function from(spawnerName) {
        const creepActions = getCreepActionsFromRole(creepRole);
        const creepNumber = Game.time;
        Game.spawns[spawnerName].spawnCreep(
            creepActions,
            `${creepRole}${creepNumber}`,
            { memory: { role: creepRole } }
        );
    }

    return {
        from
    };
}

module.exports = spawn;
