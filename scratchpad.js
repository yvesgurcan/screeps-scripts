Game.rooms.E35N2.find(FIND_STRUCTURES, {
    filter: structure =>
        structure.structureType === STRUCTURE_CONTAINER &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
});

var sources = Game.spawns[NomSpawner].room.find(FIND_SOURCES);
for (var j = 0; j < sources.length; j++) {
    var chemin = Game.spawns[NomSpawner].pos.findPathTo(sources[j].pos);
    for (var i = 0; i < chemin.length; i++) {
        Game.spawns[NomSpawner].room.createConstructionSite(
            chemin[i].x,
            chemin[i].y,
            STRUCTURE_ROAD
        );
    }
}
