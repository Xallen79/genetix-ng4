import { AbilityID } from 'app/config/abilities.config';
export interface ITrait {
    id: string;
    name: string;
    desc: string;
    genes: [{
        chromosome: number;
        gene: number;
        value: boolean;
    }];
    requiredTraits?: string[];
    mods: [{
        abilityId: AbilityID;
        add?: number;
        percent?: number;
    }];
    icon: string;
}

export class Trait implements ITrait {
    id: string;
    name: string;
    desc: string;
    genes: [{
        chromosome: number;
        gene: number;
        value: boolean;
    }];
    requiredTraits?: string[];
    mods: [{
        abilityId: AbilityID;
        add?: number;
        percent?: number;
    }];
    icon: string;
    constructor(def: ITrait) {
        this.id = def.id;
        this.name = def.name;
        this.desc = def.desc;
        this.genes = def.genes;
        this.requiredTraits = def.requiredTraits;
        this.mods = def.mods;
        this.icon = def.icon;
    }
}

export let DEFAULT_TRAITS: ITrait[] = [{
    "id": "B_STING",
    "name": "Big stinger",
    "desc": "A stinger built for defense.",
    "genes": [
        { "chromosome": 0, "gene": 0, "value": true }
    ],
    "mods": [
        { "abilityId": "def", "add": 5 }
    ],
    "icon": "icon-shield text-success"
},
{
    "id": "L_STING",
    "name": "Little stinger",
    "desc": "This below average sized stinger is bad for defense.",
    "genes": [
        { "chromosome": 0, "gene": 0, "value": false }
    ],
    "mods": [
        { "abilityId": "def", "add": -5 }
    ],
    "icon": "icon-shield text-danger"
},
{
    "id": "RNG_1",
    "name": "Extra Range 1",
    "desc": "Can fly 1 additional cell.",
    "genes": [
        { "chromosome": 1, "gene": 0, "value": true }
    ],
    "mods": [
        { "abilityId": "rng", "add": 1 }
    ],
    "icon": "fa-arrow-up text-success"
},
{
    "id": "VENOM_10_PCT",
    "name": "10% More Venomous",
    "desc": "Extra venom for better defense.",
    "genes": [
        { "chromosome": 2, "gene": 0, "value": false }
    ],
    "requiredTraits": ["B_STING"],
    "mods": [
        { "abilityId": "def", "percent": 10 }
    ],
    "icon": "icon-shield text-success"
},
{
    "id": "FLY_10_PCT",
    "name": "Fly 10% Faster",
    "desc": "Little stinger, faster flier.",
    "genes": [
        { "chromosome": 2, "gene": 0, "value": false }
    ],
    "requiredTraits": ["L_STING"],
    "mods": [
        { "abilityId": "spd_fly", "percent": -10 }
    ],
    "icon": "fa-bolt text-success"
}

]