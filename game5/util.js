function getCreepsFromRole(creepRole) {
    return _.filter(Game.creeps, creep => creep.memory.role === creepRole);
}

function getCreepActionsFromRole(creepRole) {
    switch (creepRole) {
        default: {
            return [WORK, CARRY, MOVE];
        }
    }
}

function getSource(creep, sourceIndex) {
    const sources = creep.room.find(FIND_SOURCES);
    return sources[sourceIndex || 0];
}

function pickNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

function harvest(creep) {
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
    getCreepActionsFromRole,
    pickNumberInRange,
    capitalize,
    harvest,
    defendRooms
};
