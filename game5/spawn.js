const { getCreepActionsFromRole, capitalize, getTime } = require('util');

function spawn(creepRole, customCreepActions) {
    function from(spawnerName) {
        const creepActions =
            customCreepActions || getCreepActionsFromRole(creepRole);

        const {
            format: { shortLivedStamp }
        } = getTime();

        const creepName = `${capitalize(creepRole)}-${shortLivedStamp}`;

        Game.spawns[spawnerName].spawnCreep(creepActions, creepName, {
            memory: {
                role: creepRole,
                stamp: shortLivedStamp
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
