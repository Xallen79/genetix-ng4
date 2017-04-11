import { Trait } from "app/config/traits.config";
import { ConfigService } from "app/config/config.service"
import { Genome } from "app/classes/genome.class";
import { Hexagon } from "app/classes/hexmap/hexagon.class";
import { JobID, JOB_TYPES, JobAction } from "app/config/jobTypes.config";
import { Hive } from "app/classes/hive.class";

import { Map } from "app/classes/map.class";

export interface IBeeState {
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
    jid?: JobID;
    action?: JobAction;
    msSinceWork?: number;
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
    update(state?: IBeeState): void;
    getState(): IBeeState;
    die(): void;
    mature(type: BeeTypes): BaseBee;
    hatch(type: BeeTypes): BaseBee;
    mate(bee: BaseBee): void;
    storageAmount(rid: string): number;
    storageFull(): boolean;
    setJob(jid: string): void;
    addWaypointNode(hexagon: Hexagon): void;
    removeWaypointNode(hexagon: Hexagon): void;
    doSpawn(ms: number, hive: Hive): void;
    doTravel(ms: number, hive: Hive, map: Map): void;
    doCollect(ms: number, hive: Hive, map: Map): void;
    doDeposit(ms: number, hive: Hive): void;
    goHome(ms: number, hive: Hive, map: Map): void;
    doWork(ms: number, hive: Hive, map: Map): void;

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
    getState(): IBeeState {
        return {
            id: this.id,
            beetype: this.beetype,
            pos: this.pos,
            tripStart: this.tripStart,
            tripEnd: this.tripEnd,
            tripElaspedTime: this.tripElaspedTime,
            tripTotalTime: this.tripTotalTime,
            waitingAtResource: this.waitingAtResource,
            dt: this.dt,
            queenParentId: this.queenParentId,
            droneParentId: this.droneParentId,
            generation: this.generation,
            jid: this.jid,
            action: this.action,
            msSinceWork: this.msSinceWork,
            nodeIndex: this.nodeIndex,
            beeMutationChance: this.beeMutationChance,
            dead: this.dead,
            nodeIds: this.nodeIds,
            traits: this.traits,
            genome: this.genome
        };
    }


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
    jid?: JobID;
    action?: JobAction;
    msSinceWork?: number;
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
    update(config?: IBeeState): void {
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
        this.jid = config && config.jid || this.jid || 'idle';
        this.msSinceWork = config && config.msSinceWork || this.msSinceWork || 0;
        this.jobStepIndex = config && config.jobStepIndex || this.jobStepIndex || 0;
        this.dead = (config && config.dead != null) ? config.dead : this.dead != null ? this.dead : false;
        this.nodeIds = config && config.nodeIds || this.nodeIds || [];
        //this.nodes = this.nodes || [];
        this.nodeIndex = config && config.nodeIndex || this.nodeIndex || 0;
        this.beeMutationChance = config && config.beeMutationChance || this.beeMutationChance || 0.005;
        this.genome = new Genome(config && config.genome || null, this.hasPairs);
        this.name = this.beetype + this.id;
    }

    die(): void {
        this.dead = true;
    }
    mature(type: BeeTypes): BaseBee {
        throw new Error('Method not implemented.');
    }
    hatch(type: BeeTypes): BaseBee {
        throw new Error('Method not implemented.');
    }
    mate(bee: BaseBee): void {
        throw new Error('Method not implemented.');
    }
    storageAmount(rid: string): number {
        throw new Error('Method not implemented.');
    }
    storageFull(): boolean {
        throw new Error('Method not implemented.');
    }
    setJob(jid: JobID): void {
        if (this.jid === jid) return;

        var job = JOB_TYPES.find(j => j.jid === jid);
        if (job.beetypes.indexOf(this.beetype) === -1) {
            return;
        }

        this.jid = jid;
        this.msSinceWork = 0;
        this.action = null;
        this.nodes = [];
        this.nodeIds = [];
        this.nodeIndex = 0;
        this.isMoving = false;
    }
    addWaypointNode(hexagon: Hexagon): void {
        throw new Error('Method not implemented.');
    }
    removeWaypointNode(hexagon: Hexagon): void {
        throw new Error('Method not implemented.');
    }
    doSpawn(ms: number, hive: Hive) {
        throw new Error('Method not implemented.');
    }
    doTravel(ms: number, hive: Hive, map: Map): void {
        throw new Error('Method not implemented.');
    }
    doCollect(ms: number, hive: Hive, map: Map): void {
        throw new Error('Method not implemented.');
    }
    doDeposit(ms: number, hive: Hive): void {
        throw new Error('Method not implemented.');
    }
    goHome(ms: number, hive: Hive, map: Map): void {
        throw new Error('Method not implemented.');
    }
    doWork(ms: number, hive: Hive, map: Map): void {
        if (this.action === null) {
            this.goHome(ms, hive, map);
            return;
        }

        switch (this.jid) {
            case JobID.BREEDER:
                if (this.action === JobAction.SPAWN)
                    this.doSpawn(ms, hive);
                break;
            case JobID.NURSE:
            case JobID.PRODUCER_FOOD:
            case JobID.PRODUCER_HONEY:
            case JobID.BUILDER:
            case JobID.UNDERTAKER:
                if (this.action === JobAction.PRODUCE) {
                    this.doProduce(ms, hive);
                }
                break;
            case JobID.FORAGER:
                if (this.action === JobAction.TRAVEL) {
                    this.doTravel(ms, hive, map);
                } else if (this.action === JobAction.COLLECT) {
                    this.doCollect(ms, hive, map);
                } else if (this.action === JobAction.DEPOSIT) {
                    this.doDeposit(ms, hive);
                }
                break;
            default:
                this.msSinceWork = 0;
                break;
        }
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
    update(config?: IBeeState): void {
        super.update(config);

    }

    mate(drone: BaseBee): void {
        if (drone.beetype !== BeeTypes.DRONE) throw new Error("Queen cannot mate with non-drone bees");
        drone.die();
    }

}

export class Drone extends BaseBee {

    constructor(config: IBeeState) {
        super(config);
        this.beetype = BeeTypes.DRONE;
        this.update(config);
    }
    update(config?: IBeeState): void {
        super.update(config);
    }
}


