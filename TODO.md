-   Rename `gameInfo` to `gameMemory`.
-   Add a "Memory version" variable. Update this version in memory if different from the script.
-   Move `bodyParts` to memory. `bodyParts` must be updated if memory version differs.
-   Add body parts dynamically to some roles if the room can afford it. The value of`canAffordMoreBodyParts` (a integer) is based on: how many extensions in the room (must be at least > 0), how many harvesters are alive (more harvesters means more body parts), and how much energy in the room (more energy means more body parts). The number of additional body parts must be capped (no more than 7 parts total).

-   Create a Corbusier type for builders with ratio 0.66. Alter behavior of builders of type "Corbusier" to repair if structures need repair and they don't have anything to build. Other types upgrade if they don't have anything to build.

-   Builders should use all their energy in store to repair a wall/rampart they just constructed.

-   Register in memory the list of dead energy sources for each room every 2 ticks.
-   Replace harvesting-related logic that is tied to the availability of energy sources. Alternatively, develop better strategies based on whether an energy source is dead.

-   If energy source dies and harvester has resources in their store, store these resources in extensions/containers.
-   Calculate distance between a source of energy and a container to estimate number, speed, capacity (50 per carry part), and work (2 per work part) of Alfred harvesters.
-   Creep recuperates energy lying around in room.
-   Only defend controlled rooms with towers. Still notify in controlled rooms without towers.
-   Add function to deregister critical tiles from memory.
-   Improve towers repair logic by choosing its target randomly.
-   Have builder give a little energy to walls and remparts upon build.
-   Dispatch repairers to multiple targets if more than one structure needs repairs to prevent useless movements.
-   Transferers only spawn if room has extensions and containers.
