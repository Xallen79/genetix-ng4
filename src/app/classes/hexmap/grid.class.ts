import { Point } from './point.class';
import { IHexagonConfig, Hexagon } from './hexagon.class';

interface IGridConfig {
    hexConfig?: IHexagonConfig;
    MAPWIDTH: number;
    MAPHEIGHT: number;
    STROKEWIDTH?: number;
    SHOW_HEX_ID?: boolean;
    SHOW_HEX_XY?: boolean;
}

interface IGrid {
    config: IGridConfig;
    Hexes: Hexagon[];
    GetHexId(row: number, col: number): string;
    Relocate(): void;
    GetHexAt(p: Point): Hexagon;
    GetHexDistance(h1: Hexagon, h2: Hexagon): number;
    GetHexById(id: string): Hexagon;
    GetNearestHex(p: Point): Hexagon;

}

export class Grid implements IGrid {
    config: IGridConfig;
    Hexes: Hexagon[];
    constructor(config: IGridConfig) {
        this.config = config;

        this.config.hexConfig = this.config.hexConfig || {
            HEIGHT: 91.14378277661477,
            WIDTH: 91.14378277661477,
            SIDE: 50.0,
            MARGIN: 5
        };
        this.config.STROKEWIDTH = this.config.STROKEWIDTH || 3;
        this.config.SHOW_HEX_ID = this.config.SHOW_HEX_ID || false;
        this.config.SHOW_HEX_XY = this.config.SHOW_HEX_XY || false;


    }
    GetHexId(row: number, col: number): string {
        throw new Error('Method not implemented.');
    }
    Relocate(): void {
        throw new Error('Method not implemented.');
    }
    GetHexAt(p: Point): Hexagon {
        throw new Error('Method not implemented.');
    }
    GetHexDistance(h1: Hexagon, h2: Hexagon): number {
        throw new Error('Method not implemented.');
    }
    GetHexById(id: string): Hexagon {
        throw new Error('Method not implemented.');
    }
    GetNearestHex(p: Point): Hexagon {
        throw new Error('Method not implemented.');
    }


}