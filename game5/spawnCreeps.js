const {
    capitalizedCharacters,
    getTime,
    getCreepsFromRole,
    getBodyCost,
    isTick
} = require('util');
const {
    GRANDS_TRAVAUX,
    MAX_BUILDERS_GRANDS_TRAVAUX,
    ROLES,
    RICK
} = require('constants');

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

function spawnCreeps() {
    try {
        if (!isTick(5)) {
            return;
        }

        for (const roomName in Game.rooms) {
            const room = Memory.rooms[roomName];
            let nextSpawnCandidates = [];
            let roleCount = 0;
            let cantAfford = false;

            for (const roleName in ROLES) {
                roleCount++;
                const role = ROLES[roleName];
                const boostSpawnRule = role.boostSpawnRule || (() => false);

                if (getBodyCost(role.bodyParts) > room.energy) {
                    cantAfford++;
                    continue;
                }

                const creeps = getCreepsFromRole(role.name);

                const extraCreep = boostSpawnRule(creeps, roomName);

                // Gather roles that have a deficit in their number of creeps
                if (creeps.length < role.max || extraCreep) {
                    // Figure out type
                    let spawnType = extraCreep || ROLES[roleName].types[0].name;
                    for (let i = 0; i < ROLES[roleName].types.length; i++) {
                        const type = ROLES[roleName].types[i];
                        const creepOfType = creeps.filter(
                            creep => creep.memory.type === type.name
                        ).length;
                        if (creepOfType < Math.ceil(role.max * type.ratio)) {
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
                // Pick role with the most dire deficit of creeps
                nextSpawnCandidates.sort((a, b) => a.diff - b.diff);
                console.log(
                    `Spawn candidates: ${JSON.stringify(nextSpawnCandidates)}`
                );

                room.creepsQueueEmpty = false;
                if (nextSpawnCandidates.length === 1) {
                    spawn(
                        nextSpawnCandidates[0].name,
                        nextSpawnCandidates[0].type
                    ).from(room.spawns[0].name);
                    return;
                }

                spawn(
                    nextSpawnCandidates[0].name,
                    nextSpawnCandidates[0].type
                ).from(room.spawns[0].name);
                return;
            }

            if (cantAfford === roleCount) {
                return;
            }

            if (room.creepsQueueEmpty === false) {
                console.log('Creep building queue empty.');
                room.creepsQueueEmpty = true;
            }
        }
    } catch (error) {
        console.log(`Error in creep spawning queue.`);
        console.log(error.stack);
    }
}

module.exports = spawnCreeps;
