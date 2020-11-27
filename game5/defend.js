function defend() {
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

module.exports = defend;
