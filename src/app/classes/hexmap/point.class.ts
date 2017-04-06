interface IPoint {
    X: number;
    Y: number;
}

export class Point implements IPoint {
    X: number;
    Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

}