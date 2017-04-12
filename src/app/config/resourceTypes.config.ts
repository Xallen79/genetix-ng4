export type ResourceID = 'nectar' | 'pollen' | 'water' | 'food' | 'honey' | 'royal_jelly' | 'wax' | 'deadbees' | 'defense';
export const ResourceID = {
    NECTAR: 'nectar' as ResourceID,
    POLLEN: 'pollen' as ResourceID,
    WATER: 'water' as ResourceID,
    FOOD: 'food' as ResourceID,
    HONEY: 'honey' as ResourceID,
    ROYAL_JELLY: 'royal_jelly' as ResourceID,
    WAX: 'wax' as ResourceID,
    DEADBEES: 'deadbees' as ResourceID,
    DEFENSE: 'defense' as ResourceID
}
interface IResourceType {
    rid: ResourceID;
    name: string;
    desc: string;
    jid: string;
    icon: string;
    owned?: number;
    max?: number;
}


export class Resource implements IResourceType {
    rid: ResourceID;
    name: string;
    desc: string;
    jid: string;
    icon: string;
    owned: number;
    max: number;
    constructor(resourceType: IResourceType) {
        this.rid = resourceType.rid;
        this.name = resourceType.name;
        this.desc = resourceType.desc;
        this.jid = resourceType.jid;
        this.icon = resourceType.icon;
        this.owned = resourceType.owned || 0;
        this.max = resourceType.max || 0;

    }
}

export var DEFAULT_RESOURCES: IResourceType[] = [
    {
        rid: ResourceID.NECTAR,
        name: "Nectar",
        desc: "Used for creating honey.",
        jid: "FORAGER",
        icon: "fa-tint"
    },
    {
        rid: ResourceID.POLLEN,
        name: "Pollen",
        desc: "Used for food creation.",
        jid: "FORAGER",
        icon: "icon-pollen"
    },
    {
        rid: ResourceID.WATER,
        name: "Water",
        desc: "Used for food creation and breeding.",
        jid: "FORAGER",
        icon: "icon-water"
    },
    {
        rid: ResourceID.FOOD,
        name: "Food",
        desc: "Nurishment for the hive.",
        jid: "PRODUCER_FOOD",
        icon: "fa-apple"
    },
    {
        rid: ResourceID.HONEY,
        name: "Honey",
        desc: "Used for making royal jelly and food and in building.",
        jid: "PRODUCER_HONEY",
        icon: "icon-honeypot"
    },
    {
        rid: ResourceID.ROYAL_JELLY,
        name: "Royal Jelly",
        desc: "Used for breeding new queens.",
        jid: "NURSE",
        icon: "icon-jar"
    },
    {
        rid: ResourceID.WAX,
        name: "Wax",
        desc: "Used in honeycomb construction.",
        jid: "BUILDER",
        icon: "icon-tools"
    },
    {
        rid: ResourceID.DEADBEES,
        name: "Dead bees",
        desc: "Dead bees that take up space, convert them to food.",
        jid: "UNDERTAKER",
        icon: "icon-tombstone",
        max: -1
    },
    {
        rid: ResourceID.DEFENSE,
        name: "Defense",
        desc: "Hive defensive ability.",
        jid: "GUARD",
        icon: "icon-shield",
        max: -1
    }
]