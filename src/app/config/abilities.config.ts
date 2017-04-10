import { ResourceID } from 'app/config/resourceTypes.config';
export type AbilityID = 'DEF' | 'RNG' |
    'STR_POLLEN' | 'STR_NECTAR' | 'STR_WATER' |
    'SPD_FLY' | 'SPD_CLT' | 'SPD_DEP' |
    'PRD_HONEY' | 'YLD_HONEY' | 'COST_HONEY_NECTAR' |
    'PRD_WAX' | 'YLD_WAX' | 'COST_WAX_FOOD' |
    'PRD_JELLY' | 'YLD_JELLY' | 'COST_JELLY_HONEY' | 'COST_JELLY_POLLEN' |
    'PRD_FOOD' | 'YLD_FOOD' | 'COST_FOOD_POLLEN' | 'COST_FOOD_HONEY' | 'COST_FOOD_WATER' | 'COST_FOOD_DEADBEES' |
    'PRD_EGG';
export const AbilityID = {
    DEF: 'DEF' as AbilityID, RNG: 'RNG' as AbilityID,
    STR_POLLEN: 'STR_POLLEN' as AbilityID, STR_NECTAR: 'STR_NECTAR' as AbilityID, STR_WATER: 'STR_WATER' as AbilityID,
    SPD_FLY: 'SPD_FLY' as AbilityID, SPD_CLT: 'SPD_CLT' as AbilityID, SPD_DEP: 'SPD_DEP' as AbilityID,
    PRD_HONEY: 'PRD_HONEY' as AbilityID, YLD_HONEY: 'YLD_HONEY' as AbilityID, COST_HONEY_NECTAR: 'COST_HONEY_NECTAR' as AbilityID,
    PRD_WAX: 'PRD_WAX' as AbilityID, YLD_WAX: 'YLD_WAX' as AbilityID, COST_WAX_FOOD: 'COST_WAX_FOOD' as AbilityID,
    PRD_JELLY: 'PRD_JELLY' as AbilityID, YLD_JELLY: 'YLD_JELLY' as AbilityID, COST_JELLY_HONEY: 'COST_JELLY_HONEY' as AbilityID, COST_JELLY_POLLEN: 'COST_JELLY_POLLEN' as AbilityID,
    PRD_FOOD: 'PRD_FOOD' as AbilityID, YLD_FOOD: 'YLD_FOOD' as AbilityID, COST_FOOD_POLLEN: 'COST_FOOD_POLLEN' as AbilityID, COST_FOOD_HONEY: 'COST_FOOD_HONEY' as AbilityID, COST_FOOD_WATER: 'COST_FOOD_WATER' as AbilityID, COST_FOOD_DEADBEES: 'COST_FOOD_DEADBEES' as AbilityID,
    PRD_EGG: 'PRD_EGG' as AbilityID,
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