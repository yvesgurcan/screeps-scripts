const { ROLES } = require('constants');

function getCreepsFromRole(creepRole) {
    return _.filter(Game.creeps, creep => creep.memory.role === creepRole);
}

function pickNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

function capitalizedCharacters(string, numberOfCharacters = 2) {
    return (
        string.charAt(0).toUpperCase() + string.substring(1, numberOfCharacters)
    );
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

function cleanUpCreepMemory() {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log(`Clearing non-existing creep memory: ${name}`);
        }
    }
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

module.exports = {
    getCreepsFromRole,
    pickNumberInRange,
    capitalize,
    capitalizedCharacters,
    getTime,
    getBodyCost,
    printBodyCostForRoles,
    cleanUpCreepMemory,
    cpuUsage,
    cpuExceedsLimit
};
