import { Trait } from "app/config/traits.config";
import {ConfigService} from "app/config/config.service"

interface BeeState {
    id? :string;
    pos?:string;
    tripStart?:string;
    tripEnd?: string;
    tripElaspedTime?: number;
    tripTotalTime?: number;
    waitingAtResource?: boolean;
    dt?: number;
    queenParentId?: string;
    droneParentId?: string;
    generation?: number;
    jid?: string;
    msSinceWork?: number;
    jobStepIndex?: number;
    nodeIndex?: number;    
    beeMutationChance?: number;
    dead?:boolean;
    nodeIds?: string[];
    beetype?:BeeTypes;
    traits?:Trait[];
    [propName: string]: any;    
}
export type BeeTypes = "queen" | "drone" | "worker" | "larva" | "egg";
export const BeeTypes = {
    QUEEN: 'queen' as BeeTypes,
    DRONE: 'drone' as BeeTypes,
    WORKER: 'worker' as BeeTypes,
    LARVA: 'larva' as BeeTypes,
    EGG: 'egg' as BeeTypes,

};
export abstract class BaseBee implements BeeState {
    id? :string;
    pos?:string;
    tripStart?:string;
    tripEnd?: string;
    tripElaspedTime?: number;
    tripTotalTime?: number;
    waitingAtResource?: boolean;
    dt?: number;
    queenParentId?: string;
    droneParentId?: string;
    generation?: number;
    jid?: string;
    msSinceWork?: number;
    jobStepIndex?: number;
    nodeIndex?: number;    
    beeMutationChance?: number;
    dead?:boolean;
    nodeIds?: string[];
    beetype:BeeTypes;
    traits?:Trait[];

    constructor(config: BeeState) {
        this.update(config);
    }
    update(config):void {
        this.id = config.id || this.id || '0';
        this.pos = config.pos || this.pos || 'A1';
        this.tripStart = config.tripStart || this.tripStart || null;
        this.tripEnd = config.tripEnd || this.tripEnd || null;
        this.tripElaspedTime = config.tripElaspedTime || this.tripElaspedTime || 0;
        this.tripTotalTime = config.tripTotalTime || this.tripTotalTime || 0;
        this.waitingAtResource = (config.waitingAtResource != null) ? config.waitingAtResource : ((this.waitingAtResource != null) ? this.waitingAtResource : true);
        this.dt = config.dt || this.dt || new Date().getTime();
        this.queenParentId = config.queenParentId || this.queenParentId || null;
        this.droneParentId = config.droneParentId || this.droneParentId || null;
        this.generation = config.generation || this.generation || 0;
        this.jid = config.currentJob || config.jid || this.jid || 'IDLE';
        this.msSinceWork = config.msSinceWork || this.msSinceWork || 0;
        this.jobStepIndex = config.jobStepIndex || this.jobStepIndex || 0;
        this.dead=(config.dead != null) ? config.dead : this.dead != null ? this.dead : false;
        this.nodeIds = config.nodeIds || this.nodeIds || [];
        //this.nodes = this.nodes || [];
        this.nodeIndex = config.nodeIndex || this.nodeIndex || 0;
        this.beeMutationChance = config.beeMutationChance || this.beeMutationChance || 0.005; 
    }

    die():void {
        this.dead = true;
    }

}

export class Queen extends BaseBee {
    minDrones: number;
    constructor(config: BeeState) {
        super(config);
        this.beetype = BeeTypes.QUEEN;
        this.minDrones = 10;
        this.update(config);
        
    }
    update(config:BeeState):void {        
        super.update(config);

    }

    mate(drone:Drone):void {
        drone.die();
    }

}

export class Drone extends BaseBee {

    constructor(config:BeeState) {
        super(config);
        this.update(config);
    }
    update(config:BeeState):void{
        super.update
    }
}


