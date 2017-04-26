import { Trait } from "app/config/traits.config";
import { ConfigService } from "app/config/config.service"
import { Genome } from "app/classes/genome.class";
import { Hexagon } from "app/classes/hexmap/hexagon.class";
import { JobType, JOB_TYPES, JobAction, IJobStep } from "app/config/jobTypes.config";
import { Hive } from "app/classes/hive.class";
import { Map } from "app/classes/map.class";
import { AppInjector, randomIntFromInterval } from "app/app.module";
import { Ability } from "app/config/abilities.config";
import { LogService } from "app/log/log.component";
import { JobID, AbilityID, ResourceID } from 'app/config/types.config';
import { MapResource } from "app/classes/map-resource.class";
interface IWorkStatus {
    action: string;
    value: number;
    max?: number;
    rid?: ResourceID,
    icon?: string
}
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
    baskets?: { [rid: string]: number }
}
interface IBee extends IBeeState {
    job: JobType;
    workStatus: IWorkStatus;
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
    workStatus: IWorkStatus;
    hasPairs: boolean;
    nodes: Hexagon[];
    isMoving?: boolean;
    harvesting?: boolean;
    baskets?: { [rid: string]: number }
    heading?: number;
    abilitiesMap: {};
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

        this.baskets = config && config.baskets || this.baskets || null;
        if (this.baskets === null) {
            this.baskets = {};
            this.baskets[ResourceID.NECTAR] = 0;
            this.baskets[ResourceID.POLLEN] = 0;
            this.baskets[ResourceID.WATER] = 0;
        }
        //this.nodes = this.nodes || [];
        this.nodeIndex = config && config.nodeIndex || this.nodeIndex || 0;
        this.beeMutationChance = config && config.beeMutationChance || this.beeMutationChance || 0.005;
        this.genome = new Genome(config && config.genome || null, this.hasPairs);
        this.traits = this._configService.getTraits(this.genome);
        this.abilities = this._configService.getAbilities(this.traits);
        this.abilitiesMap = this.abilities.reduce(function (map, ability) {
            map[ability.abilityId] = ability;
            return map;
        }, {});
        this.name = this.beetype + this.id;
        this.workStatus = null;
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
            harvesting: this.harvesting,
            baskets: this.baskets
        };
    }


    die(): void {
        this.dead = true;
        this.setJob(JobID.IDLE);
    }
    getAbility(abilityId: AbilityID): Ability {
        //return this.abilities.find(a => a.abilityId === abilityId);
        return this.abilitiesMap[abilityId];
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
    storageAmount(rid: ResourceID): number {
        let amt: number;
        switch (rid) {
            case ResourceID.NECTAR:
                amt = this.getAbility(AbilityID.STR_NECTAR).value;
                break;
            case ResourceID.POLLEN:
                amt = this.getAbility(AbilityID.STR_POLLEN).value;
                break;
            case ResourceID.WATER:
                amt = this.getAbility(AbilityID.STR_WATER).value;
                break;
        }
        return amt - this.baskets[rid];

    }
    storageFull(): boolean {
        return this.storageAmount(ResourceID.NECTAR) + this.storageAmount(ResourceID.POLLEN) + this.storageAmount(ResourceID.WATER) <= 0;
    }
    storageEmpty(): boolean {
        return this.baskets[ResourceID.NECTAR] + this.baskets[ResourceID.POLLEN] + this.baskets[ResourceID.WATER] <= 0;
    }
    setJob(jid: JobID, jobStep?: IJobStep): void {
        if (this.jid === jid) return;

        var job = JOB_TYPES.find(j => j.jid === jid);
        if (job.beetypes.indexOf(this.beetype) === -1) {
            return;
        }
        this.workStatus = null;
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
        if (this.jid !== JobID.FORAGER) this.setJob(JobID.FORAGER);

        if (this.nodeIds.indexOf(hexagon.id) === -1) {
            this.nodes.push(hexagon);
            this.nodeIds.push(hexagon.id);
        } else {
            this.removeWaypointNode(hexagon);
        }
    }
    removeWaypointNode(hexagon: Hexagon): void {
        if (this.harvesting) {
            hexagon.mapResource.doneHarvesting();
        }
        this.nodes.splice(this.nodes.indexOf(hexagon), 1);
        this.nodeIds.splice(this.nodeIds.indexOf(hexagon.id), 1);
    }
    doSpawn(ms: number, hive: Hive) {
        throw new Error('Method not implemented.');
    }
    doProduce(ms: number, hive: Hive): void {
        var rate = this.getAbility(this.jobStep.rate).value;
        var ya = this.getAbility(this.jobStep.yield);
        if (hive.storageSpace(ya.rid) >= ya.value) {
            this.msSinceWork += ms;
            if (this.msSinceWork >= rate) {

                while (this.msSinceWork >= rate) {
                    var spent = [];
                    var success = false;
                    for (let c of this.jobStep.cost) {
                        var ca = this.getAbility(c);
                        var result = hive.changeResource(ca.c_rid, -1 * ca.value);
                        success = result.error !== -1 && result.stored === -1 * ca.value;
                        if (success) {
                            spent.push({ rid: ca.c_rid, amount: ca.value });
                        } else break;
                    }
                    if (success) {
                        var result = hive.changeResource(ya.rid, ya.value);
                        success = result.error !== -1 && result.stored === ya.value;
                        if (!success) hive.changeResource(ya.rid, -1 * result.stored);
                    }

                    // we either didn't have enough resources, or we couldn't store the 
                    // resources, refund anything that was spent
                    if (!success) {
                        for (let s of spent) {
                            hive.changeResource(s.rid, s.amount);
                        }
                        //no need to keep working
                        this.msSinceWork = rate;
                        break;
                    } else {
                        this.msSinceWork -= rate;
                    }
                    if (hive.storageSpace(ya.rid) < ya.value) break;
                }
            }
        }
        this.workStatus = { action: this.job.name, value: this.msSinceWork / 1000, max: rate / 1000, rid: ya.rid };
    }
    doTravel(ms: number, hive: Hive, map: Map): void {
        if (this.nodeIds.length === 0) {
            this.tripStart = this.tripEnd;
            this.goHome(ms, hive, map);
            return;
        }
        var mr = this.nodes[this.nodeIndex].mapResource;
        if (this.tripStart !== this.pos) {
            this.heading = null;
            this.isMoving = true;
            var rate = this.getAbility(this.jobStep.rate).value;
            this.tripStart = this.pos;
            this.tripElaspedTime = 0;
            this.tripEnd = this.nodes[this.nodeIndex].id;
            this.tripTotalTime = map.grid.GetHexDistance(this.nodes[this.nodeIndex], map.grid.GetHexById(this.tripStart)) * rate;
        }
        this.tripElaspedTime += ms;
        if (this.tripElaspedTime >= this.tripTotalTime) {
            this.isMoving = false;
            this.jobStep = this.job.actions.find(a => a.action === JobAction.COLLECT);
            this.msSinceWork = 0;
            this.tripStart = null;
            this.pos = this.nodes[this.nodeIndex].id;
            mr.queueHarvest(this);
        }
        var rid = mr.water > 0 ? ResourceID.WATER : ResourceID.POLLEN;
        this.workStatus = { action: "Travelling to " + this.tripEnd, value: this.tripElaspedTime / 1000, max: this.tripTotalTime / 1000, rid: rid };
    }
    doCollect(ms: number, hive: Hive, map: Map): void {

        if (this.nodeIds.length === 0) {
            this.goHome(ms, hive, map);
            return;
        }
        if (this.waitingAtResource) {
            this.workStatus = { action: "Waiting at resource", value: 0, max: 0 };
            return;
        }
        var resourceNode = this.nodes[this.nodeIndex].mapResource;
        var rate = this.getAbility(this.jobStep.rate).value * resourceNode.harvestMultiplier;
        this.msSinceWork += ms;
        while (this.msSinceWork >= rate) {
            var collected = false;
            var rid = ResourceID.NECTAR;
            if (resourceNode.getAvailable(rid) > 0 && this.storageAmount(rid) > 0) {
                this.baskets[rid] += resourceNode.collect(rid, 1);
                collected = true;
            }
            rid = ResourceID.POLLEN;
            if (!collected && resourceNode.getAvailable(rid) > 0 && this.storageAmount(rid) > 0) {
                this.baskets[rid] += resourceNode.collect(rid, 1);
                collected = true;
            }
            rid = ResourceID.WATER;
            if (!collected && resourceNode.getAvailable(rid) > 0 && this.storageAmount(rid) > 0) {
                this.baskets[rid] += resourceNode.collect(rid, 1);
                collected = true;
            }
            if (!collected) {
                this._logService.logWorkMessage(this.name + " done harvesting.");
                this.harvesting = false;
                this.nodes[this.nodeIndex].mapResource.doneHarvesting();
                this.msSinceWork -= rate;
                if (this.nodeIndex + 1 === this.nodes.length) {
                    this.nodeIndex = 0;
                    this.goHome(0, hive, map);
                } else if (this.storageFull()) {
                    this.goHome(0, hive, map);
                } else {
                    this.jobStep = this.job.actions.find(a => a.action === JobAction.TRAVEL);
                    this.nodeIndex++;
                }
            } else {
                this.msSinceWork -= rate;
            }

        }
        //this.workStatus = { action: "Collecting", value: this.msSinceWork / 1000, max: rate / 1000 };
        this.workStatus = { action: "Collecting", rid: this.getCollectRid(resourceNode), value: this.msSinceWork / 1000, max: rate / 1000 };
    }
    getCollectRid(resourceNode: MapResource): ResourceID {
        return this.storageAmount(ResourceID.NECTAR) > 0 && resourceNode.getAvailable(ResourceID.NECTAR) > 0 ? ResourceID.NECTAR
            : this.storageAmount(ResourceID.POLLEN) > 0 && resourceNode.getAvailable(ResourceID.POLLEN) > 0 ? ResourceID.POLLEN
                : this.storageAmount(ResourceID.WATER) > 0 && resourceNode.getAvailable(ResourceID.WATER) > 0 ? ResourceID.WATER : null;
    }
    getDepositRid(hive: Hive): ResourceID {
        // var nectar = hive.resources.find(r => r.rid === ResourceID.NECTAR);
        // var pollen = hive.resources.find(r => r.rid === ResourceID.POLLEN);
        // var water = hive.resources.find(r => r.rid === ResourceID.WATER);
        var nectar = hive.resourcesMap[ResourceID.NECTAR];
        var pollen = hive.resourcesMap[ResourceID.POLLEN];
        var water = hive.resourcesMap[ResourceID.WATER];
        var deposit = this.baskets[ResourceID.NECTAR] > 0 && nectar.owned < nectar.max ? ResourceID.NECTAR
            : this.baskets[ResourceID.POLLEN] > 0 && pollen.owned < pollen.max ? ResourceID.POLLEN
                : this.baskets[ResourceID.WATER] > 0 && water.owned < water.max ? ResourceID.WATER
                    : this.baskets[ResourceID.NECTAR] > 0 ? ResourceID.NECTAR
                        : this.baskets[ResourceID.POLLEN] > 0 ? ResourceID.POLLEN
                            : this.baskets[ResourceID.WATER] > 0 ? ResourceID.WATER : null;
        return deposit;
    }
    doDeposit(ms: number, hive: Hive): void {
        var rate = this.getAbility(this.jobStep.rate).value;
        this.msSinceWork += ms;
        while (this.msSinceWork >= rate) {
            var deposited = false;
            var rid = ResourceID.NECTAR;
            if (this.baskets[rid] > 0) {
                var result = hive.changeResource(rid, 1);
                if (result.error !== -1 && result.stored === 1) {
                    this.baskets[rid]--;
                    deposited = true;
                    this.workStatus.rid = rid;
                }
            }
            rid = ResourceID.POLLEN;
            if (this.baskets[rid] > 0 && !deposited) {
                var result = hive.changeResource(rid, 1);
                if (result.error !== -1 && result.stored === 1) {
                    this.baskets[rid]--;
                    deposited = true;
                    this.workStatus.rid = rid;
                }
            }
            rid = ResourceID.WATER;
            if (this.baskets[rid] > 0 && !deposited) {
                var result = hive.changeResource(rid, 1);
                if (result.error !== -1 && result.stored === 1) {
                    this.baskets[rid]--;
                    deposited = true;
                    this.workStatus.rid = rid;
                }
            }
            if (!deposited && !this.storageFull()) {
                this.jobStep = this.job.actions.find(a => a.action === JobAction.TRAVEL);
                this.msSinceWork = 0;
            }
            if (deposited)
                this.msSinceWork -= rate;
            else {
                this.msSinceWork = rate;
                break;
            }

        }
        this.workStatus = { action: "Depositing", rid: this.getDepositRid(hive), value: this.msSinceWork / 1000, max: rate / 1000 };

    }
    goHome(ms: number, hive: Hive, map: Map): void {
        if (this.tripStart !== this.pos) {
            this.jobStep = null;
            var rate = this.getAbility(AbilityID.SPD_FLY).value;
            this.tripStart = this.pos;
            this.tripElaspedTime = 0;
            this.tripEnd = hive.pos;
            this.tripTotalTime = map.grid.GetHexDistance(map.grid.GetHexById(this.tripEnd), map.grid.GetHexById(this.tripStart)) * rate;
            this.isMoving = true;
        }
        this.tripElaspedTime += ms;
        if (this.tripElaspedTime >= this.tripTotalTime) {
            this.isMoving = false;
            //var jobType = jobTypes[this.jid];
            this.jobStep = this.job.actions[0];
            this.msSinceWork = 0;
            this.tripStart = null;
            this.pos = this.tripEnd;

            //var jobStepIndex = this.jobStepIndex;
            if (this.job.jid === JobID.FORAGER) {
                this._logService.logWorkMessage(this.name + ' returned home.');
                if (!this.storageEmpty())
                    this.jobStep = this.job.actions.find(a => a.action === JobAction.DEPOSIT);
                else {
                    if (this.nodeIds.length === 0) this.setJob(JobID.IDLE);
                    else this.jobStep = this.job.actions.find(a => a.action === JobAction.TRAVEL);
                }
            }
        }
        if (this.job.jid === JobID.IDLE)
            this.workStatus = { action: this.job.name, value: 0, max: 0 };
        else
            this.workStatus = { action: "Going Home", value: this.tripElaspedTime / 1000, max: this.tripTotalTime / 1000 };

    }
    doWork(ms: number, hive: Hive, map: Map): void {
        if (this.dead || this.beetype === BeeTypes.EGG || this.beetype === BeeTypes.LARVA) return;
        if (!this.jobStep) {
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
            case JobID.GUARD:
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
        this.workStatus = { action: "Laying Eggs", value: this.msSinceWork / 1000, max: eggRate / 1000, rid: ResourceID.ROYAL_JELLY };
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
                genome: this.genome,
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