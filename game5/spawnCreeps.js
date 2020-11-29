const {
    capitalize,
    capitalizedCharacters,
    getTime,
    getCreepsFromRole
} = require('util');
const {
    GRANDS_TRAVAUX,
    MAX_BUILDER_GRANDS_TRAVAUX,
    ROLES,
    RICK
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
                    // Figure out type
                    let spawnType = ROLES[roleName].types[0].name;
                    for (let i = 0; i < ROLES[roleName].types.length; i++) {
                        const type = ROLES[roleName].types[i];
                        const creepOfType = creeps.filter(
                            creep => creep.memory.type === type.name
                        ).length;
                        if (creepOfType < role.max * type.ratio) {
                            spawnType = type.name;
                            break;
                        }
                    }

                    nextSpawnCandidates.push({
                        name: role.name,
                        diff: creeps.length - role.max,
                        type: spawnType
                    });
                }
            }

            if (nextSpawnCandidates.length > 0) {
                Memory.rooms[roomName].creepsQueueEmpty = false;
                if (nextSpawnCandidates.length === 1) {
                    spawn(
                        nextSpawnCandidates[0].name,
                        nextSpawnCandidates[0].type
                    ).from('Spawn1');
                    return;
                }

                // Pick role with the most dire deficit of creeps
                nextSpawnCandidates.sort((a, b) => a.diff - b.diff);
                spawn(
                    nextSpawnCandidates[0].name,
                    nextSpawnCandidates[0].type
                ).from('Spawn1');
                return;
            }

            const constructionSites = Game.rooms[roomName].find(
                FIND_CONSTRUCTION_SITES
            ).length;

            const builders = getCreepsFromRole('builder');
            if (
                constructionSites > GRANDS_TRAVAUX &&
                builders.length < MAX_BUILDER_GRANDS_TRAVAUX
            ) {
                Memory.rooms[roomName].creepsQueueEmpty = false;
                spawn('builder', RICK).from('Spawn1');
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

function spawn(creepRole, creepType) {
    function from(spawnerName) {
        const creepActions = ROLES[creepRole].bodyParts;

        const { name, stamp, generation } = getName(creepRole, creepType);

        Game.spawns[spawnerName].spawnCreep(creepActions, name, {
            memory: {
                role: creepRole,
                type: creepType,
                stamp,
                generation
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

function getName(creepRole, creepType) {
    const {
        format: { shortLivedStamp }
    } = getTime();

    const { generation } = ROLES[creepRole];

    const creepRoleShort = capitalizedCharacters(creepRole, 2);
    const creepGeneration = generation || '';

    const creepName = `${creepType}-${creepRoleShort}${creepGeneration}-${shortLivedStamp}`;

    return {
        name: creepName,
        stamp: shortLivedStamp,
        type: creepType,
        generation
    };
}

module.exports = spawnCreeps;
