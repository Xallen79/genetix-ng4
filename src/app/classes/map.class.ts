import { Hive } from 'app/classes/hive.class';
import { Grid } from 'app/classes/hexmap/grid.class';
interface IMapState {
    hives: Hive[];
    grid: Grid;
}

interface IMap extends IMapState {

}