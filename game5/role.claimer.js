const { upgraderRoutine } = require('role.upgrader');
const { ROLES } = require('constants');

// Same as upgraders for now
function claimerRoutine(creep) {
    upgraderRoutine(creep);
}

module.exports = claimerRoutine;
