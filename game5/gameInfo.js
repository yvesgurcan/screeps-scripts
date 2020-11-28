const {
    getCreepsFromRole,
    capitalize,
    printBodyCostForRoles
} = require('util');
const constants = require('constants');
const { ROLES, ...constantsWithoutRoles } = constants;
const { GRANDS_TRAVAUX } = constants;

function gameInfo(reportAll = false) {
    try {
        if (reportAll) {
            console.log(`Constants: ${JSON.stringify(constantsWithoutRoles)}`);
            printBodyCostForRoles();
        }

        if (!Memory.rooms) {
            Memory.rooms = {};
        }

        for (const roomName in Game.rooms) {
            if (!Memory.rooms[roomName]) {
                Memory.rooms[roomName] = {
                    energy: 0,
                    sites: 0
                };
            }

            const energyAvailable = Game.rooms[roomName].energyAvailable;
            if (
                reportAll ||
                Memory.rooms[roomName].energy !== energyAvailable
            ) {
                const diff =
                    reportAll ||
                    (Memory.rooms[roomName].energy || 0) - energyAvailable;
                Memory.rooms[roomName].energy = energyAvailable;
                if (
                    diff === true ||
                    energyAvailable % 10 === 0 ||
                    diff >= 10 ||
                    diff <= -10
                ) {
                    console.log(
                        `Energy in room ${roomName}: ${Memory.rooms[roomName].energy}`
                    );
                }
            }

            const energyCapacity = Game.rooms[roomName].energyCapacityAvailable;
            if (
                reportAll ||
                Memory.rooms[roomName].energyCapacity !== energyCapacity
            ) {
                Memory.rooms[roomName].energyCapacity = energyCapacity;
                console.log(
                    `Max energy capacity in room ${roomName}: ${Memory.rooms[roomName].energyCapacity}`
                );
            }

            const sites = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES)
                .length;
            if (reportAll || Memory.rooms[roomName].sites !== sites) {
                Memory.rooms[roomName].sites = sites;
                console.log(
                    `Construction sites in room ${roomName}: ${
                        Memory.rooms[roomName].sites
                    } (grand travaux: ${sites > GRANDS_TRAVAUX})`
                );
            }

            if (!Memory.rooms[roomName].roles) {
                Memory.rooms[roomName].roles = {};
            }

            for (const roleName in ROLES) {
                const role = ROLES[roleName];
                const creeps = getCreepsFromRole(role.name);

                if (
                    reportAll ||
                    Memory.rooms[roomName].roles[`${role.name}s`] !==
                        creeps.length
                ) {
                    Memory.rooms[roomName].roles[`${role.name}s`] =
                        creeps.length;
                    console.log(
                        `${capitalize(role.name)}s in room ${roomName}: ${
                            Memory.rooms[roomName].roles[`${role.name}s`]
                        } (max: ${
                            Memory.rooms[roomName].roles[`${role.name}s`] >=
                            role.max
                        })`
                    );
                }
            }

            /*
            const harvesters = getCreepsFromRole('harvester').length;
            if (reportAll || Memory.roles.harvesters !== harvesters) {
                Memory.roles.harvesters = harvesters;
                console.log(
                    `Harvesters: ${Memory.roles.harvesters} (max: ${
                        Memory.roles.harvesters >= MAX_HARVESTERS
                    })`
                );
            }
    
            const builders = getCreepsFromRole('builder').length;
            if (reportAll || Memory.roles.builders !== builders) {
                Memory.roles.builders = builders;
                console.log(`Builders: ${Memory.roles.builders}`);
            }
    
            const upgraders = getCreepsFromRole('upgrader').length;
            if (reportAll || Memory.roles.upgraders !== upgraders) {
                Memory.roles.upgraders = upgraders;
                console.log(
                    `Upgraders: ${Memory.roles.upgraders} (max: ${
                        Memory.roles.upgraders >= MAX_UPGRADERS
                    })`
                );
            }
    
            const maintainers = getCreepsFromRole('maintainer').length;
            if (reportAll || Memory.roles.maintainers !== maintainers) {
                Memory.roles.maintainers = maintainers;
                console.log(
                    `Maintainers: ${Memory.roles.maintainers} (max: ${
                        Memory.roles.maintainers >= MAX_MAINTAINERS
                    })`
                );
            }
            */
        }
    } catch (error) {
        console.log('Error while printing game info.');
        console.log(error.stack);
    }
}

module.exports = gameInfo;
