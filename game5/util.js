const { ROLES } = require('constants');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

function capitalizedCharacters(string, numberOfCharacters = 2) {
    return (
        string.charAt(0).toUpperCase() + string.substring(1, numberOfCharacters)
    );
}

function cpuUsage(info, record = false) {
    const usage = Math.floor(Game.cpu.getUsed());

    if (record) {
        if (Memory.cpuUsage === usage) {
            return;
        }
        Memory.cpuUsage = usage;
    }

    console.log(
        `CPU usage${info ? ` at ${info}` : ''}: ${usage}/${Game.cpu.limit}.`
    );
}

function cpuExceedsLimit() {
    const exceeds = Game.cpu.getUsed() > Game.cpu.limit;

    if (exceeds) {
        console.log(`CPU usage limit reached.`);
    }

    return exceeds;
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
            shortLivedStamp: `${hour}-${minute}-${second}`
        }
    };
}

function printBodyCostForRoles() {
    const cost = {};
    for (const roleName in ROLES) {
        const role = ROLES[roleName];
        cost[role.name] = getBodyCost(role.bodyParts);
    }
    console.log(`Creep cost: ${JSON.stringify(cost)}`);
}

function getBodyCost(bodyParts) {
    return _.sum(bodyParts, bodyPart => BODYPART_COST[bodyPart]);
}

function getCreepsFromRole(creepRole) {
    return _.filter(Game.creeps, creep => creep.memory.role === creepRole);
}

function cleanUpCreepMemory() {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log(`Clearing non-existing creep memory: ${name}`);
        }
    }
}

function isTick(tick = 2) {
    return Game.time % tick === 0;
}

function isNotConstructibleForRampart(x, y, terrain, structures) {
    const coordinates = `${x}-${y}`;
    if (terrain.get(x, y) === TERRAIN_MASK_WALL) {
        return false;
    }

    if (
        structures[y] &&
        structures[y][x] &&
        structures[y][x].filter(
            structure => structure.structureType === STRUCTURE_WALL
        ).length > 0
    ) {
        return false;
    }

    return coordinates;
}

function isCriticalTiles(topX, topY, terrain, roomName) {
    const bottomY = topY + 1;
    const bottomX = topX + 1;

    const structures = Game.rooms[roomName].lookForAtArea(
        LOOK_STRUCTURES,
        topY - 1,
        topX - 1,
        bottomY + 1,
        bottomX + 1
    );

    const criticalTiles = new Set();

    const topLeft = isNotConstructibleForRampart(
        topX,
        topY,
        terrain,
        structures
    );
    const topRight = isNotConstructibleForRampart(
        bottomX,
        topY,
        terrain,
        structures
    );
    const bottomLeft = isNotConstructibleForRampart(
        topX,
        bottomY,
        terrain,
        structures
    );
    const bottomRight = isNotConstructibleForRampart(
        bottomX,
        bottomY,
        terrain,
        structures
    );

    const centerPlains = [topLeft, topRight, bottomLeft, bottomRight].filter(
        tile => tile
    );

    centerPlains.map(plain => criticalTiles.add(plain));

    return criticalTiles;
}

module.exports = {
    getCreepsFromRole,
    capitalize,
    capitalizedCharacters,
    getTime,
    getBodyCost,
    printBodyCostForRoles,
    cleanUpCreepMemory,
    cpuUsage,
    cpuExceedsLimit,
    isTick,
    isCriticalTiles
};
