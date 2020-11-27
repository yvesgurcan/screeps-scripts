const { capitalize, getTime, getCreepsFromRole } = require('util');
const {
    MAIN_ROOM,
    GRAND_TRAVAUX,
    MAX_BUILDER,
    MAX_BUILDER_GRAND_TRAVAUX,
    MAX_UPGRADERS,
    MAX_HARVESTERS
} = require('constants');

function spawnCreeps() {
    const constructionSites = Game.rooms[MAIN_ROOM].find(
        FIND_CONSTRUCTION_SITES
    ).length;

    const harvesters = getCreepsFromRole('harvester');
    if (harvesters.length < MAX_HARVESTERS) {
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
        spawn('harvester').from('Spawn1');
        return;
    }

    const upgraders = getCreepsFromRole('upgrader');
    if (upgraders.length < MAX_UPGRADERS) {
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
        spawn('upgrader').from('Spawn1');
        return;
    }

    const builders = getCreepsFromRole('builder');
    if (builders.length < MAX_BUILDER) {
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
        spawn('builder').from('Spawn1');
        return;
    }

    if (
        constructionSites > GRAND_TRAVAUX &&
        builders.length < MAX_BUILDER_GRAND_TRAVAUX
    ) {
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
        spawn('builder').from('Spawn1');
        return;
    }

    if (Memory.rooms[MAIN_ROOM].creepsQueueEmpty === false) {
        console.log('Creep building queue empty.');
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = true;
    }
}

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

function getCreepActionsFromRole(creepRole) {
    switch (creepRole) {
        default: {
            return [WORK, CARRY, CARRY, MOVE, MOVE];
        }
        case 'builder': {
            return [WORK, CARRY, CARRY, MOVE, MOVE];
        }
        case 'harvester': {
            return [WORK, CARRY, CARRY, MOVE, MOVE];
        }
        case 'upgrader': {
            return [WORK, CARRY, CARRY, MOVE, MOVE];
        }
    }
}

module.exports = spawnCreeps;
