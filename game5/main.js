const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const spawn = require('spawn');
const { getCreepsFromRole } = require('util');

// E35N2

function spawnCreeps() {
    const upgraders = getCreepsFromRole('upgrader');
    if (upgraders.length < 2) {
        spawn('upgrader').from('Spawn1');
        return;
    }

    const builders = getCreepsFromRole('builder');
    if (builders.length < 2) {
        spawn('builder').from('Spawn1');
        return;
    }

    const harvesters = getCreepsFromRole('harvester');
    if (harvesters.length < 4) {
        spawn('harvester').from('Spawn1');
        return;
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

    spawnCreeps();
    runRoles();
};
