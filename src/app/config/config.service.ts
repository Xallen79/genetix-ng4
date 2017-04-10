import { Injectable } from '@angular/core';
import { Trait, DEFAULT_TRAITS } from './traits.config';
import { Building, DEFAULT_BUILDINGS } from './buildingTypes.config';
import { Resource, DEFAULT_RESOURCES } from './resourceTypes.config';

@Injectable()
export class ConfigService {
    getDefaultTraits(): Trait[] {
        var traits: Trait[] = [];
        for (let t of DEFAULT_TRAITS) traits.push(new Trait(t));
        return traits;
    }
    getDefaultBuildings(): Building[] {
        var buildings: Building[] = [];
        for (let b of DEFAULT_BUILDINGS) buildings.push(new Building(b));
        return buildings;
    }
    getDefaultResources(): Resource[] {
        var resources: Resource[] = [];
        for (let r of DEFAULT_RESOURCES) resources.push(new Resource(r));
        return resources;
    }

}