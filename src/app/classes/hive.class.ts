import * as Bee from './bee.class';
import {DEFAULT_BUILDINGS, Building} from '../config/buildingTypes.config';
import {DEFAULT_RESOURCES, Resource} from '../config/resourceTypes.config';
interface HiveState {
    id:number;
    pos?: string;
    newbornLimit?: number;
    beeMutationChance?: number;
    nextId: number;
    bees?: Bee.BaseBee[];
    resources?: Resource[]
    buildings?: Building[]

}

export class Hive implements HiveState {
    id:number;
    pos?: string;
    newbornLimit?: number;
    beeMutationChance?: number;
    nextId: number;
    bees: Bee.BaseBee[];
    resources: Resource[];
    buildings: Building[];

    constructor(state: HiveState) {
        this.update(state);
    }

    update(state: HiveState) {
        this.id = state.id || this.id || 1;
        this.nextId = state.nextId || this.nextId || 1;
        if(state.bees != null)
            this.loadBees(state);
        else 
            this.bees = this.bees || [];
        
        if(state.resources == null) {
            this.updateResources(state);
        } else {
            this.resources = state.resources;
        }
        if(state.buildings == null) {
            this.updateBuildings(state);
        } else {
            this.buildings = state.buildings;
        }
    }

    getBeesByType(type:Bee.BeeTypes):Bee.BaseBee[] {
        return this.bees.filter(bee => bee.beetype === type);
    }

    getBeeById(id:string):Bee.BaseBee {
        var index = this.bees.findIndex(bee=>bee.id === id);
        if(index == -1) return null;
        return this.bees[index];
    }

    getNurseyCount():number {
        return this.getBeesByType(Bee.BeeTypes.EGG).length + this.getBeesByType(Bee.BeeTypes.LARVA).length;
    }

    loadBees(state):void {
        this.bees = [];
        for(var b=0;b<state.bees.length;b++) {
            var bee = state.bees[b];
            switch(bee.beetype) {
                case Bee.BeeTypes.QUEEN:
                    this.bees.push(new Bee.Queen(bee));
                    break;
            }
        }        
    }

    updateResources(state):void {

    }

    updateBuildings(state):void {

    }

}