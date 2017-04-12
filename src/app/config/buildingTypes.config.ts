import { ResourceID, DEFAULT_RESOURCES, Resource } from 'app/config/resourceTypes.config';
import { sprintf } from 'sprintf-js';
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

interface INextCost {
    rid: ResourceID;
    resourceName: string;
    amount: number;
};

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
    canBuild: boolean;
    private _nextCost: INextCost[];
    private _calcLevel: number = -1;
    private _size: number;
    private _sizeChanged: boolean = true;
    constructor(buildingType: IBuildingType) {
        var resource = DEFAULT_RESOURCES.find(r => r.rid === buildingType.rid);
        let obj: any = {};
        if (resource) obj.resource = resource.name;
        this.bid = buildingType.bid;
        this.name = sprintf(buildingType.name, obj);
        this.description = sprintf(buildingType.description, obj);
        this.use = buildingType.use;
        this.size = buildingType.size;
        this.rid = buildingType.rid;
        this.cost = buildingType.cost;
        this.purchased = buildingType.purchased;
        this.gifted = buildingType.gifted;
        this.unlocked = buildingType.unlocked;
        this.multiplier = buildingType.multiplier;

        this.canBuild = false;
        this.getNextCost();
    }

    setCanBuild(resources: Resource[]): boolean {

        for (let cost of this.getNextCost()) {
            let r: Resource = resources.find(r => r.rid === cost.rid);
            if (!r || r.owned < cost.amount) {

                this.canBuild = false;
                return false;
            }
        }
        this.canBuild = true;
        return true;

    }
    getNextCost(): INextCost[] {
        if (this._calcLevel !== this.purchased) {
            this._nextCost = [];
            for (let c of this.cost) {
                let r = DEFAULT_RESOURCES.find(r => r.rid === c.rid);
                let nextAmount: number = Math.ceil(c.base * Math.pow(1 + (c.percent / 100), this.purchased));
                this._nextCost.push({ rid: c.rid, resourceName: r.name, amount: nextAmount });
            }
            this._calcLevel = this.purchased;
        }
        return this._nextCost;
    }
    getSize(): number {
        if (this._sizeChanged) {
            if (this.gifted + this.purchased > 0)
                this._size = Math.floor(this.size.base * Math.pow(1 + (this.size.percent / 100), (this.gifted + this.purchased - 1)));
            else
                this._size = 0;
            this._sizeChanged = false;
        }
        return this._size;
    }
    build(gifted?: boolean) {
        if (gifted) this.gifted++;
        else this.purchased++;
        this._sizeChanged = true;
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