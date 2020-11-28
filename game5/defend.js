const HP_1MILLION = 100000000;
const HP_250K = 250000;
const HP_500K = 500000;

const SAFE_MODE_RESULTS_MAP = {
    OK: 'Success',
    ERR_NOT_OWNER: 'You are not the owner of this controller',
    ERR_BUSY: 'There is another room in safe mode already',
    ERR_NOT_ENOUGH_RESOURCES: 'There is no safe mode activations available',
    ERR_TIRED: 'Safe mode is still cooling down.'
};

function activateSafeMode(roomName) {
    const resultSafeMode = Game.rooms[roomName].controller.activateSafeMode();
    const message = `Safe mode activation attempt in room ${roomName}: ${SAFE_MODE_RESULTS_MAP[resultSafeMode]}.`;
    Game.notify(message, 0);
    console.log(message);
}

function defend() {
    try {
        for (const roomName in Game.rooms) {
            const towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_TOWER }
            });
            const hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);

            if (hostiles.length > 0) {
                const username = hostiles[0].owner.username;
                const message = `User ${username} spotted in room ${roomName}.`;
                Game.notify(message, 0);
                console.log(message);

                activateSafeMode(roomName);

                towers.forEach(tower => tower.attack(hostiles[0]));
            } else {
                towers.forEach(tower => {
                    const closestDamagedStructure = tower.pos.findClosestByRange(
                        FIND_STRUCTURES,
                        {
                            filter: structure =>
                                structure.hits < structure.hitsMax &&
                                // Don't repair beyond
                                structure.hits < HP_500K
                        }
                    );

                    if (closestDamagedStructure) {
                        tower.repair(closestDamagedStructure);
                    }
                });
            }
        }
    } catch (error) {
        const message = `An error occurred in the defense algorithm.`;
        Game.notify(message, 0);
        Game.notify(error.stack, 0);
        console.log(message);
        console.log(error.stack);
    }
}

module.exports = { activateSafeMode, defend };
