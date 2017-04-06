import { Trait } from "app/config/traits.config";
import { ConfigService } from "app/config/config.service"
import { Genome } from "app/classes/genome.class";

interface IBeeState {
    id: string;
    beetype?: BeeTypes;
    pos?: string;
    tripStart?: string;
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
    dead?: boolean;
    nodeIds?: string[];
    traits?: Trait[];
    name?: string;
    genome?: Genome;
    [propName: string]: any;
}
interface IBee extends IBeeState {
    die(): void;
}
export type BeeTypes = "queen" | "drone" | "worker" | "larva" | "egg";
export const BeeTypes = {
    QUEEN: 'queen' as BeeTypes,
    DRONE: 'drone' as BeeTypes,
    WORKER: 'worker' as BeeTypes,
    LARVA: 'larva' as BeeTypes,
    EGG: 'egg' as BeeTypes,

};
export abstract class BaseBee implements IBee {
    [propName: string]: any;
    id: string;
    beetype: BeeTypes;
    pos?: string;
    tripStart?: string;
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
    dead?: boolean;
    nodeIds?: string[];
    traits?: Trait[];
    name?: string;
    genome?: Genome;

    constructor(config?: IBeeState) {
        //this.update(config);
    }
    update(config: IBeeState): void {
        this.id = config && config.id || this.id || '0';
        this.pos = config && config.pos || this.pos || 'A1';
        this.tripStart = config && config.tripStart || this.tripStart || null;
        this.tripEnd = config && config.tripEnd || this.tripEnd || null;
        this.tripElaspedTime = config && config.tripElaspedTime || this.tripElaspedTime || 0;
        this.tripTotalTime = config && config.tripTotalTime || this.tripTotalTime || 0;
        this.waitingAtResource = (config && config.waitingAtResource != null) ? config.waitingAtResource : ((this.waitingAtResource != null) ? this.waitingAtResource : true);
        this.dt = config && config.dt || this.dt || new Date().getTime();
        this.queenParentId = config && config.queenParentId || this.queenParentId || null;
        this.droneParentId = config && config.droneParentId || this.droneParentId || null;
        this.generation = config && config.generation || this.generation || 0;
        this.jid = config && config.currentJob || config.jid || this.jid || 'IDLE';
        this.msSinceWork = config && config.msSinceWork || this.msSinceWork || 0;
        this.jobStepIndex = config && config.jobStepIndex || this.jobStepIndex || 0;
        this.dead = (config && config.dead != null) ? config.dead : this.dead != null ? this.dead : false;
        this.nodeIds = config && config.nodeIds || this.nodeIds || [];
        //this.nodes = this.nodes || [];
        this.nodeIndex = config && config.nodeIndex || this.nodeIndex || 0;
        this.beeMutationChance = config && config.beeMutationChance || this.beeMutationChance || 0.005;
        this.genome = new Genome(config && config.genome || null, this.hasPairs);
        console.log(this.genome.getGene(0, 0));
        this.name = this.beetype + this.id;
    }

    die(): void {
        this.dead = true;
    }


}

export class Queen extends BaseBee {
    minDrones: number;
    constructor(config: IBeeState) {
        super(config);
        this.beetype = BeeTypes.QUEEN;
        this.hasPairs = true;
        this.minDrones = 10;
        this.update(config);

    }
    update(config: IBeeState): void {
        super.update(config);

    }

    mate(drone: Drone): void {
        drone.die();
    }

}

export class Drone extends BaseBee {

    constructor(config: IBeeState) {
        super(config);
        this.beetype = BeeTypes.DRONE;
        this.update(config);
    }
    update(config: IBeeState): void {
        super.update(config);
    }
}


