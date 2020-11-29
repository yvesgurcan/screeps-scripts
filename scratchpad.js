Game.rooms.E35N2.find(FIND_STRUCTURES, {
    filter: structure =>
        structure.structureType === STRUCTURE_CONTAINER &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
});
