import * as Bee from './bee.class';
interface IMapResourceState {
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
    beeids?: number[];
}

interface IMapResource extends IMapResourceState {
    bees: Bee.BaseBee[];
    name: string;
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
    beeids: number[];
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

    queueHarvest(bee: Bee.BaseBee): void {
        throw new Error('Method not implemented.');
    }
    processElapsedTime(ms: number): void {
        throw new Error('Method not implemented.');
    }
    doneHarvesting(): void {
        throw new Error('Method not implemented.');
    }
    getAvailable(rid: string): number {
        throw new Error('Method not implemented.');
    }
    collect(rid: string, amount: number): number {
        throw new Error('Method not implemented.');
    }

}