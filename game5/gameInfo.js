const {
    getCreepsFromRole,
    capitalize,
    printBodyCostForRoles,
    isTick
} = require('util');
const constants = require('constants');
const { ROLES, HP, ...selectedConstants } = constants;
const { GRANDS_TRAVAUX, MAX_BUILDERS_GRANDS_TRAVAUX, VETUSTE } = constants;

function gameInfo(reportAll = false) {
    try {
        if (isTick(10)) {
            console.log(`Tick #${Game.time}.`);
        }

        if (reportAll) {
            console.log(`Constants: ${JSON.stringify(selectedConstants)}`);
            printBodyCostForRoles();
        }

        if (!Memory.rooms) {
            Memory.rooms = {};
        }

        for (const roomName in Game.rooms) {
            const room = Memory.rooms[roomName];
            if (!room) {
                room = {};
            }

            // TODO: Should update if the number of spawns changes
            if (!room.spawns) {
                room.spawns = Game.rooms.E35N2.find(FIND_MY_STRUCTURES, {
                    filter: structure =>
                        structure.structureType === STRUCTURE_SPAWN
                }).map(spawn => spawn.name);
            }

            const energyAvailable = Game.rooms[roomName].energyAvailable;
            const energyCapacity = Game.rooms[roomName].energyCapacityAvailable;
            if (
                reportAll ||
                room.energy !== energyAvailable ||
                room.energyCapacity !== energyCapacity
            ) {
                const diff = reportAll || (room.energy || 0) - energyAvailable;
                room.energy = energyAvailable;
                if (
                    diff === true ||
                    room.energyCapacity !== energyCapacity ||
                    energyAvailable % 10 === 0 ||
                    diff >= 10 ||
                    diff <= -10
                ) {
                    console.log(
                        `Energy in room ${roomName}: ${room.energy}/${energyCapacity}`
                    );
                }
                room.energyCapacity = energyCapacity;
            }

            const availableEnergyStores = Game.rooms[roomName].find(
                FIND_STRUCTURES,
                {
                    filter: structure => {
                        return (
                            (structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        );
                    }
                }
            );

            if (!room.availableEnergyStores) {
                room.availableEnergyStores = [];
            }

            if (
                reportAll ||
                room.availableEnergyStores.length !==
                    availableEnergyStores.length
            ) {
                Memory.rooms[
                    roomName
                ].availableEnergyStores = availableEnergyStores;
                console.log(
                    `Available energy stores in room ${roomName}: ${room.availableEnergyStores.length}`
                );
            }

            if (!room.sites) {
                room.sites = [];
            }

            const sites = Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES);
            if (
                reportAll ||
                !room.sites ||
                room.sites.length !== sites.length
            ) {
                room.sites = sites;
                console.log(
                    `Construction sites in room ${roomName}: ${
                        room.sites.length
                    } (grands travaux: ${sites.length >= GRANDS_TRAVAUX})`
                );
            }

            const decayedStructures = Game.rooms[roomName].find(
                FIND_STRUCTURES,
                {
                    filter: structure => structure.hits < structure.hitsMax
                }
            );
            if (
                reportAll ||
                !room.decayedStructures ||
                room.decayedStructures.length !== decayedStructures.length
            ) {
                room.decayedStructures = decayedStructures;
                console.log(
                    `Structures needing repair in room ${roomName}: ${
                        room.decayedStructures.length
                    } (vétuste: ${decayedStructures.length >= VETUSTE})`
                );
            }

            if (!room.roles) {
                room.roles = {};
            }

            for (const roleName in ROLES) {
                const role = ROLES[roleName];
                const creeps = getCreepsFromRole(role.name);

                if (
                    reportAll ||
                    room.roles[`${role.name}s`] !== creeps.length
                ) {
                    room.roles[`${role.name}s`] = creeps.length;
                    const max =
                        role.name === 'builder' &&
                        room.sites.length >= GRANDS_TRAVAUX
                            ? MAX_BUILDERS_GRANDS_TRAVAUX
                            : role.name === 'repairer' &&
                              room.decayedStructures.length >= VETUSTE
                            ? MAX_BUILDERS_GRANDS_TRAVAUX
                            : role.max;

                    console.log(
                        `${capitalize(role.name)}s in room ${roomName}: ${
                            room.roles[`${role.name}s`]
                        }/${max}`
                    );

                    for (let i = 0; i < role.types.length; i++) {
                        if (!room.types) {
                            room.types = {};
                        }

                        const type = role.types[i];
                        room.types[type.name] = creeps.filter(
                            creep => creep.memory.type === type.name
                        ).length;
                        console.log(
                            `- ${type.name} in room ${roomName}: ${
                                room.types[type.name]
                            }/${Math.ceil(type.ratio * role.max)}`
                        );
                    }
                }
            }
        }
    } catch (error) {
        console.log('Error while printing game info.');
        console.log(error.stack);
    }
}

module.exports = gameInfo;
