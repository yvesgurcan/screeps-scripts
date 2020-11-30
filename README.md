# Screeps Scripts

## Automated behaviors

### Spawner

### Creeps

#### Harvest (harvester)

-   Creep moves towards source of energy #1 (or #0 if creep is of type `Woodhouse`) in the room to harvest once in range.

#### Store (harvester)

-   Creep moves towards the closest extension or spawn (or container if creep is of type `Alfred`) in the room that is not full to transfer energy once in range.

#### Build (builder)

-   Creep moves towards closest construction site to build once in range.

#### Withdraw (claimer, maintainer, repairer, upgrader)

-   Creep moves towards closest container with energy to withdraw once in range. Target container is memorized. If container becomes empty, creep will keep moving towards the same container.

## Error codes

https://screeps.fandom.com/wiki/Error_Constants

```
OK: 0
ERR_NOT_OWNER: -1
ERR_NO_PATH: -2
ERR_NAME_EXISTS: -3
ERR_BUSY: -4
ERR_NOT_FOUND: -5
ERR_NOT_ENOUGH_ENERGY: -6
ERR_NOT_ENOUGH_RESOURCES: -6
ERR_INVALID_TARGET: -7
ERR_FULL: -8
ERR_NOT_IN_RANGE: -9
ERR_INVALID_ARGS: -10
ERR_TIRED: -11
ERR_NO_BODYPART: -12
ERR_NOT_ENOUGH_EXTENSIONS: -6
ERR_RCL_NOT_ENOUGH: -14
ERR_GCL_NOT_ENOUGH: -15
```

## Structures

```
STRUCTURE_SPAWN: "spawn",
STRUCTURE_EXTENSION: "extension",
STRUCTURE_ROAD: "road",
STRUCTURE_WALL: "constructedWall",
STRUCTURE_RAMPART: "rampart",
STRUCTURE_KEEPER_LAIR: "keeperLair",
STRUCTURE_PORTAL: "portal",
STRUCTURE_CONTROLLER: "controller",
STRUCTURE_LINK: "link",
STRUCTURE_STORAGE: "storage",
STRUCTURE_TOWER: "tower",
STRUCTURE_OBSERVER: "observer",
STRUCTURE_POWER_BANK: "powerBank",
STRUCTURE_POWER_SPAWN: "powerSpawn",
STRUCTURE_EXTRACTOR: "extractor",
STRUCTURE_LAB: "lab",
STRUCTURE_TERMINAL: "terminal",
STRUCTURE_CONTAINER: "container",
STRUCTURE_NUKER: "nuker",
STRUCTURE_FACTORY: "factory",
STRUCTURE_INVADER_CORE: "invaderCore",
```
