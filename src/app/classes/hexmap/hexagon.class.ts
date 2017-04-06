
export interface IHexagonConfig {
    HEIGHT: number;
    WIDTH: number;
    SIDE: number;
    MARGIN: number;
}

import { Point } from './point.class';
interface IHexagon {
    id: string;
    col: number;
    row: number;
    config: IHexagonConfig;
    selected?: boolean;
    inRange?: boolean;
    Points?: Point[];
    TopLeftPoint?: Point;
    MidPoint?: Point;
    BottomRightPoint: Point;
    Relocate(config: IHexagonConfig): void;
}

export class Hexagon implements IHexagon {

    id: string;
    col: number;
    row: number;
    selected: boolean;
    config: IHexagonConfig;
    inRange: boolean;
    Points?: Point[];
    TopLeftPoint: Point;
    MidPoint: Point;
    BottomRightPoint: Point;

    constructor(id: string, col: number, row: number, config?: IHexagonConfig) {
        this.config = config || { HEIGHT: 91.14378277661477, WIDTH: 91.14378277661477, SIDE: 50.0 };
        this.id = id;
        this.col = col;
        this.row = row;
        this.selected = false;
        this.inRange = false;
        this.Relocate(this.config);

    }
    Relocate(config: IHexagonConfig): void {
        this.config = config;

        var x = ((this.col) * (config.WIDTH + config.SIDE / 2)) - ((this.col * config.WIDTH) / 2);
        var y = this.row * (config.HEIGHT / 2);
        var x1 = (config.WIDTH - config.SIDE) / 2;
        var y1 = (config.HEIGHT / 2);

        if (config.MARGIN) {
            x += config.MARGIN;
            y += config.MARGIN;
        }

        this.Points = []; //Polygon Base
        this.Points.push(new Point(x1 + x, y));
        this.Points.push(new Point(x1 + config.SIDE + x, y));
        this.Points.push(new Point(config.WIDTH + x, y1 + y));
        this.Points.push(new Point(x1 + config.SIDE + x, config.HEIGHT + y));
        this.Points.push(new Point(x1 + x, config.HEIGHT + y));
        this.Points.push(new Point(x, y1 + y));

        this.TopLeftPoint = new Point(x, y);
        this.BottomRightPoint = new Point(x + config.WIDTH, y + config.HEIGHT);
        this.MidPoint = new Point(x + (config.WIDTH / 2), y + (config.HEIGHT / 2));
    }



}