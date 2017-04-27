
import { MapResource } from 'app/classes/map-resource.class';
import { Point } from './point.class';

export interface IHexagonConfig {
    HEIGHT: number;
    WIDTH: number;
    SIDE: number;
    MARGIN: number;
}

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
    mapResource?: MapResource;
    PathCoOrdX: number;
    PathCoOrdY: number;
    Relocate(config: IHexagonConfig): void;
    draw(context: CanvasRenderingContext2D, SHOW_HEX_ID: boolean, SHOW_HEX_XY: boolean): void;
    isInBounds(x: number, y: number): boolean;
    isInHexBounds(p: Point): boolean;
    Contains(p: Point): boolean;
    distanceFromMidPoint(p: Point): number;
}

export class Hexagon implements IHexagon {

    id: string;
    col: number;
    row: number;
    selected: boolean;
    config: IHexagonConfig;
    inRange: boolean;
    inRoute: boolean;
    Points?: Point[];
    TopLeftPoint: Point;
    MidPoint: Point;
    BottomRightPoint: Point;
    mapResource?: MapResource;
    PathCoOrdX: number;
    PathCoOrdY: number;

    constructor(id: string, col: number, row: number, config?: IHexagonConfig) {
        this.config = config || { HEIGHT: 91.14378277661477, WIDTH: 91.14378277661477, SIDE: 50.0, MARGIN: 0 };
        this.id = id;
        this.col = col;
        this.row = row;
        this.selected = false;
        this.inRange = false;
        this.inRoute = false;
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
    draw = function (ctx: CanvasRenderingContext2D, SHOW_HEX_ID: boolean, SHOW_HEX_XY: boolean): void {

        if (this.inRoute)
            ctx.fillStyle = "aqua";
        else if (this.inRange)
            ctx.fillStyle = "tomato"; // love this color
        else if (this.selected)
            ctx.fillStyle = "#7283BA";
        else
            ctx.fillStyle = "#63422B";

        ctx.strokeStyle = "#FFE200";
        ctx.lineWidth = this.config.STROKEWIDTH;
        ctx.beginPath();
        ctx.moveTo(this.Points[0].X, this.Points[0].Y);
        for (var i = 1; i < this.Points.length; i++) {
            var p = this.Points[i];
            ctx.lineTo(p.X, p.Y);
        }
        ctx.closePath();

        ctx.fill();



        ctx.stroke();



        if (this.id && (SHOW_HEX_ID || SHOW_HEX_XY)) {
            //draw text for debugging
            ctx.fillStyle = "black";
            ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            //var textWidth = ctx.measureText(this.Planet.BoundingHex.id);
            var msg = '';
            if (SHOW_HEX_ID) msg += this.id + ' ';
            if (SHOW_HEX_XY) msg += this.row + ',' + this.col;
            ctx.fillText(msg, this.MidPoint.X, this.MidPoint.Y);
        }

    }

    isInBounds(x: number, y: number): boolean {
        return this.Contains(new Point(x, y));
    }
    isInHexBounds(p: Point): boolean {
        if (this.TopLeftPoint.X < p.X && this.TopLeftPoint.Y < p.Y &&
            p.X < this.BottomRightPoint.X && p.Y < this.BottomRightPoint.Y)
            return true;
        return false;
    }
    Contains(p: Point): boolean {
        let isIn: boolean = false;
        if (this.isInHexBounds(p)) {
            //turn our absolute point into a relative point for comparing with the polygon's points
            //var pRel = new HT.Point(p.X - this.x, p.Y - this.y);
            var i, j = 0;
            for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i++) {
                var iP = this.Points[i];
                var jP = this.Points[j];
                if (
                    (
                        ((iP.Y <= p.Y) && (p.Y < jP.Y)) ||
                        ((jP.Y <= p.Y) && (p.Y < iP.Y))
                        //((iP.Y > p.Y) != (jP.Y > p.Y))
                    ) &&
                    (p.X < (jP.X - iP.X) * (p.Y - iP.Y) / (jP.Y - iP.Y) + iP.X)
                ) {
                    isIn = !isIn;
                }
            }
        }
        return isIn;
    }
    distanceFromMidPoint(p: Point): number {
        // Pythagoras' Theorem: Square of hypotenuse = sum of squares of other two sides
        var deltaX = this.MidPoint.X - p.X;
        var deltaY = this.MidPoint.Y - p.Y;

        // squaring so don't need to worry about square-rooting a negative number 
        return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    }

}