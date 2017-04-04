interface IResourceType {
    rid: string;
    name: string;
    desc: string;
    jid: string;
    icon: string;
}


export class Resource implements IResourceType {
    rid: string;
    name: string;
    desc: string;
    jid: string;
    icon: string;
    constructor(resourceType: IResourceType) {
        this.rid = resourceType.rid;
        this.name = resourceType.name;
        this.desc = resourceType.desc;
        this.jid = resourceType.jid;
        this.icon = resourceType.icon;
        
    }
}

export var DEFAULT_RESOURCES: IResourceType[] = [
    {
        rid: "NECTAR",
        name: "Nectar",
        desc: "Used for creating honey.",
        jid: "FORAGER",
        icon: "fa-tint"
    },
    {
        rid: "POLLEN",
        name: "Pollen",
        desc: "Used for food creation.",
        jid: "FORAGER",
        icon: "icon-pollen"
    },
    {
        rid: "WATER",
        name: "Water",
        desc: "Used for food creation and breeding.",
        jid: "FORAGER",
        icon: "icon-water"
    },
    {
        rid: "FOOD",
        name: "Food",
        desc: "Nurishment for the hive.",
        jid: "PRODUCER_FOOD",
        icon: "fa-apple"
    },
    {
        rid: "HONEY",
        name: "Honey",
        desc: "Used for making royal jelly and food and in building.",
        jid: "PRODUCER_HONEY",
        icon: "icon-honeypot"
    },
    {
        rid: "ROYAL_JELLY",
        name: "Royal Jelly",
        desc: "Used for breeding new queens.",
        jid: "NURSE",
        icon: "icon-jar"
    },
    {
        rid: "WAX",
        name: "Wax",
        desc: "Used in honeycomb construction.",
        jid: "BUILDER",
        icon: "icon-tools"
    },
    {
        rid: "DEADBEES",
        name: "Dead bees",
        desc: "Dead bees that take up space, convert them to food.",
        jid: "UNDERTAKER",
        icon: "icon-tombstone"
    },
    {
        rid: "DEFENSE",
        name: "Defense",
        desc: "Hive defensive ability.",
        jid: "GUARD",
        icon: "icon-shield"
    }
]