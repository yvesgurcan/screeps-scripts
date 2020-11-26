var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            // Room controller must be re-upgraded all 20,000. Otherwise, you lose control of the room.
            if (
                creep.upgradeController(creep.room.controller) ==
                ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;
