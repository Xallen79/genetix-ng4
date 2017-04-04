import {Injectable} from '@angular/core';
import {Trait, DEFAULT_TRAITS} from './traits.config';
import {Building, DEFAULT_BUILDINGS} from './buildingTypes.config';
import {Resource, DEFAULT_RESOURCES} from './resourceTypes.config';

@Injectable()
export class ConfigService {
    getTraits():Trait[] {
        var traits: Trait[];
        for(var t=0;t<DEFAULT_TRAITS.length;t++) {
            traits.push(new Trait(DEFAULT_TRAITS[t]));
        }
        return traits;
    }
    getBuildings():Building[] {
        var buildings: Building[];
        for(var b=0;b<DEFAULT_BUILDINGS.length;b++) {
            buildings.push(new Building(DEFAULT_BUILDINGS[b]));
        }
        return buildings;
    }

}