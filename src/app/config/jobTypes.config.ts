
import { AbilityID, JobID } from 'app/config/types.config';


export type JobAction = "spawn" | "travel" | "collect" | "deposit" | "produce" | "protect";
export const JobAction = {
    SPAWN: 'spawn' as JobAction,
    TRAVEL: 'travel' as JobAction,
    COLLECT: 'collect' as JobAction,
    DEPOSIT: 'deposit' as JobAction,
    PRODUCE: 'produce' as JobAction,
    PROTECT: 'protect' as JobAction
};


interface IJobType {
    jid: JobID;
    name: string;
    desc: string;
    actions: IJobStep[];
    beetypes: string[];
}
export interface IJobStep {
    action: JobAction;
    rate?: AbilityID;
    storage?(rid: string): AbilityID;
    yield?: AbilityID;
    cost?: AbilityID[];
    amount?: AbilityID;

}

export class JobType implements IJobType {
    jid: JobID;
    name: string;
    desc: string;
    actions: IJobStep[];
    beetypes: string[];

    constructor(jobType: IJobType) {
        this.jid = jobType.jid;
        this.name = jobType.name;
        this.desc = jobType.desc;
        this.actions = jobType.actions;
        this.beetypes = jobType.beetypes;
    }
}

export var JOB_TYPES: IJobType[] = [{
    jid: JobID.IDLE,
    name: "Idle",
    desc: "No job assigned.",
    actions: [],
    beetypes: ['drone', 'egg', 'larva', 'queen', 'worker']
},
{
    jid: JobID.BREEDER,
    name: "Breeding Queen",
    desc: "Head Queen, performs the task of laying eggs and fertilizing them.",
    actions: [
        {
            action: JobAction.SPAWN,
            rate: AbilityID.PRD_EGG
        }],
    beetypes: ['queen']

},
{
    jid: JobID.FORAGER,
    name: "Forager",
    desc: "Collects nectar, pollen, and water.",
    actions: [{
        action: JobAction.TRAVEL,
        rate: AbilityID.SPD_FLY
    },
    {
        action: JobAction.COLLECT,
        rate: AbilityID.SPD_CLT,
        storage: AbilityID.Get_STR,
    },
    {
        action: JobAction.DEPOSIT,
        rate: AbilityID.SPD_DEP
    }],
    beetypes: ['worker']
},
{
    jid: JobID.NURSE,
    name: "Nurse Bee",
    desc: "Cares for eggs and produces royal jelly from honey and pollen",
    actions: [{
        action: JobAction.PRODUCE,
        rate: AbilityID.PRD_JELLY,
        yield: AbilityID.YLD_JELLY,
        cost: [AbilityID.COST_JELLY_HONEY, AbilityID.COST_JELLY_POLLEN]
    }],
    beetypes: ['worker']
},
{
    jid: JobID.PRODUCER_FOOD,
    name: "Food Producer",
    desc: "Converts stored honey, pollen, and water into usable food",
    actions: [{
        action: JobAction.PRODUCE,
        rate: AbilityID.PRD_FOOD,
        yield: AbilityID.YLD_FOOD,
        cost: [AbilityID.COST_FOOD_HONEY, AbilityID.COST_FOOD_POLLEN, AbilityID.COST_FOOD_WATER]
    }],
    beetypes: ['worker']
},
{
    jid: JobID.PRODUCER_HONEY,
    name: "Honey Producer",
    desc: "Converts stored nectar into honey",
    actions: [{
        action: JobAction.PRODUCE,
        rate: AbilityID.PRD_HONEY,
        yield: AbilityID.YLD_HONEY,
        cost: [AbilityID.COST_HONEY_NECTAR]
    }],
    beetypes: ['worker']
},
{
    jid: JobID.BUILDER,
    name: "Builder",
    desc: "Converts stored food into wax",
    actions: [{
        action: JobAction.PRODUCE,
        rate: AbilityID.PRD_WAX,
        yield: AbilityID.YLD_WAX,
        cost: [AbilityID.COST_WAX_FOOD]
    }],
    beetypes: ['worker']
},
{
    jid: JobID.UNDERTAKER,
    name: "Undertaker Bee",
    desc: "Converts dead bees and rejected eggs into food.",
    actions: [{
        action: JobAction.PRODUCE,
        rate: AbilityID.PRD_FOOD,
        yield: AbilityID.YLD_FOOD,
        cost: [AbilityID.COST_FOOD_DEADBEES]
    }],
    beetypes: ['worker']
},
{
    jid: JobID.GUARD,
    name: "Guard Bee",
    desc: "Protects the hive which reduces the mortality rate",
    actions: [{
        action: JobAction.PROTECT,
        amount: AbilityID.DEF
    }],
    beetypes: ['drone', 'worker']
}]