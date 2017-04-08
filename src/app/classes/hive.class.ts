import * as Bee from './bee.class';
import { DEFAULT_BUILDINGS, Building } from '../config/buildingTypes.config';
import { DEFAULT_RESOURCES, Resource } from '../config/resourceTypes.config';
import { Map } from 'app/classes/map.class';
interface IHiveState {
    id: number;
    pos?: string;
    initialSize: number;
    maxSize: number;
    newbornLimit?: number;
    beeMutationChance?: number;
    nextId?: number;
    bees?: Bee.BaseBee[];
    resources?: Resource[]
    buildings?: Building[]

}
interface IHive extends IHiveState {
    update(state: IHiveState): void;
    getBeesByType(type: Bee.BeeTypes): Bee.BaseBee[];
    getBeeById(id: string): Bee.BaseBee;
    getNurseyCount(): number;
    loadBees(state: IHiveState): void;
    updateResources(state: IHiveState): void;
    updateBuildings(state: IHiveState): void;
    handleGameLoop(elapsedMs: number, map: Map): void;


}
export class Hive implements IHive {

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

    constructor(state: IHiveState) {
        this.update(state);
    }

    update(state: IHiveState): void {
        this.id = state.id || this.id || 1;
        this.nextId = state.nextId || this.nextId || 1;
        this.initialSize = state.initialSize || this.initialSize || 2;
        this.maxSize = state.maxSize || this.maxSize || 10;
        this.pos = state.pos || this.pos || 'A1';
        this.newbornLimit = state.newbornLimit || this.newbornLimit || 5;
        this.beeMutationChance = state.beeMutationChance || this.beeMutationChance || 0.005;
        if (state.bees != null)
            this.loadBees(state);
        else
            this.bees = this.bees || [];

        if (state.resources == null) {
            this.updateResources(state);
        } else {
            this.resources = state.resources;
        }
        if (state.buildings == null) {
            this.updateBuildings(state);
        } else {
            this.buildings = state.buildings;
        }
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
        for (let bee of state.bees) {
            switch (bee.beetype) {
                case Bee.BeeTypes.QUEEN:
                    this.bees.push(new Bee.Queen(bee));
                    break;
                case Bee.BeeTypes.DRONE:
                    this.bees.push(new Bee.Drone(bee));
                    break;
            }
        }
    }

    updateResources(state: IHiveState): void {

    }

    updateBuildings(state: IHiveState): void {

    }

    handleGameLoop(ms: number, map: Map): void {

        if (ms === 0)
            return;


        for (let bee of this.bees) {
            bee.doWork(ms, this, map);
        }
    }

}