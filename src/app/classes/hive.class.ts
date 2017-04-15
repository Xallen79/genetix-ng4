import * as Bee from './bee.class';
import { Building } from '../config/buildingTypes.config';
import { Resource } from '../config/resourceTypes.config';
import { Map } from 'app/classes/map.class';
import { ConfigService } from 'app/config/config.service';
import { AppInjector } from "app/app.module";

export interface IHiveState {
    id: number;
    pos?: string;
    initialSize: number;
    maxSize: number;
    newbornLimit?: number;
    beeMutationChance?: number;
    nextId?: number;
    beeStates?: Bee.IBeeState[];
    resources?: Resource[];
    buildings?: Building[];

}
interface IHive extends IHiveState {
    bees: Bee.BaseBee[];
    getState(): IHiveState;
    update(state: IHiveState): void;
    getBeesByType(type: Bee.BeeTypes): Bee.BaseBee[];
    getBeeById(id: string): Bee.BaseBee;
    getNurseyCount(): number;
    loadBees(state: IHiveState): void;
    createInitialQueen(inseminate: boolean): void;
    updateResources(state: IHiveState): void;
    updateBuildings(state: IHiveState): void;
    getNextId(): string;
    handleGameLoop(elapsedMs: number, map: Map): void;


}
export class Hive implements IHive {

    beeStates: Bee.IBeeState[];


    id: number;
    pos?: string;
    initialSize: number;
    maxSize: number;
    newbornLimit?: number;
    beeMutationChance?: number;
    nextId?: number;
    bees: Bee.BaseBee[];
    resources: Resource[];
    buildings: Building[];
    private _configService: ConfigService;
    constructor(state: IHiveState) {
        this._configService = AppInjector.get(ConfigService);
        this.update(state);

    }

    update(state: IHiveState): void {
        this.id = state.id || this.id || 1;
        this.nextId = state.nextId || this.nextId || 0;
        this.initialSize = state.initialSize || this.initialSize || 2;
        this.maxSize = state.maxSize || this.maxSize || 10;
        this.pos = state.pos || this.pos || 'A1';
        this.newbornLimit = state.newbornLimit || this.newbornLimit || 5;
        this.beeMutationChance = state.beeMutationChance || this.beeMutationChance || 0.005;
        if (state.beeStates != null)
            this.loadBees(state);
        else {
            this.bees = this.bees || [];
            if (this.bees.length === 0) this.createInitialQueen(true);
        }

        this.updateResources(state);

        this.updateBuildings(state);

    }
    getState(): IHiveState {
        var beeStates: Bee.IBeeState[] = [];
        for (let bee of this.bees) beeStates.push(bee.getState());
        return {
            id: this.id,
            pos: this.pos,
            initialSize: this.initialSize,
            maxSize: this.maxSize,
            newbornLimit: this.newbornLimit,
            beeMutationChance: this.beeMutationChance,
            nextId: this.nextId,
            beeStates: beeStates,
            resources: this.resources,
            buildings: this.buildings
        };
    }
    getBeesByType(type: Bee.BeeTypes): Bee.BaseBee[] {
        return this.bees.filter(bee => bee.beetype === type);
    }

    getBeeById(id: string): Bee.BaseBee {
        var index = this.bees.findIndex(bee => bee.id === id);
        if (index == -1) return null;
        return this.bees[index];
    }

    getNurseyCount(): number {
        return this.getBeesByType(Bee.BeeTypes.EGG).length + this.getBeesByType(Bee.BeeTypes.LARVA).length;
    }

    loadBees(state: IHiveState): void {
        this.bees = [];
        for (let bee of state.beeStates) {
            switch (bee.beetype) {
                case Bee.BeeTypes.QUEEN:
                    this.bees.push(new Bee.Queen(bee));
                    break;
                case Bee.BeeTypes.DRONE:
                    this.bees.push(new Bee.Drone(bee));
                    break;
                case Bee.BeeTypes.WORKER:
                    this.bees.push(new Bee.Worker(bee));
                    break;
                case Bee.BeeTypes.EGG:
                    this.bees.push(new Bee.Egg(bee));
                    break;
                case Bee.BeeTypes.LARVA:
                    this.bees.push(new Bee.Larva(bee));
                    break;
            }
        }
    }
    createInitialQueen(inseminate: boolean): void {
        var queen = new Bee.Queen({
            id: this.getNextId(),
            generation: 0,
            beeMutationChance: this.beeMutationChance,
            jid: 'breeder',
            pos: this.pos
        });
        if (inseminate) {
            for (var d = 0; d < 10; d++) {
                var drone = new Bee.Drone({
                    id: this.getNextId(),
                    generation: 0,
                    beeMutationChance: this.beeMutationChance,
                    pos: this.pos
                });
                queen.mate(drone);
            }
        }
        queen.update();
        this.bees.push(queen);
    }
    updateResources(state: IHiveState): void {
        if (state.resources == null && this.resources == null)
            this.resources = this._configService.getDefaultResources();
        else if (state.resources != null) {
            this.resources = [];
            for (let r of state.resources) {
                // var res = new Resource(r);
                // res.max = 1000;
                // res.owned = 10;
                this.resources.push(new Resource(r));

            }
        }
        // else do nothing, nothing in the state and this hive already has resources
    }

    updateBuildings(state: IHiveState): void {
        if (state.buildings == null && this.buildings == null)
            this.buildings = this._configService.getDefaultBuildings();
        else if (state.buildings != null) {
            this.buildings = [];
            for (let b of state.buildings) {
                let building: Building = new Building(b);
                building.setCanBuild(this.resources);
                this.buildings.push(building);
            }
        }
        // else do nothing, nothing in the state and this hive already has buildings


    }

    getNextId(): string {
        return ++this.nextId + '-H' + this.id;
    }


    handleGameLoop(ms: number, map: Map): void {

        if (ms === 0)
            return;


        for (let bee of this.bees) {
            bee.doWork(ms, this, map);
        }
    }

}