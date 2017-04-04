interface ITrait {
    id:string;
    name:string;
    desc:string;
    genes:[{
        chromosome:number;
        gene:number;
        value:number;
    }];
    requiredTraits?:string[];
    mods:[{
        abilityId: string;
        add?:number;
        percent?:number;
    }];
    icon:string;
}

export class Trait implements ITrait {
    id:string;
    name:string;
    desc:string;
    genes:[{
        chromosome:number;
        gene:number;
        value:number;
    }];
    requiredTraits?:string[];
    mods:[{
        abilityId: string;
        add?:number;
        percent?:number;
    }];
    icon:string;
    constructor(def:ITrait) {
        this.id=def.id;
        this.name=def.name;
        this.desc=def.desc;
        this.genes = def.genes;
        this.requiredTraits = def.requiredTraits;
        this.mods = def.mods;
        this.icon = def.icon;        
    }
}

export var DEFAULT_TRAITS: ITrait[] = [{
        "id": "B_STING",
        "name": "Big stinger",
        "desc": "A stinger built for defense.",
        "genes": [
            { "chromosome": 0, "gene": 0, "value": 1 }
        ],
        "mods": [
            { "abilityId": "DEF", "add": 5 }
        ],
        "icon": "icon-shield text-success"
    },
    {
        "id":"L_STING",
        "name": "Little stinger",
        "desc": "This below average sized stinger is bad for defense.",
        "genes": [
            { "chromosome": 0, "gene": 0, "value": 0 }
        ],
        "mods": [
            { "abilityId": "DEF", "add": -5 } 
        ],
        "icon": "icon-shield text-danger"
    },
    {
        "id":"RNG_1",
        "name": "Extra Range 1",
        "desc": "Can fly 1 additional cell.",
        "genes": [
            { "chromosome": 1, "gene": 0, "value": 1 }
        ],
        "mods": [
            {"abilityId": "RNG",  "add": 1 }
        ],
        "icon": "fa-arrow-up text-success"
    },
    {
        "id":"VENOM_10_PCT",
        "name": "10% More Venomous",
        "desc": "Extra venom for better defense.",
        "genes": [
            { "chromosome": 2, "gene": 0, "value": 0 }
        ],
        "requiredTraits": ["Big stinger"],
        "mods": [
            { "abilityId": "DEF", "percent": 10 } 
        ],
        "icon": "icon-shield text-success"
    },
    {
        "id":"FLY_10_PCT",
        "name": "Fly 10% Faster",
        "desc": "Little stinger, faster flier.",
        "genes": [
            { "chromosome": 2, "gene": 0, "value": 0 }
        ],
        "requiredTraits": ["Little stinger"],
        "mods": [
            {"abilityId": "SPD_FLY", "percent": -10 }
        ],
        "icon": "fa-bolt text-success"
    }
    
]