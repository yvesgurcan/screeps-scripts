const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const spawn = require('spawn');
const { getCreepsFromRole } = require('util');

// E35N2

const MAX_BUILDER = 4;
const MAX_UPGRADERS = 2;
const MAX_HARVESTERS = 3;

function spawnCreeps() {
    const harvesters = getCreepsFromRole('harvester');
    if (harvesters.length < MAX_HARVESTERS) {
        Memory.buildingCreeps = true;
        spawn('harvester').from('Spawn1');
        return;
    }

    const upgraders = getCreepsFromRole('upgrader');
    if (upgraders.length < MAX_UPGRADERS) {
        Memory.buildingCreeps = true;
        spawn('upgrader').from('Spawn1');
        return;
    }

    const builders = getCreepsFromRole('builder');
    if (builders.length < MAX_BUILDER) {
        Memory.buildingCreeps = true;
        spawn('builder').from('Spawn1');
        return;
    }

    if (Memory.buildingCreeps === true) {
        console.log('Creep building queue empty.');
        Memory.buildingCreeps = false;
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

function displayInfo() {
    for (var name in Game.rooms) {
        if (!Memory.roomEnergy) {
            Memory.roomEnergy = {};
        }

        if (Memory.roomEnergy[name] !== Game.rooms[name].energyAvailable) {
            Memory.roomEnergy[name] = Game.rooms[name].energyAvailable;
            console.log(`Energy in room ${name}: ${Memory.roomEnergy[name]}`);
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

    displayInfo();
    spawnCreeps();
    runRoles();
};
