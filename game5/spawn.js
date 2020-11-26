const { getCreepActionsFromRole, capitalize } = require('util');

function spawn(creepRole, customCreepActions) {
    function from(spawnerName) {
        const creepActions =
            customCreepActions || getCreepActionsFromRole(creepRole);
        const creepId = Game.time;
        const creepName = `${capitalize(creepRole)}${creepId}`;

        Game.spawns[spawnerName].spawnCreep(creepActions, creepName, {
            memory: {
                role: creepRole,
                id: creepId
            }
        });

        // Visuals
        if (Game.spawns[spawnerName].spawning) {
            const spawningCreep =
                Game.creeps[Game.spawns[spawnerName].spawning.name];
            Game.spawns[spawnerName].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[spawnerName].pos.x + 1,
                Game.spawns[spawnerName].pos.y,
                { align: 'left', opacity: 0.8 }
            );
        }
    }

    return {
        from
    };
}

module.exports = spawn;
