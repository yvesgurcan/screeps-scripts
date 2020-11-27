const { capitalize, getTime, getCreepsFromRole } = require('util');
const {
    MAIN_ROOM,
    GRANDS_TRAVAUX,
    MAX_BUILDER_GRANDS_TRAVAUX,
    ROLES
} = require('constants');

function spawnCreeps() {
    try {
        let nextSpawnDecided = false;

        for (const roleName in ROLES) {
            const role = ROLES[roleName];
            const creeps = getCreepsFromRole(role.name);

            if (creeps.length < role.max) {
                console.log('next spawn:', role.name);
                nextSpawnDecided = true;
                Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
                spawn(role.name).from('Spawn1');
                break;
            }
        }

        if (nextSpawnDecided) {
            return;
        }

        const constructionSites = Game.rooms[MAIN_ROOM].find(
            FIND_CONSTRUCTION_SITES
        ).length;

        if (
            constructionSites > GRANDS_TRAVAUX &&
            builders.length < MAX_BUILDER_GRANDS_TRAVAUX
        ) {
            Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
            spawn('builder').from('Spawn1');
            return;
        }

        if (Memory.rooms[MAIN_ROOM].creepsQueueEmpty === false) {
            console.log('Creep building queue empty.');
            Memory.rooms[MAIN_ROOM].creepsQueueEmpty = true;
        }
    } catch (error) {
        console.log(`Error in creep spawning queue.`);
        console.log(error.stack);
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
            Game.spawns[
                spawnerName
            ].room.visual.text(
                `🛠️${spawningCreep.memory.role}`,
                Game.spawns[spawnerName].pos.x,
                Game.spawns[spawnerName].pos.y - 1,
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
        case 'maintainer': {
            return [WORK, CARRY, CARRY, MOVE];
        }
    }
}

module.exports = spawnCreeps;
