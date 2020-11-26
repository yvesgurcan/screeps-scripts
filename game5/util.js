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

function harvest(creep) {
    const source = getSource(creep, 1);
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
            visualizePathStyle: { stroke: '#ffaa00' }
        });
    }
}

function pickNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

module.exports = {
    getCreepsFromRole,
    getCreepActionsFromRole,
    pickNumberInRange,
    capitalize,
    harvest
};
