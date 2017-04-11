import { IHiveState, Hive } from 'app/classes/hive.class';
import { Grid, IGridConfig } from 'app/classes/hexmap/grid.class';
import { Point } from 'app/classes/hexmap/point.class';
import * as Bee from 'app/classes/bee.class';
import { IMapResourceState, MapResource } from 'app/classes/map-resource.class';
import { ConfigService } from 'app/config/config.service';
export interface IMapState {
    hiveStates?: IHiveState[];
    mapResourceStates?: IMapResourceState[];
    gridConfig?: IGridConfig;
    currentHiveID?: number;
    selectedHexID?: string;
    canvasLocation?: Point;
    stepTimeMs: number;
}

interface IMap extends IMapState {
    hives: Hive[];
    mapResources: MapResource[];
    grid: Grid;
    getState(): IMapState;
    generateInitialMap(): void;
    getHiveByPosition(pos: string): Hive;
    getCurrentHive(): Hive;
    getHiveById(id: number): Hive;
    getBeeById(beeid: string): Bee.BaseBee;
    mapClicked(x: number, y: number): void;
    mapMoved(x: number, y: number): void;
    setRangGraph(beeid: string): void;
    handleGameLoop(elapsedMs: number): void;
    drawMap(context: CanvasRenderingContext2D): void;
    addHive(position: string): Hive;
    addWaterNode(position: string): MapResource;
    addCloverNode(position: string, level: number): MapResource;
    clear(context: CanvasRenderingContext2D): void;
    drawHexes(context: CanvasRenderingContext2D): void;
    drawResources(context: CanvasRenderingContext2D): void;
    drawHives(context: CanvasRenderingContext2D): void;
    drawBees(context: CanvasRenderingContext2D, hive: Hive): void;
}

export class Map implements IMap {
    hives: Hive[];
    mapResources: MapResource[];
    grid: Grid;
    currentHiveID: number;
    selectedHexID: string;
    canvasLocation: Point;
    stepTimeMs: number;
    private Q_PI: number = Math.PI / 4;
    private TWO_PI: number = Math.PI * 2;
    constructor(private _configService: ConfigService, stepTimeMs: number, state?: IMapState) {
        this.hives = [];
        this.mapResources = [];
        this.stepTimeMs = stepTimeMs;
        if (state) {
            this.grid = new Grid(state.gridConfig);
            for (let h of state.hiveStates) {
                var hive = new Hive(h, _configService);
                for (let b of hive.bees) {
                    for (let nodeid of b.nodeIds)
                        b.nodes.push(this.grid.GetHexById(nodeid))
                }
                this.hives.push(hive);
            }
            for (let mr of state.mapResourceStates) {
                var node = new MapResource(mr);
                this.mapResources.push(node);
                this.grid.GetHexById(node.pos).mapResource = node;
                for (let beeid of node.beeids) {
                    node.bees.push(this.getBeeById(beeid));
                }
            }
        } else {
            this.generateInitialMap();
        }
    }
    getState(): IMapState {

        var hives: IHiveState[] = [];
        for (let h of this.hives) hives.push(h.getState());

        var mapResources: IMapResourceState[] = [];
        for (let mr of this.mapResources) mapResources.push(mr.getState());
        return {
            hiveStates: hives,
            mapResourceStates: mapResources,
            gridConfig: this.grid.config,
            currentHiveID: this.currentHiveID,
            stepTimeMs: this.stepTimeMs
        };
    }
    generateInitialMap(): void {
        this.grid = new Grid({
            MAPWIDTH: 7,
            MAPHEIGHT: 7
        });
        this.grid.setHexSizeByHeight(50);
        this.canvasLocation = new Point(0, 0);
        // add hives
        this.addHive("G5");
        this.addHive("G9");
        // add water resources
        this.addWaterNode("D6");
        this.addWaterNode("J10");
        this.addWaterNode("E3");
        // add clover resources
        this.addCloverNode("I7", 1);
        this.addCloverNode("H6", 1);
        this.addCloverNode("G11", 1);
        this.addCloverNode("D4", 1);
        this.addCloverNode("B2", 2);
        this.addCloverNode("G13", 2);
        this.addCloverNode("A7", 3);
        this.addCloverNode("E7", 3);
        this.currentHiveID = this.hives[0].id;
    }
    getHiveByPosition(pos: string): Hive {
        return this.hives.find(hive => hive.pos === pos);
    }
    getCurrentHive(): Hive {
        return this.getHiveById(this.currentHiveID);
    }
    getHiveById(id: number): Hive {
        return this.hives.find(hive => hive.id === id);
    }
    getBeeById(beeid: string): Bee.BaseBee {
        return this.getHiveById(parseInt(beeid.substring(beeid.indexOf('H') + 1))).getBeeById(beeid);
    }
    mapClicked(x: number, y: number): void {
        var p = new Point(x, y);


        // TODO: handle clicking bees before falling through to the hex

        // handle clicking on a hex
        var hex = this.grid.GetHexAt(p);
        var oldhex = this.grid.GetHexById(this.selectedHexID);

        if (hex === null || typeof hex === 'undefined')
            return;

        if (oldhex !== null && typeof oldhex !== 'undefined') {
            if (hex.id === oldhex.id) {
                console.log('TODO: show additional info via dialog or somethin');
            } else {
                oldhex.selected = false;
            }
        }
        hex.selected = true;
        this.selectedHexID = hex.id;

        // check if this hex has a hive, if so, select it
        var hive = this.getHiveByPosition(hex.id);
        if (hive && hive.id != this.currentHiveID) {
            this.currentHiveID = hive.id;
            //self.sendHiveChangeEvent();
        }
    }
    mapMoved(x: number, y: number): void {
        this.canvasLocation = new Point(x, y);
    }
    setRangGraph(beeid: string): void {
        if (beeid) {
            var hive = this.getCurrentHive();
            var bee = hive.getBeeById(beeid);
            var range = bee.getAbility('RNG').value;

            var center = this.grid.GetHexById(hive.pos);
            for (let target of this.grid.Hexes) {
                target.inRange = this.grid.GetHexDistance(center, target) <= range;
            }


        } else {
            for (let hex of this.grid.Hexes) {
                hex.inRange = false;
            }
        }
    }
    handleGameLoop(elapsedMs: number): void {
        while (elapsedMs >= this.stepTimeMs) {
            for (let mapResource of this.mapResources) {
                mapResource.processElapsedTime(this.stepTimeMs);
            }
            for (let hive of this.hives) {
                hive.handleGameLoop(this.stepTimeMs, this);
            }
            elapsedMs -= this.stepTimeMs;
        }
    }
    drawMap(context: CanvasRenderingContext2D) {
        this.clear(context);
        this.drawHexes(context);
        this.drawResources(context);
        this.drawHives(context);
    }
    addHive(position: string): Hive {
        var id = this.hives.length + 1;
        var hive = new Hive({
            "id": id,
            "initialSize": 2,
            "maxSize": 5,
            "beeMutationChance": 0.0025,
            "pos": position
        }, this._configService);
        this.hives.push(hive);
        return hive;
    }
    addWaterNode(position: string): MapResource {
        var hex = this.grid.GetHexById(position);
        if (typeof hex.mapResource != 'undefined') {
            return null;
        }

        var id = 1;
        var mr = new MapResource({
            "id": id,
            "resourceName": 'Water',
            "pos": position,
            "color": '#04328C',
            "cooldown": 0,
            "water": 10000
        });
        this.mapResources.push(mr);
        hex.mapResource = mr;
        return mr;
    }
    addCloverNode(position: string, level: number): MapResource {

        level = level || 1;

        var hex = this.grid.GetHexById(position);
        if (typeof hex.mapResource != 'undefined') {
            return null;
        }

        var id = 1;
        var mr = new MapResource({
            "id": id,
            "level": level,
            "resourceName": 'Clover',
            "pos": position,
            "color": '#2C4001',
            "cooldown": 5000,
            "harvestMultiplier": (1.0 / level),
            "nectar": (3 * level),
            "pollen": (2 * level)
        });
        this.mapResources.push(mr);
        hex.mapResource = mr;
        return mr;
    }
    clear(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
    drawHexes(context: CanvasRenderingContext2D): void {
        for (let hex of this.grid.Hexes) {
            hex.draw(context);
        }
    }
    drawResources(context: CanvasRenderingContext2D): void {
        for (let resource of this.mapResources) {
            let hex = this.grid.GetHexById(resource.pos);
            context.fillStyle = resource.color;
            context.beginPath();
            context.arc(hex.MidPoint.X, hex.MidPoint.Y, this.grid.config.hexConfig.HEIGHT * 0.3, 0, this.TWO_PI);
            context.closePath();
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.stroke();
        }
    }
    drawHives(context: CanvasRenderingContext2D): void {
        for (let hive of this.hives) {
            var hex = this.grid.GetHexById(hive.pos);
            var id = 'H' + hive.id;
            context.fillStyle = hive.id === this.currentHiveID ? 'yellow' : 'grey';
            context.beginPath();
            context.arc(hex.MidPoint.X, hex.MidPoint.Y, this.grid.config.hexConfig.HEIGHT * 0.3, 0, this.TWO_PI);
            context.closePath();
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.stroke();

            context.fillStyle = 'black';
            context.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
            context.textAlign = "center";
            context.textBaseline = 'middle';
            //var textWidth = ctx.measureText(this.Planet.BoundingHex.id);
            context.fillText(id, hex.MidPoint.X, hex.MidPoint.Y);
            this.drawBees(context, hive);
        }
    }
    drawBees(context: CanvasRenderingContext2D, hive: Hive): void {
        for (let bee of hive.bees) {
            if (bee.isMoving) {
                var hexStart = this.grid.GetHexById(bee.tripStart);
                var hexEnd = this.grid.GetHexById(bee.tripEnd);
                var percentComplete = bee.tripElaspedTime / bee.tripTotalTime;
                if (isNaN(percentComplete)) percentComplete = 1;
                var deltaX = hexEnd.MidPoint.X - hexStart.MidPoint.X;
                var deltaY = hexEnd.MidPoint.Y - hexStart.MidPoint.Y;
                var rads = Math.atan2(deltaY, deltaX);
                var coordX = hexStart.MidPoint.X + ((deltaX) * percentComplete);
                var coordY = hexStart.MidPoint.Y + ((deltaY) * percentComplete);

                context.fillStyle = 'yellow';
                context.beginPath();
                context.arc(coordX, coordY, this.grid.config.hexConfig.HEIGHT * 0.2, rads - this.Q_PI, rads + this.Q_PI, true);
                context.closePath();
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = 'black';
                context.stroke();

                context.fillStyle = 'black';
                context.font = "bolder 6pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
                context.textAlign = "center";
                context.textBaseline = 'middle';
                //var textWidth = ctx.measureText(this.Planet.BoundingHex.id);
                context.fillText(bee.id, coordX, coordY);
            }
        }
    }

}