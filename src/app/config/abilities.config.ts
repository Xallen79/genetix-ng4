interface IAbility {
    abilityId:string;
    name:string;
    desc:string;
    rid?:string;
    c_rid?:string;
    baseValue:number;
    value?:number
}

export class Ability implements IAbility {
    abilityId:string;
    name:string;
    desc:string;
    rid?:string;  
    c_rid?:string; 
    baseValue:number;
    value?:number;

    constructor(def:IAbility) {
        this.abilityId=def.abilityId;
        this.name=def.name;
        this.desc=def.name;
        this.rid=def.rid;   
        this.c_rid=def.c_rid;  
        this.baseValue=def.baseValue;  
        this.value = def.value!=null?def.value : def.baseValue; 
    } 
}

export var DEFAULT_ABILITIES: Ability[] = [{
                "abilityId": "DEF",
                "name": "Defense",
                "desc": "Ability to defend the hive.",
                "baseValue": 1,
                "rid": "DEFENSE"
            },
            {
                "abilityId": "RNG", 
                "name": "Range",
                "desc": "Number of cells a bee can fly before having to return to the hive.",
                "baseValue": 2
            },
            {
                "abilityId": "STR_POLLEN",
                "name": "Pollen Storage",
                "desc": "The amount of pollen a bee can hold.",
                "baseValue": 10,
                "rid": "POLLEN"
            },
            {
                "abilityId": "STR_NECTAR", 
                "name": "Nectar Storage",
                "desc": "The amount of nectar a bee can hold.",
                "baseValue": 10,
                "rid": "NECTAR"
            },
            {
                "abilityId": "STR_WATER",
                "name": "Water Storage",
                "desc": "The amount of water a bee can hold.",
                "baseValue": 10,
                "rid": "WATER"
            },
            {
                "abilityId": "SPD_FLY",
                "name": "Flight Speed",
                "desc": "The rate at which a bee can traverse 1 cell.",
                "baseValue": 4000
            },
            {
                "abilityId": "SPD_CLT",
                "name": "Collection Speed",
                "desc": "The rate at which a bee can collect 1 resource from a node.",
                "baseValue": 1000
            },
            {
                "abilityId": "SPD_DEP",
                "name": "Deposit Speed",
                "desc": "The rate at which a bee can deposits 1 resource from its resource baskets.",
                "baseValue": 1500
            },

            {
                "abilityId": "PRD_HONEY",
                "name": "%(resource)s Production Rate",
                "desc": "The rate at which a bee can produce %(resource)s.",
                "baseValue": 10000,
                "rid": "HONEY"
            },
            {
                "abilityId": "YLD_HONEY",
                "name": "%(resource) Production Yield",
                "desc": "The amount of %(resource)s a bee can produce.",
                "baseValue": 4,
                "rid": "HONEY"
            },
            {
                "abilityId": "COST_HONEY_NECTAR",
                "name": "%(resource)s Production Cost (%(cost)s)",
                "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
                "baseValue": 2,
                "rid": "HONEY",
                "c_rid": "NECTAR"
            },

            {
                "abilityId": "PRD_WAX",
                "name": "%(resource)s Production Rate",
                "desc": "The rate at which a bee can produce %(resource)s.",
                "baseValue": 30000,
                "rid": "WAX"
            },
            {
                "abilityId": "YLD_WAX",
                "name": "%(resource) Production Yield",
                "desc": "The amount of %(resource)s a bee can produce.",
                "baseValue": 1,
                "rid": "WAX"
            },
            {
                "abilityId": "COST_WAX_FOOD",
                "name": "%(resource)s Production Cost (%(cost)s)",
                "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
                "baseValue": 2,
                "rid": "WAX",
                "c_rid": "FOOD"
            },

            {
                "abilityId": "PRD_JELLY",
                "name": "%(resource)s Production Rate",
                "desc": "The rate at which a bee can produce %(resource)s.",
                "baseValue": 30000,
                "rid": "ROYAL_JELLY"
            },
            {
                "abilityId": "YLD_JELLY",
                "name": "%(resource) Production Yield",
                "desc": "The amount of %(resource)s a bee can produce.",
                "baseValue": 1,
                "rid": "ROYAL_JELLY"
            },
            {
                "abilityId": "COST_JELLY_HONEY",
                "name": "%(resource)s Production Cost (%(cost)s)",
                "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
                "baseValue": 10,
                "rid": "ROYAL_JELLY",
                "c_rid": "HONEY"
            },
            {
                "abilityId": "COST_JELLY_POLLEN",
                "name": "%(resource)s Production Cost (%(cost)s)",
                "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
                "baseValue": 10,
                "rid": "ROYAL_JELLY",
                "c_rid": "POLLEN"
            },

            {
                "abilityId": "PRD_FOOD",
                "name": "%(resource)s Production Rate",
                "desc": "The rate at which a bee can produce %(resource)s.",
                "baseValue": 10000,
                "rid": "FOOD"
            },
            {
                "abilityId": "YLD_FOOD",
                "name": "%(resource) Production Yield",
                "desc": "The amount of %(resource)s a bee can produce.",
                "baseValue": 1,
                "rid": "FOOD"
            },
            {
                "abilityId": "COST_FOOD_POLLEN",
                "name": "%(resource)s Production Cost (%(cost)s)",
                "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
                "baseValue": 2,
                "rid": "FOOD",
                "c_rid": "POLLEN"
            },
            {
                "abilityId": "COST_FOOD_HONEY",
                "name": "%(resource)s Production Cost (%(cost)s)",
                "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
                "baseValue": 1,
                "rid": "FOOD",
                "c_rid": "HONEY"
            },
            {
                "abilityId": "COST_FOOD_WATER",
                "name": "%(resource)s Production Cost (%(cost)s)",
                "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
                "baseValue": 2,
                "rid": "FOOD",
                "c_rid": "WATER"
            },
            {
                "abilityId": "COST_FOOD_DEADBEES",
                "name": "%(resource)s Production Cost (%(cost)s)",
                "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
                "baseValue": 5,
                "rid": "FOOD",
                "c_rid": "DEADBEES"
            },

            {
                "abilityId": "PRD_EGG",
                "name": "Egg Production",
                "desc": "The rate at which a bee can produce eggs.",
                "baseValue": 30000
            }

]