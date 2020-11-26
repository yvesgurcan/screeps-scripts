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

module.exports = {
    getCreepNamesFromType,
    getCreepActionsFromType
};
