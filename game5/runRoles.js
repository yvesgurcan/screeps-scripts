const harvesterRoutine = require('role.harvester');
const upgraderRoutine = require('role.upgrader');
const builderRoutine = require('role.builder');
const maintainerRoutine = require('role.maintainer');
const repairerRoutine = require('role.repairer');
const claimerRoutine = require('role.claimer');

// Add new routines here
const routines = {
    harvesterRoutine,
    upgraderRoutine,
    builderRoutine,
    maintainerRoutine,
    repairerRoutine,
    claimerRoutine
};

function runRoles() {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];

        try {
            routines[`${creep.memory.role}Routine`](creep);
        } catch (error) {
            console.log('Error while executing routine.');
            console.log(error.stack);
        }
    }
}

module.exports = runRoles;
