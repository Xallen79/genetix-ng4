import { ResourceID, AbilityID } from 'app/config/types.config';

interface IAbility {
    abilityId: AbilityID;
    name: string;
    desc: string;
    rid?: ResourceID;
    c_rid?: ResourceID;
    baseValue: number;
    value?: number
}

export class Ability implements IAbility {
    abilityId: AbilityID;
    name: string;
    desc: string;
    rid?: ResourceID;
    c_rid?: ResourceID;
    baseValue: number;
    value?: number;

    constructor(def: IAbility) {
        this.abilityId = def.abilityId;
        this.name = def.name;
        this.desc = def.name;
        this.rid = def.rid;
        this.c_rid = def.c_rid;
        this.baseValue = def.baseValue;
        this.value = def.value != null ? def.value : def.baseValue;
    }
}

export var DEFAULT_ABILITIES: Ability[] = [{
    "abilityId": AbilityID.DEF,
    "name": "Defense",
    "desc": "Ability to defend the hive.",
    "baseValue": 1,
    "rid": "defense"
},
{
    "abilityId": AbilityID.RNG,
    "name": "Range",
    "desc": "Number of cells a bee can fly before having to return to the hive.",
    "baseValue": 2
},
{
    "abilityId": AbilityID.STR_POLLEN,
    "name": "Pollen Storage",
    "desc": "The amount of pollen a bee can hold.",
    "baseValue": 10,
    "rid": ResourceID.POLLEN
},
{
    "abilityId": AbilityID.STR_NECTAR,
    "name": "Nectar Storage",
    "desc": "The amount of nectar a bee can hold.",
    "baseValue": 10,
    "rid": ResourceID.NECTAR
},
{
    "abilityId": AbilityID.STR_WATER,
    "name": "Water Storage",
    "desc": "The amount of water a bee can hold.",
    "baseValue": 10,
    "rid": ResourceID.WATER
},
{
    "abilityId": AbilityID.SPD_FLY,
    "name": "Flight Speed",
    "desc": "The rate at which a bee can traverse 1 cell.",
    "baseValue": 4000
},
{
    "abilityId": AbilityID.SPD_CLT,
    "name": "Collection Speed",
    "desc": "The rate at which a bee can collect 1 resource from a node.",
    "baseValue": 1000
},
{
    "abilityId": AbilityID.SPD_DEP,
    "name": "Deposit Speed",
    "desc": "The rate at which a bee can deposits 1 resource from its resource baskets.",
    "baseValue": 1500
},

{
    "abilityId": AbilityID.PRD_HONEY,
    "name": "%(resource)s Production Rate",
    "desc": "The rate at which a bee can produce %(resource)s.",
    "baseValue": 10000,
    "rid": ResourceID.HONEY
},
{
    "abilityId": AbilityID.YLD_HONEY,
    "name": "%(resource) Production Yield",
    "desc": "The amount of %(resource)s a bee can produce.",
    "baseValue": 4,
    "rid": ResourceID.HONEY
},
{
    "abilityId": AbilityID.COST_HONEY_NECTAR,
    "name": "%(resource)s Production Cost (%(cost)s)",
    "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
    "baseValue": 2,
    "rid": ResourceID.HONEY,
    "c_rid": ResourceID.NECTAR
},

{
    "abilityId": AbilityID.PRD_WAX,
    "name": "%(resource)s Production Rate",
    "desc": "The rate at which a bee can produce %(resource)s.",
    "baseValue": 30000,
    "rid": ResourceID.WAX
},
{
    "abilityId": AbilityID.YLD_WAX,
    "name": "%(resource) Production Yield",
    "desc": "The amount of %(resource)s a bee can produce.",
    "baseValue": 1,
    "rid": ResourceID.WAX
},
{
    "abilityId": AbilityID.COST_WAX_FOOD,
    "name": "%(resource)s Production Cost (%(cost)s)",
    "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
    "baseValue": 2,
    "rid": ResourceID.WAX,
    "c_rid": ResourceID.FOOD
},

{
    "abilityId": AbilityID.PRD_JELLY,
    "name": "%(resource)s Production Rate",
    "desc": "The rate at which a bee can produce %(resource)s.",
    "baseValue": 30000,
    "rid": ResourceID.ROYAL_JELLY
},
{
    "abilityId": AbilityID.YLD_JELLY,
    "name": "%(resource) Production Yield",
    "desc": "The amount of %(resource)s a bee can produce.",
    "baseValue": 1,
    "rid": ResourceID.ROYAL_JELLY
},
{
    "abilityId": AbilityID.COST_JELLY_HONEY,
    "name": "%(resource)s Production Cost (%(cost)s)",
    "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
    "baseValue": 10,
    "rid": ResourceID.ROYAL_JELLY,
    "c_rid": ResourceID.HONEY
},
{
    "abilityId": AbilityID.COST_JELLY_POLLEN,
    "name": "%(resource)s Production Cost (%(cost)s)",
    "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
    "baseValue": 10,
    "rid": ResourceID.ROYAL_JELLY,
    "c_rid": ResourceID.POLLEN
},

{
    "abilityId": AbilityID.PRD_FOOD,
    "name": "%(resource)s Production Rate",
    "desc": "The rate at which a bee can produce %(resource)s.",
    "baseValue": 10000,
    "rid": ResourceID.FOOD
},
{
    "abilityId": AbilityID.YLD_FOOD,
    "name": "%(resource) Production Yield",
    "desc": "The amount of %(resource)s a bee can produce.",
    "baseValue": 1,
    "rid": ResourceID.FOOD
},
{
    "abilityId": AbilityID.COST_FOOD_POLLEN,
    "name": "%(resource)s Production Cost (%(cost)s)",
    "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
    "baseValue": 2,
    "rid": ResourceID.FOOD,
    "c_rid": ResourceID.POLLEN
},
{
    "abilityId": AbilityID.COST_FOOD_HONEY,
    "name": "%(resource)s Production Cost (%(cost)s)",
    "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
    "baseValue": 1,
    "rid": ResourceID.FOOD,
    "c_rid": ResourceID.HONEY
},
{
    "abilityId": AbilityID.COST_FOOD_WATER,
    "name": "%(resource)s Production Cost (%(cost)s)",
    "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
    "baseValue": 2,
    "rid": ResourceID.FOOD,
    "c_rid": ResourceID.WATER
},
{
    "abilityId": AbilityID.COST_FOOD_DEADBEES,
    "name": "%(resource)s Production Cost (%(cost)s)",
    "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
    "baseValue": 1,
    "rid": ResourceID.FOOD,
    "c_rid": ResourceID.DEADBEES
},

{
    "abilityId": AbilityID.PRD_EGG,
    "name": "Egg Production",
    "desc": "The rate at which a bee can produce eggs.",
    "baseValue": 30000
},
{
    "abilityId": AbilityID.MORT_RATE,
    "name": "Mortality rate",
    "desc": "Odds out of base 1,000,000 that a bee will die per work cycle.",
    "baseValue": 1
}

]