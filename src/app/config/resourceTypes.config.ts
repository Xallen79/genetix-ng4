import { JobID, ResourceID, IResourceType } from 'app/config/types.config';



export class Resource implements IResourceType {
    rid: ResourceID;
    name: string;
    desc: string;
    jid: JobID;
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
        jid: JobID.FORAGER,
        icon: "fa-tint"
    },
    {
        rid: ResourceID.POLLEN,
        name: "Pollen",
        desc: "Used for food creation.",
        jid: JobID.FORAGER,
        icon: "icon-pollen"
    },
    {
        rid: ResourceID.WATER,
        name: "Water",
        desc: "Used for food creation and breeding.",
        jid: JobID.FORAGER,
        icon: "icon-water"
    },
    {
        rid: ResourceID.FOOD,
        name: "Food",
        desc: "Nurishment for the hive.",
        jid: JobID.PRODUCER_FOOD,
        icon: "fa-apple"
    },
    {
        rid: ResourceID.HONEY,
        name: "Honey",
        desc: "Used for making royal jelly and food and in building.",
        jid: JobID.PRODUCER_HONEY,
        icon: "icon-honeypot"
    },
    {
        rid: ResourceID.ROYAL_JELLY,
        name: "Royal Jelly",
        desc: "Used for breeding new queens.",
        jid: JobID.NURSE,
        icon: "icon-jar"
    },
    {
        rid: ResourceID.WAX,
        name: "Wax",
        desc: "Used in honeycomb construction.",
        jid: JobID.BUILDER,
        icon: "icon-tools"
    },
    {
        rid: ResourceID.DEADBEES,
        name: "Dead bees",
        desc: "Dead bees that take up space, convert them to food.",
        jid: JobID.UNDERTAKER,
        icon: "icon-tombstone",
        max: -1
    },
    {
        rid: ResourceID.DEFENSE,
        name: "Defense",
        desc: "Hive defensive ability.",
        jid: JobID.GUARD,
        icon: "icon-shield",
        max: -1
    }
]