import { ResourceID } from 'app/config/resourceTypes.config';
export type BuildingUse = 'housing' | 'storage' | 'nursery';
export const BuildingUse = {
    HOUSING: 'housing' as BuildingUse,
    STORAGE: 'storage' as BuildingUse,
    NURSERY: 'nursery' as BuildingUse

};

export type BuildingID = 'dormitory' | 'nursery' | 'storage_nectar' | 'storage_pollen' | 'storage_water' | 'storage_wax' | 'storage_jelly' | 'storage_honey' | 'storage_food';
export const BuildingID = {
    DORMITORY: 'dormitory' as BuildingID,
    NURSERY: 'nursery' as BuildingID,
    STORAGE_NECTAR: 'storage_nectar' as BuildingID,
    STORAGE_POLLEN: 'storage_pollen' as BuildingID,
    STORAGE_WATER: 'storage_water' as BuildingID,
    STORAGE_WAX: 'storage_wax' as BuildingID,
    STORAGE_JELLY: 'storage_jelly' as BuildingID,
    STORAGE_HONEY: 'storage_honey' as BuildingID,
    STORAGE_FOOD: 'storage_food' as BuildingID
}

interface IBuildingType {
    bid: BuildingID;
    name: string;
    description: string;
    use: BuildingUse;
    size: {
        base: number;
        percent: number;
    };
    rid?: ResourceID;/*ResourceType*/
    cost: [{
        rid: ResourceID;/*ResourceType*/
        base: number;
        percent: number;
    }],
    purchased: number;
    gifted: number;
    unlocked: boolean;
    multiplier: number;
}

export class Building implements IBuildingType {
    bid: BuildingID;
    name: string;
    description: string;
    use: BuildingUse;
    size: {
        base: number,
        percent: number
    };
    rid?: ResourceID;/*ResourceType*/
    cost: [{
        rid: ResourceID,/*ResourceType*/
        base: number,
        percent: number
    }];
    purchased: number;
    gifted: number;
    unlocked: boolean;
    multiplier: number;
    constructor(buildingType: IBuildingType) {
        this.bid = buildingType.bid;
        this.name = buildingType.name;
        this.description = buildingType.description;
        this.use = buildingType.use;
        this.size = buildingType.size;
        this.rid = buildingType.rid;
        this.cost = buildingType.cost;
        this.purchased = buildingType.purchased;
        this.gifted = buildingType.gifted;
        this.unlocked = buildingType.unlocked;
        this.multiplier = buildingType.multiplier;
    }
}

export var DEFAULT_BUILDINGS: IBuildingType[] = [
    {
        bid: BuildingID.DORMITORY,
        name: "Dormitory",
        description: "Where the adult bees live.",
        use: BuildingUse.HOUSING,
        size: {
            base: 20,
            percent: 15
        },
        cost: [{
            rid: "wax",
            base: 50,
            percent: 125
        }],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: BuildingID.NURSERY,
        name: "Nursery",
        description: "Where the eggs and larva live.",
        use: BuildingUse.NURSERY,
        size: {
            base: 5,
            percent: 12.5
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: BuildingID.STORAGE_NECTAR,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "nectar",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: BuildingID.STORAGE_POLLEN,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "pollen",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: BuildingID.STORAGE_WATER,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "water",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: BuildingID.STORAGE_FOOD,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "food",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: BuildingID.STORAGE_HONEY,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "honey",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: BuildingID.STORAGE_JELLY,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "royal_jelly",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: BuildingID.STORAGE_WAX,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "wax",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    }

]