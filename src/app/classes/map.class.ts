import { Hive } from 'app/classes/hive.class';
import { Grid } from 'app/classes/hexmap/grid.class';
import * as Bee from 'app/classes/bee.class';
import { MapResource } from 'app/classes/map-resource.class';
interface IMapState {
    hives: Hive[];
    mapResources: MapResource[];
    grid: Grid;
}

interface IMap extends IMapState {
    generateInitialMap(): void;
    getHiveByPosition(pos: string): Hive;
    getCurrentHive(): Hive;
    getHiveById(id: number): Hive;
    getBeeById(beeid: string): Bee.BaseBee;
    mapClicked(x: number, y: number): void;
    mapMoved(x: number, y: number): void;
    setRangGraph(beeid: string): void;
    handleGameLoop(elapsedMs: number): void;
    drawMap(context)
}

export class Map implements IMap {
    hives: Hive[];
    mapResources: MapResource[];
    grid: Grid;

    constructor(state?: IMapState) {
        this.hives = [];
        this.mapResources = [];
        if (state) {

        } else {

        }
    }

}