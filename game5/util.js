function getCreepsFromRole(creepRole) {
    return _.filter(Game.creeps, creep => creep.memory.role === creepRole);
}

function pickNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

function getTime() {
    const now = new Date();
    now.setHours(now.getHours() - 8);

    const [month, date, year] = now.toLocaleDateString('en-US').split('/');
    const [hour, minute, second] = now
        .toLocaleTimeString('en-US', { hour12: false })
        .split(/:| /);

    const paddedMonth = month < 10 ? `0${month}` : month;
    const paddedDate = date < 10 ? `0${date}` : date;

    return {
        month: paddedMonth,
        date: paddedDate,
        year,
        hour,
        minute,
        second,
        format: {
            shortLivedStamp: `${paddedDate}-${hour}-${minute}-${second}`
        }
    };
}

function cleanUpCreepMemory() {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log(`Clearing non-existing creep memory: ${name}`);
        }
    }
}

function getSource(creep, sourceIndex) {
    const sources = creep.room.find(FIND_SOURCES);
    return sources[sourceIndex || 0];
}

function harvest(creep) {
    // TODO: Distribute sources more intelligently
    let sourceIndex = 1;
    if (creep.memory.role === 'harvester' || creep.memory.role === 'upgrader') {
        sourceIndex = 0;
    }

    const source = getSource(creep, sourceIndex);

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
            visualizePathStyle: { stroke: '#ffaa00' }
        });
    }
}

function defendRooms() {
    for (const roomName in Game.rooms) {
        const towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        });
        const hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);

        if (hostiles.length > 0) {
            const username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}.`, 0);
            console.log(`User ${username} spotted in room ${roomName}.`);

            towers.forEach(tower => tower.attack(hostiles[0]));
        } else {
            towers.forEach(tower => {
                const closestDamagedStructure = tower.pos.findClosestByRange(
                    FIND_STRUCTURES,
                    {
                        filter: structure => structure.hits < structure.hitsMax
                    }
                );

                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            });
        }
    }
}

module.exports = {
    getCreepsFromRole,
    pickNumberInRange,
    capitalize,
    getTime,
    cleanUpCreepMemory,
    harvest,
    defendRooms
};
