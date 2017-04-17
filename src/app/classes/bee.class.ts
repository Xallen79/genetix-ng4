import { Trait } from "app/config/traits.config";
import { ConfigService } from "app/config/config.service"
import { Genome } from "app/classes/genome.class";
import { Hexagon } from "app/classes/hexmap/hexagon.class";
import { JobType, JobID, JOB_TYPES, JobAction, IJobStep } from "app/config/jobTypes.config";
import { Hive } from "app/classes/hive.class";
import { Map } from "app/classes/map.class";
import { AppInjector, randomIntFromInterval } from "app/app.module";
import { Ability, AbilityID } from "app/config/abilities.config";
import { LogService } from "app/log/log.component";

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
    jobStep?: IJobStep;
    msSinceWork?: number;
    nodeIndex?: number;
    beeMutationChance?: number;
    dead?: boolean;
    nodeIds?: string[];
    traits?: Trait[];
    abilities?: Ability[];
    name?: string;
    genome?: Genome;
    droneGenomes?: Genome[];
    droneIds?: string[];
    isMoving?: boolean;
    harvesting?: boolean;
}
interface IBee extends IBeeState {
    job: JobType;
    update(state?: IBeeState): void;
    getState(): IBeeState;
    die(): void;
    getAbility(abilityId: AbilityID): Ability;
    mature(type: BeeTypes): BaseBee;
    fertilizeEgg(bee: BaseBee): BaseBee;
    hatch(type: BeeTypes): BaseBee;
    mate(bee: BaseBee): void;
    storageAmount(rid: string): number;
    storageFull(): boolean;
    setJob(jid: string, jobStep?: IJobStep): void;
    addWaypointNode(hexagon: Hexagon): void;
    removeWaypointNode(hexagon: Hexagon): void;
    doSpawn(ms: number, hive: Hive): void;
    doTravel(ms: number, hive: Hive, map: Map): void;
    doCollect(ms: number, hive: Hive, map: Map): void;
    doDeposit(ms: number, hive: Hive): void;
    doProduce(ms: number, hive: Hive): void;
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
    jobStep?: IJobStep;
    msSinceWork?: number;
    nodeIndex?: number;
    beeMutationChance?: number;
    dead?: boolean;
    nodeIds?: string[];
    traits?: Trait[];
    abilities?: Ability[];
    name?: string;
    genome?: Genome;
    job: JobType;
    hasPairs: boolean;
    nodes: Hexagon[];
    isMoving?: boolean;
    harvesting?: boolean;

    private _configService: ConfigService;
    private _logService: LogService;

    constructor(config?: IBeeState) {
        this._configService = AppInjector.get(ConfigService);
        this._logService = AppInjector.get(LogService);
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
        this.setJob(config && config.jid || this.jid || JobID.IDLE, config && config.jobStep || this.jobStep || null);

        this.msSinceWork = config && config.msSinceWork || this.msSinceWork || 0;
        this.dead = (config && config.dead != null) ? config.dead : this.dead != null ? this.dead : false;
        this.nodeIds = config && config.nodeIds || this.nodeIds || [];
        this.isMoving = config && config.isMoving || false;
        this.harvesting = config && config.harvesting || false;

        //this.nodes = this.nodes || [];
        this.nodeIndex = config && config.nodeIndex || this.nodeIndex || 0;
        this.beeMutationChance = config && config.beeMutationChance || this.beeMutationChance || 0.005;
        this.genome = new Genome(config && config.genome || null, this.hasPairs);
        this.traits = this._configService.getTraits(this.genome);
        this.abilities = this._configService.getAbilities(this.traits);
        this.name = this.beetype + this.id;
    }
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
            jobStep: this.jobStep,
            msSinceWork: this.msSinceWork,
            nodeIndex: this.nodeIndex,
            beeMutationChance: this.beeMutationChance,
            dead: this.dead,
            nodeIds: this.nodeIds,
            /* not needed for save, uncomment for debugging */
            // traits: this.traits,            
            // abilities: this.abilities,
            genome: this.genome,
            isMoving: this.isMoving,
            harvesting: this.harvesting
        };
    }


    die(): void {
        this.dead = true;
    }
    getAbility(abilityId: AbilityID): Ability {
        return this.abilities.find(a => a.abilityId === abilityId);
    }
    mature(type: BeeTypes): BaseBee {
        throw new Error('Method not implemented.');
    }
    fertilizeEgg(bee: BaseBee): BaseBee {
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
    setJob(jid: JobID, jobStep?: IJobStep): void {
        if (this.jid === jid) return;

        var job = JOB_TYPES.find(j => j.jid === jid);
        if (job.beetypes.indexOf(this.beetype) === -1) {
            return;
        }

        this.jid = jid;
        this.job = job;
        this.msSinceWork = 0;
        this.jobStep = jobStep;
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
    doProduce(ms: number, hive: Hive): void {
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
        if (this.pos === hive.pos) this.jobStep = this.job.actions[0];
    }
    doWork(ms: number, hive: Hive, map: Map): void {
        if (this.jobStep === null) {
            this.goHome(ms, hive, map);
            return;
        }

        switch (this.jid) {
            case JobID.BREEDER:
                if (this.jobStep.action === JobAction.SPAWN)
                    this.doSpawn(ms, hive);
                break;
            case JobID.NURSE:
            case JobID.PRODUCER_FOOD:
            case JobID.PRODUCER_HONEY:
            case JobID.BUILDER:
            case JobID.UNDERTAKER:
                if (this.jobStep.action === JobAction.PRODUCE) {
                    this.doProduce(ms, hive);
                }
                break;
            case JobID.FORAGER:
                if (this.jobStep.action === JobAction.TRAVEL) {
                    this.doTravel(ms, hive, map);
                } else if (this.jobStep.action === JobAction.COLLECT) {
                    this.doCollect(ms, hive, map);
                } else if (this.jobStep.action === JobAction.DEPOSIT) {
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
    droneGenomes: Genome[];
    droneIds: string[];
    constructor(config: IBeeState) {
        super(config);
        this.beetype = BeeTypes.QUEEN;
        this.hasPairs = true;
        this.minDrones = 10;
        this.droneGenomes = [];
        this.droneIds = [];
        this.update(config);

    }
    update(config?: IBeeState): void {
        if (config && config.droneGenomes) {
            for (let g of config.droneGenomes)
                this.droneGenomes.push(new Genome(g, false));
            this.droneIds = config.droneIds;
        }
        super.update(config);


    }
    getState(): IBeeState {
        var state = super.getState();
        state.droneGenomes = this.droneGenomes;
        state.droneIds = this.droneIds;
        return state;
    }
    fertilizeEgg(bee: BaseBee): BaseBee {
        if (bee.beetype !== BeeTypes.EGG) throw new Error("Can only fertilize eggs.");

        var d = randomIntFromInterval(0, this.droneGenomes.length - 1);
        var droneGenome = this.droneGenomes[d];
        var newGenome = bee.genome.fertilize(droneGenome) as Genome;

        var child = new Larva({
            id: bee.id,
            dt: new Date().getTime(),
            generation: this.generation + 1,
            genome: newGenome,
            queenParentId: this.id,
            droneParentId: this.droneIds[d],
            beeMutationChance: this.beeMutationChance,
            pos: this.pos

        });
        return child;
    }
    canLayEggs(hive: Hive): boolean {
        // temporary
        return hive.getNurseryCount() < hive.nurseryLimit && this.droneGenomes.length >= this.minDrones;
    }
    mate(drone: BaseBee): void {
        if (drone.beetype !== BeeTypes.DRONE) throw new Error("Queen cannot mate with non-drone bees");
        this.droneGenomes.push(drone.genome);
        this.droneIds.push(drone.id);
        drone.die();
    }
    doSpawn(ms: number, hive: Hive) {
        var eggRate = this.getAbility(this.jobStep.rate).value;
        if (this.canLayEggs(hive)) {
            this.msSinceWork += ms;
            while (this.msSinceWork >= eggRate) {
                var egg = this.layEgg(hive.getNextId());
                hive.bees.push(egg);
                this.msSinceWork -= eggRate;
            }
        }
    }
    layEgg = function (newId) {
        var eggGenome = this.genome.getEggGenome();
        var egg = new Egg({
            id: newId,
            dt: new Date().getTime(),
            generation: this.generation + 1,
            genome: eggGenome,
            queenParentId: this.id,
            beeMutationChance: this.beeMutationChance,
            pos: this.pos

        });
        egg.update();
        return egg;
    };

}

export class Worker extends BaseBee {
    constructor(config: IBeeState) {
        super(config);
        this.beetype = BeeTypes.WORKER;
        this.hasPairs = true;
        this.update(config);
    }
    update(config?: IBeeState): void {
        super.update(config);
    }
}

export class Drone extends BaseBee {

    constructor(config: IBeeState) {
        super(config);
        this.beetype = BeeTypes.DRONE;
        this.hasPairs = false;
        this.update(config);
    }
    update(config?: IBeeState): void {
        super.update(config);
    }
}


export class Egg extends BaseBee {
    constructor(config: IBeeState) {
        super(config);
        this.beetype = BeeTypes.EGG;
        this.hasPairs = false;
        this.update(config);
    }
    update(config?: IBeeState): void {
        super.update(config);
    }

    hatch(type: BeeTypes) {
        if (type === BeeTypes.DRONE) {
            return new Drone({
                id: this.id,
                generation: this.generation,
                genome: this.genome,
                beeMutationChance: this.beeMutationChance,
                pos: this.pos
            });
        }
    }
}

export class Larva extends BaseBee {
    constructor(config: IBeeState) {
        super(config);
        this.beetype = BeeTypes.LARVA;
        this.hasPairs = true;
        this.update(config);
    }
    update(config?: IBeeState): void {
        super.update(config);
    }
    mature(type: BeeTypes) {
        if (type === BeeTypes.WORKER) {
            return new Worker({
                id: this.id,
                generation: this.generation,
                beeMutationChance: this.beeMutationChance,
                pos: this.pos
            });
        } else if (type === BeeTypes.QUEEN) {
            return new Queen({
                id: this.id,
                genome: this.genome,
                generation: this.generation,
                beeMutationChance: this.beeMutationChance,
                pos: this.pos
            });
        }
    }
}