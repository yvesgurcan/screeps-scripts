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
            shortLivedStamp: `${hour}-${minute}-${second}`
        }
    };
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

function getSource(creep, sourceIndex) {
    const sources = creep.room.find(FIND_SOURCES);
    return sources[sourceIndex || 0];
}

function harvest(creep) {
    // TODO: Distribute sources more intelligently
    let sourceIndex = 1;

    try {
        if (
            creep.memory.role === 'harvester' ||
            creep.memory.role === 'upgrader'
        ) {
            sourceIndex = 0;
        }
    } catch (error) {
        console.log('Error while accessing creep role.');
        console.log(error.stack);
    }

    const source = getSource(creep, sourceIndex);

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        // creep.say('🔄harvest');
        creep.moveTo(source, {
            visualizePathStyle: { stroke: '#ffaa00' }
        });
    }
}

module.exports = {
    getCreepsFromRole,
    pickNumberInRange,
    capitalize,
    getTime,
    getBodyCost,
    getSource,
    cleanUpCreepMemory,
    harvest
};
