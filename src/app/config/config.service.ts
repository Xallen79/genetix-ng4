import { Injectable } from '@angular/core';
import { ITrait, Trait, DEFAULT_TRAITS } from './traits.config';
import { Building, DEFAULT_BUILDINGS } from './buildingTypes.config';
import { Resource, DEFAULT_RESOURCES, ResourceID } from './resourceTypes.config';

@Injectable()
export class ConfigService {
    private TRAITS: Trait[];
    private BUILDINGS: Building[];
    private RESOURCES: Resource[];
    private checked: string[];

    constructor() {
        this.buildTraits();
        console.log(this.TRAITS);
        this.setDefaultBuildings();
        this.setDefaultResources();
    }
    private getRequiredGenesRecursive(trait: ITrait) {
        if (trait.requiredTraits != null) {
            for (let req of trait.requiredTraits) {
                var reqTrait = DEFAULT_TRAITS.find(t => t.id === req);
                if (this.checked.indexOf(req) === -1)
                    this.getRequiredGenesRecursive(reqTrait);
                for (let g of reqTrait.genes)
                    trait.genes.push(Object.assign({}, g));
            }
        }
        this.checked.push(trait.id);
    }
    private buildTraits(): void {
        this.TRAITS = [];
        this.checked = [];
        for (let t of DEFAULT_TRAITS) {
            this.getRequiredGenesRecursive(t);
            this.TRAITS.push(new Trait(t));
        }

    }
    private setDefaultBuildings(): void {
        this.BUILDINGS = [];
        for (let b of DEFAULT_BUILDINGS) this.BUILDINGS.push(new Building(b));

    }
    private setDefaultResources(): void {
        this.RESOURCES = [];
        for (let r of DEFAULT_RESOURCES) this.RESOURCES.push(new Resource(r));
    }

    getTraits(): Trait[] {
        return Object.assign([], this.TRAITS);
    }

    getDefaultBuildings(): Building[] {
        return Object.assign([], this.BUILDINGS);
    }
    getDefaultResources(): Resource[] {
        return Object.assign([], this.RESOURCES);
    }
    getResourceById(rid: ResourceID) {
        return this.RESOURCES.find(r => r.rid === rid);
    }

}