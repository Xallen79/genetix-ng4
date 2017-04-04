
export type BuildingUse = "housing" | "storage" | "nursery"
export const BuildingUse = {
    HOUSING: 'housing' as BuildingUse,
    STORAGE: 'storage' as BuildingUse,
    NURSERY: 'nursery' as BuildingUse

};


interface IBuildingType {
    id: string;
    name: string;
    description: string;
    use: BuildingUse;
    size: {
        base: number;
        percent: number;
    };
    rid?: string;/*ResourceType*/
    cost: [{
        rid: string;/*ResourceType*/
        base: number;
        percent: number;
    }],
    purchased: number;
    gifted: number;
    unlocked: boolean;
    multiplier: number;
}

export class Building implements IBuildingType {
    id: string;
    name: string;
    description: string;
    use: BuildingUse;
    size: {
        base: number,
        percent: number
    };
    rid?: string;/*ResourceType*/
    cost: [{
        rid: string,/*ResourceType*/
        base: number,
        percent: number
    }];
    purchased: number;
    gifted: number;
    unlocked: boolean;
    multiplier: number;
    constructor(buildingType: IBuildingType) {
        this.id = buildingType.id;
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
        id: "DORMITORY",
        name: "Dormitory",
        description: "Where the adult bees live.",
        use: BuildingUse.HOUSING,
        size: {
            base: 20,
            percent: 15
        },
        cost: [{
            rid: "WAX",
            base: 50,
            percent: 125
        }],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        id: "NURSERY",
        name: "Nursery",
        description: "Where the eggs and larva live.",
        use: BuildingUse.NURSERY,
        size: {
            base: 5,
            percent: 12.5
        },
        cost: [
            {
                rid: "WAX",
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
    id: "STORAGE_NECTAR",
    name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "NECTAR",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "WAX",
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
    id: "STORAGE_POLLEN",
    name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "POLLEN",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "WAX",
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
    id: "STORAGE_WATER",
    name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "WATER",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "WAX",
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
    id: "STORAGE_FOOD",
    name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "FOOD",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "WAX",
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
    id: "STORAGE_HONEY",
    name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "HONEY",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "WAX",
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
    id: "STORAGE_JELLY",
    name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "JELLY",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "WAX",
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
    id: "STORAGE_WAX",
    name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "WAX",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "WAX",
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