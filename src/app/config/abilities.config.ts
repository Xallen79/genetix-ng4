import { ResourceID } from 'app/config/resourceTypes.config';
export type AbilityID = 'def' | 'rng' |
    'str_pollen' | 'str_nectar' | 'str_water' |
    'spd_fly' | 'spd_clt' | 'spd_dep' |
    'prd_honey' | 'yld_honey' | 'cost_honey_nectar' |
    'prd_wax' | 'yld_wax' | 'cost_wax_food' |
    'prd_jelly' | 'yld_jelly' | 'cost_jelly_honey' | 'cost_jelly_pollen' |
    'prd_food' | 'yld_food' | 'cost_food_pollen' | 'cost_food_honey' | 'cost_food_water' | 'cost_food_deadbees' |
    'prd_egg';
export const AbilityID = {
    DEF: 'def' as AbilityID, RNG: 'rng' as AbilityID,
    STR_POLLEN: 'str_pollen' as AbilityID, STR_NECTAR: 'str_nectar' as AbilityID, STR_WATER: 'str_water' as AbilityID,
    SPD_FLY: 'spd_fly' as AbilityID, SPD_CLT: 'spd_clt' as AbilityID, SPD_DEP: 'spd_dep' as AbilityID,
    PRD_HONEY: 'prd_honey' as AbilityID, YLD_HONEY: 'yld_honey' as AbilityID, COST_HONEY_NECTAR: 'cost_honey_nectar' as AbilityID,
    PRD_WAX: 'prd_wax' as AbilityID, YLD_WAX: 'yld_wax' as AbilityID, COST_WAX_FOOD: 'cost_wax_food' as AbilityID,
    PRD_JELLY: 'prd_jelly' as AbilityID, YLD_JELLY: 'yld_jelly' as AbilityID, COST_JELLY_HONEY: 'cost_jelly_honey' as AbilityID, COST_JELLY_POLLEN: 'cost_jelly_pollen' as AbilityID,
    PRD_FOOD: 'prd_food' as AbilityID, YLD_FOOD: 'yld_food' as AbilityID, COST_FOOD_POLLEN: 'cost_food_pollen' as AbilityID, COST_FOOD_HONEY: 'cost_food_honey' as AbilityID, COST_FOOD_WATER: 'cost_food_water' as AbilityID, COST_FOOD_DEADBEES: 'cost_food_deadbees' as AbilityID,
    PRD_EGG: 'prd_egg' as AbilityID,
    Get_STR: function (rid: ResourceID): AbilityID {
        switch (rid) {
            case 'nectar':
                return AbilityID.STR_NECTAR;
            case 'pollen':
                return AbilityID.STR_POLLEN;
            case 'water':
                return AbilityID.STR_WATER;
        }
    }
}

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
    "baseValue": 5,
    "rid": ResourceID.FOOD,
    "c_rid": ResourceID.DEADBEES
},

{
    "abilityId": AbilityID.PRD_EGG,
    "name": "Egg Production",
    "desc": "The rate at which a bee can produce eggs.",
    "baseValue": 30000
}

]