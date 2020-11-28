const { capitalize, getTime, getCreepsFromRole } = require('util');
const {
    GRANDS_TRAVAUX,
    MAX_BUILDER_GRANDS_TRAVAUX,
    ROLES
} = require('constants');

function spawnCreeps() {
    try {
        for (const roomName in Game.rooms) {
            let nextSpawnCandidates = [];

            for (const roleName in ROLES) {
                const role = ROLES[roleName];
                const creeps = getCreepsFromRole(role.name);

                // Gather roles that have a deficit in their number of creeps
                if (creeps.length < role.max) {
                    nextSpawnCandidates.push({
                        name: role.name,
                        diff: creeps.length - role.max
                    });
                }
            }

            if (nextSpawnCandidates.length > 0) {
                Memory.rooms[roomName].creepsQueueEmpty = false;
                if (nextSpawnCandidates.length === 1) {
                    spawn(nextSpawnCandidates[0].name).from('Spawn1');
                    return;
                }

                // Pick role with the most dire deficit of creeps
                nextSpawnCandidates.sort((a, b) => a.diff - b.diff);
                spawn(nextSpawnCandidates[0].name).from('Spawn1');
                return;
            }

            const constructionSites = Game.rooms[roomName].find(
                FIND_CONSTRUCTION_SITES
            ).length;

            if (
                constructionSites > GRANDS_TRAVAUX &&
                builders.length < MAX_BUILDER_GRANDS_TRAVAUX
            ) {
                Memory.rooms[roomName].creepsQueueEmpty = false;
                spawn('builder').from('Spawn1');
                return;
            }

            if (Memory.rooms[roomName].creepsQueueEmpty === false) {
                console.log('Creep building queue empty.');
                Memory.rooms[roomName].creepsQueueEmpty = true;
            }
        }
    } catch (error) {
        console.log(`Error in creep spawning queue.`);
        console.log(error.stack);
    }
}

function spawn(creepRole, customCreepActions) {
    function from(spawnerName) {
        const creepActions = customCreepActions || ROLES[creepRole].bodyParts;

        const {
            format: { shortLivedStamp }
        } = getTime();

        const creepGeneration = ROLES[creepRole].generation
            ? `-G${ROLES[creepRole].generation}`
            : '';

        const creepName = `${capitalize(
            creepRole
        )}${creepGeneration}-${shortLivedStamp}`;

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
                Game.spawns[spawnerName].pos.x - 1.5,
                Game.spawns[spawnerName].pos.y + 1,
                { align: 'left', opacity: 0.8 }
            );
        }
    }

    return {
        from
    };
}

module.exports = spawnCreeps;
