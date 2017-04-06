import * as Bee from './bee.class';
import { DEFAULT_BUILDINGS, Building } from '../config/buildingTypes.config';
import { DEFAULT_RESOURCES, Resource } from '../config/resourceTypes.config';
interface IHiveState {
    id: number;
    pos?: string;
    newbornLimit?: number;
    beeMutationChance?: number;
    nextId: number;
    bees?: Bee.BaseBee[];
    resources?: Resource[]
    buildings?: Building[]

}
interface IHive extends IHiveState {

}
export class Hive implements IHive {
    id: number;
    pos?: string;
    newbornLimit?: number;
    beeMutationChance?: number;
    nextId: number;
    bees: Bee.BaseBee[];
    resources: Resource[];
    buildings: Building[];

    constructor(state: IHiveState) {
        this.update(state);
    }

    update(state: IHiveState) {
        this.id = state.id || this.id || 1;
        this.nextId = state.nextId || this.nextId || 1;
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

    loadBees(state): void {
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

    updateResources(state): void {

    }

    updateBuildings(state): void {

    }

}