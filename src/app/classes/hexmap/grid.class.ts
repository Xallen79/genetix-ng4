import { Point } from './point.class';
import { IHexagonConfig, Hexagon } from './hexagon.class';

export interface IGridConfig {
    hexConfig?: IHexagonConfig;
    MAPWIDTH: number;
    MAPHEIGHT: number;
    STROKEWIDTH?: number;
    SHOW_HEX_ID?: boolean;
    SHOW_HEX_XY?: boolean;
    canvasSize?: Point;
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
    setHexSizeByHeight(height: number): IGridConfig;
    setHexSizeBySide(legnth: number, ratio: number): IGridConfig;
    calcCanvasSize(): Point;

}

export class Grid implements IGrid {

    config: IGridConfig;
    Hexes: Hexagon[];

    private Static: any = { Letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' };

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

        this.Hexes = [];

        //setup a dictionary for use later for assigning the X or Y CoOrd (depending on Orientation)
        var HexagonsByXOrYCoOrd: [Hexagon[]] = [[]];//Dictionary<int, List<Hexagon>>

        var row = 0;
        var y = 0.0;
        while (row <= (this.config.MAPHEIGHT - 1) * 2) {
            var col = 0;

            var offset = 0.0;
            if (row % 2 == 1) {
                offset = (this.config.hexConfig.WIDTH - this.config.hexConfig.SIDE) / 2 + this.config.hexConfig.SIDE;
                col = 1;
            }

            var x = offset;
            while (col <= (this.config.MAPWIDTH - 1) * 2) {
                var hexId = this.GetHexId(row, col);
                //var h = new Hexagon(hexId, x, y, this.config);
                var h = new Hexagon(hexId, col, row, this.config.hexConfig);

                var pathCoOrd = col;
                h.PathCoOrdX = col; //the column is the x coordinate of the hex, for the y coordinate we need to get more fancy

                this.Hexes.push(h);

                if (!HexagonsByXOrYCoOrd[pathCoOrd])
                    HexagonsByXOrYCoOrd[pathCoOrd] = [];
                HexagonsByXOrYCoOrd[pathCoOrd].push(h);

                col += 2;
                x += this.config.hexConfig.WIDTH + this.config.hexConfig.SIDE;
            }
            row++;
            y += this.config.hexConfig.HEIGHT / 2;
        }

        //finally go through our list of hexagons by their x co-ordinate to assign the y co-ordinate
        for (let coOrd1 in HexagonsByXOrYCoOrd) {
            var hexagonsByXOrY = HexagonsByXOrYCoOrd[coOrd1];
            var n = parseInt(coOrd1);
            var coOrd2 = Math.floor(n / 2) + (n % 2);
            for (var i in hexagonsByXOrY) {
                var h2 = hexagonsByXOrY[i]; //Hexagon
                h2.PathCoOrdY = coOrd2++;
            }
        }

    }
    GetHexId(row: number, col: number): string {
        var letterIndex = row;
        var letters = "";
        while (letterIndex > 25) {
            letters = this.Static.Letters[letterIndex % 26] + letters;
            letterIndex -= 26;
        }

        return this.Static.Letters[letterIndex] + letters + (col + 1);
    }
    Relocate(): void {
        for (let hex of this.Hexes)
            hex.Relocate(this.config.hexConfig);
    }
    GetHexAt(p: Point): Hexagon {
        return this.Hexes.find(hex => hex.Contains(p))
    }
    GetHexDistance(h1: Hexagon, h2: Hexagon): number {
        //a good explanation of this calc can be found here:
        //http://playtechs.blogspot.com/2007/04/hex-grids.html
        var deltaX = h1.PathCoOrdX - h2.PathCoOrdX;
        var deltaY = h1.PathCoOrdY - h2.PathCoOrdY;
        return ((Math.abs(deltaX) + Math.abs(deltaY) + Math.abs(deltaX - deltaY)) / 2);
    }
    GetHexById(id: string): Hexagon {
        return this.Hexes.find(hex => hex.id === id);
    }
    GetNearestHex(p: Point): Hexagon {
        var distance;
        var minDistance = Number.MAX_VALUE;
        var hx = null;

        // iterate through each hex in the grid
        for (let h of this.Hexes) {
            distance = h.distanceFromMidPoint(p);

            if (distance < minDistance) // if this is the nearest thus far
            {
                minDistance = distance;
                hx = h
            }
        }

        return hx;
    }

    setHexSizeByHeight(height: number): IGridConfig {
        height = height || 30;

        var width = height * (2 / (Math.sqrt(3)));

        //solve quadratic
        var a = -3.0;
        var b = (-2.0 * width);
        var c = (Math.pow(width, 2)) + (Math.pow(height, 2));
        var z = (-b - Math.sqrt(Math.pow(b, 2) - (4.0 * a * c))) / (2.0 * a);

        this.config.hexConfig.WIDTH = width;
        this.config.hexConfig.HEIGHT = height;
        this.config.hexConfig.SIDE = z;
        this.Relocate();
        this.config.canvasSize = this.calcCanvasSize();

        // return the new config
        return this.config;
    }
    setHexSizeBySide(legnth: number, ratio: number): IGridConfig {
        length = length || 18;
        ratio = ratio || (2 / (Math.sqrt(3)));
        var z = length;
        var r = ratio;

        //solve quadratic
        var r2 = Math.pow(r, 2);
        var a = (1 + r2) / r2;
        var b = z / r2;
        var c = ((1 - 4.0 * r2) / (4.0 * r2)) * (Math.pow(z, 2));

        var x = (-b + Math.sqrt(Math.pow(b, 2) - (4.0 * a * c))) / (2.0 * a);
        var y = ((2.0 * x) + z) / (2.0 * r);

        var width = ((2.0 * x) + z);
        var height = (2.0 * y);

        this.config.hexConfig.WIDTH = width;
        this.config.hexConfig.HEIGHT = height;
        this.config.hexConfig.SIDE = z;
        this.Relocate();
        this.config.canvasSize = this.calcCanvasSize();

        // return the new config
        return this.config;
    }
    calcCanvasSize(): Point {
        var x = this.config.MAPWIDTH * ((this.config.hexConfig.WIDTH + this.config.hexConfig.SIDE)) - this.config.hexConfig.SIDE;
        var y = this.config.MAPHEIGHT * this.config.hexConfig.HEIGHT;
        x += (this.config.hexConfig.MARGIN * 2);
        y += (this.config.hexConfig.MARGIN * 2);
        return new Point(x, y);
    }
}