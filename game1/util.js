function getCreepNamesFromType(creepType) {
    return Object.keys(Game.creeps).filter(creepName =>
        creepName.includes(creepType)
    );
}

function getCreepActionsFromType(creepType) {
    switch (creepType) {
        default: {
            return [WORK, CARRY, MOVE];
        }
    }
}

function pickNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    getCreepNamesFromType,
    getCreepActionsFromType,
    pickNumberInRange
};
