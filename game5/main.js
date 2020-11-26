const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const spawn = require('spawn');
const { getCreepsFromRole } = require('util');

const MAIN_ROOM = 'E35N2';

const MAX_BUILDER = 4;
const MAX_BUILDER_GRAND_TRAVAUX = MAX_BUILDER * 2;
const GRAND_TRAVAUX = 10;

const MAX_UPGRADERS = 2;
const MAX_HARVESTERS = 3;

function spawnCreeps() {
    const constructionSites = Game.rooms[MAIN_ROOM].find(
        FIND_CONSTRUCTION_SITES
    ).length;

    const harvesters = getCreepsFromRole('harvester');
    if (harvesters.length < MAX_HARVESTERS) {
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
        spawn('harvester').from('Spawn1');
        return;
    }

    const upgraders = getCreepsFromRole('upgrader');
    if (upgraders.length < MAX_UPGRADERS) {
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
        spawn('upgrader').from('Spawn1');
        return;
    }

    const builders = getCreepsFromRole('builder');
    if (builders.length < MAX_BUILDER) {
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
        spawn('builder').from('Spawn1');
        return;
    }

    if (
        constructionSites > GRAND_TRAVAUX &&
        builders.length < MAX_BUILDER_GRAND_TRAVAUX
    ) {
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = false;
        spawn('builder').from('Spawn1');
        return;
    }

    if (Memory.rooms[MAIN_ROOM].creepsQueueEmpty === false) {
        console.log('Creep building queue empty.');
        Memory.rooms[MAIN_ROOM].creepsQueueEmpty = true;
    }
}

function runRoles() {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }

        if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }

        if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }
}

function roomInfo() {
    for (const roomName in Game.rooms) {
        if (!Memory.rooms) {
            Memory.rooms = {};
        }

        if (!Memory.rooms[roomName]) {
            Memory.rooms[roomName] = {
                energy: 0,
                sites: 0
            };
        }

        const energyAvailable = Game.rooms[roomName].energyAvailable;
        if (Memory.rooms[roomName].energy !== energyAvailable) {
            Memory.rooms[roomName].energy = energyAvailable;
            console.log(
                `Energy in room ${roomName}: ${Memory.rooms[roomName].energy}`
            );
        }

        const energyCapacity = Game.rooms[roomName].energyCapacityAvailable;
        if (Memory.rooms[roomName].energyCapacity !== energyCapacity) {
            Memory.rooms[roomName].energyCapacity = energyCapacity;
            console.log(
                `Max energy capacity in room ${roomName}: ${Memory.rooms[roomName].energyCapacity}`
            );
        }

        const sites = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES).length;
        if (Memory.rooms[roomName].sites !== sites) {
            Memory.rooms[roomName].sites = sites;
            console.log(
                `Construction sites in room ${roomName}: ${
                    Memory.rooms[roomName].sites
                } (grand travaux: ${sites > GRAND_TRAVAUX})`
            );
        }
    }
}

module.exports.loop = function () {
    /*
    var tower = Game.getObjectById('70bcb26c6b5d0133e7b33b2d');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(
            FIND_STRUCTURES,
            {
                filter: structure => structure.hits < structure.hitsMax
            }
        );
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
    */

    roomInfo();
    spawnCreeps();
    runRoles();
};
