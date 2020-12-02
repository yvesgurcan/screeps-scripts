-   Register in memory the list of dead energy sources for each room every 2 ticks.
-   Replace harvesting-related logic that is tied to the availability of energy sources. Alternatively, develop better strategies based on whether an energy source is dead.

-   Save list of structures that need repair in memory every 5 ticks.
-   Create a Corbusier type for builders with ratio 0.66. Alter behavior of builders of type "Corbusier" to repair if structures need repair and they don't have anything to build. Other types upgrade if they don't have anything to build.
-   Add a `VETUSTE` mode that activates if more than 10 structures need repair. Spawn will increase number of repairers by 2 when room is in `VETUSTE` mode.

-   Save road to source coordinates in memory once for each room.
-   If energy source dies and harvester has resources in their store, store these resources in extensions/containers.
-   Calculate distance between a source of energy and a container to estimate number, speed, capacity (50 per carry part), and work (2 per work part) of Alfred harvesters.
-   Creep recuperates energy lying around in room.
-   Only defend controlled rooms with towers. Still notify in controlled rooms without towers.
-   Add function to deregister critical tiles from memory.
-   Improve towers repair logic by choosing its target randomly.
-   Have builder give a little energy to walls and remparts upon build.
-   Dispatch repairers to multiple targets if more than one structure needs repairs to prevent useless movements.
-   Transferers only spawn if room has extensions and containers.
