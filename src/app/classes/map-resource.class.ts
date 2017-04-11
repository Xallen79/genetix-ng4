import * as Bee from './bee.class';
export interface IMapResourceState {
    id: number;
    level?: number;
    pos: string;
    dt?: number;
    color: string;
    image?: string;
    cooldown: number;
    cooldownRemaining?: number;
    pollen?: number;
    col_pollen?: number;
    nectar?: number;
    col_nectar?: number;
    water?: number;
    col_water?: number;
    harvestMultiplier?: number;
    beeIsHarvesting?: boolean;
    resourceName: string;
    beeids?: string[];
}

interface IMapResource extends IMapResourceState {
    bees: Bee.BaseBee[];
    name: string;
    getState(): IMapResourceState;
    queueHarvest(bee: Bee.BaseBee): void;
    processElapsedTime(ms: number): void;
    doneHarvesting(): void;
    getAvailable(rid: string): number;
    collect(rid: string, amount: number): number;

}

export class MapResource implements IMapResource {
    id: number;
    level: number;
    pos: string;
    dt: number;
    color: string;
    image: string;
    cooldown: number;
    cooldownRemaining: number;
    pollen: number;
    col_pollen: number;
    nectar: number;
    col_nectar: number;
    water: number;
    col_water: number;
    harvestMultiplier: number;
    beeIsHarvesting: boolean;
    resourceName: string;
    beeids: string[];
    bees: Bee.BaseBee[];
    name: string;

    constructor(state?: IMapResourceState) {
        this.id = state && state.id || 0;
        this.level = state && state.level || 1;
        this.pos = state && state.pos || 'A1';
        this.dt = state && state.dt || new Date().getTime();
        this.color = state && state.color || 'green';
        this.image = state && state.image || 'bee.svg';
        this.cooldown = state && state.cooldown || 5000;
        this.cooldownRemaining = state && state.cooldownRemaining || 0;
        this.pollen = state && state.pollen || 0;
        this.col_pollen = state && state.col_pollen || 0;
        this.nectar = state && state.nectar || 0;
        this.col_nectar = state && state.col_nectar || 0;
        this.water = state && state.water || 0;
        this.col_water = state && state.col_water || 0;
        this.harvestMultiplier = state && state.harvestMultiplier || 1.0;
        this.resourceName = state && state.resourceName || '??';
        this.beeids = state && state.beeids || [];
        this.bees = [];

        this.name = this.resourceName + " #" + this.id;
    }
    getState(): IMapResourceState {
        return {
            id: this.id,
            level: this.level,
            pos: this.pos,
            dt: this.dt,
            color: this.color,
            image: this.image,
            cooldown: this.cooldown,
            cooldownRemaining: this.cooldownRemaining,
            pollen: this.pollen,
            col_pollen: this.col_pollen,
            nectar: this.nectar,
            col_nectar: this.col_nectar,
            water: this.water,
            col_water: this.col_water,
            harvestMultiplier: this.harvestMultiplier,
            beeIsHarvesting: this.beeIsHarvesting,
            resourceName: this.resourceName,
            beeids: this.beeids
        };
    }
    queueHarvest(bee: Bee.BaseBee): void {
        //logService.logWorkMessage(bee.name + ' reached ' + this.name);
        bee.waitingAtResource = true;
        // add the bee to the collection queue
        this.bees.push(bee);
    }
    processElapsedTime(ms: number): void {
        if (this.cooldownRemaining > 0) {
            this.cooldownRemaining -= ms;
        }
        // if the cooldown has elapsed and there is a bee waiting and no bees are currently harvesting
        if (this.cooldownRemaining <= 0 && this.bees.length > 0 && this.beeIsHarvesting === false) {
            this.beeIsHarvesting = true;
            var bee = this.bees.shift();
            bee.waitingAtResource = false;
            bee.harvesting = true;
        }
    }
    doneHarvesting(): void {
        this.cooldownRemaining = this.cooldown;
        this.beeIsHarvesting = false;
        this.col_nectar = 0;
        this.col_pollen = 0;
        this.col_water = 0;
    }
    getAvailable(rid: string): number {
        var avail = 0;
        switch (rid) {
            case "NECTAR":
                avail = this.nectar - this.col_nectar;
                break;
            case "POLLEN":
                avail = this.pollen - this.col_pollen;
                break;
            case "WATER":
                avail = this.water - this.col_water;
                break;
        }
        return avail;
    }
    collect(rid: string, amount: number): number {
        var harvestAmount = 0;
        var avail = 0;
        switch (rid) {
            case "NECTAR":
                avail = this.getAvailable(rid);
                if (amount <= avail)
                    harvestAmount = amount;
                else if (avail > 0)
                    harvestAmount = avail;
                this.col_nectar += harvestAmount;

                break;
            case "POLLEN":
                avail = this.getAvailable(rid);
                if (amount <= avail)
                    harvestAmount = amount;
                else if (avail > 0)
                    harvestAmount = avail;
                this.col_pollen += harvestAmount;
                break;
            case "WATER":
                avail = this.getAvailable(rid);
                if (amount <= avail)
                    harvestAmount = amount;
                else if (avail > 0)
                    harvestAmount = avail;
                this.col_water += harvestAmount;
                break;
        }
        return harvestAmount;
    }

}