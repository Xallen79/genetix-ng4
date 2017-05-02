import { Injectable } from '@angular/core';
import { ITrait, Trait, DEFAULT_TRAITS } from './traits.config';
import { Building, DEFAULT_BUILDINGS } from './buildingTypes.config';
import { Resource, DEFAULT_RESOURCES } from './resourceTypes.config';
import { Genome } from 'app/classes/genome.class';
import { Ability, DEFAULT_ABILITIES } from "app/config/abilities.config";
import { ResourceID, JobID, INextCost } from './types.config';
import { JOB_TYPES, JobAction } from "app/config/jobTypes.config";

@Injectable()
export class ConfigService {
    private TRAITS: Trait[];
    private baseResourceRequirements: { [jid: string]: any }

    private checked: string[];

    constructor() {
        this.buildTraits();
        this.buildResourceRequirements();
        console.log(this.TRAITS);

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

    getTraits(genome: Genome): Trait[] {
        let ret: Trait[] = [];
        for (let trait of this.TRAITS) {
            let met: boolean = true;
            for (let gene of trait.genes) {
                let on: boolean = genome.getGene(gene.chromosome, gene.gene);
                if (on !== gene.value)
                    met = false;
            }

            if (met) {
                ret.push(Object.assign({}, trait));
            }
        }

        return ret;
    }
    getAbilities(traits: Trait[]): Ability[] {
        let ret: Ability[] = DEFAULT_ABILITIES.map(function (a) { return new Ability(a); });

        let modifiers = ret.reduce(function (total, current) {
            return total[current.abilityId] = {
                add: 0,
                percent: 0
            }, total;
        }, {});

        for (let trait of traits) {
            for (let mod of trait.mods) {
                modifiers[mod.abilityId].add += mod.add || 0;
                modifiers[mod.abilityId].percent += mod.percent && (mod.percent / 100) || 0;
            }
        }

        for (let m in modifiers) {
            let a = ret.find(r => r.abilityId === m);
            a.value = a.baseValue;
            a.value += modifiers[m].add;
            a.value *= (1 + modifiers[m].percent);
        }

        return ret;
    }
    getDefaultBuildings(): Building[] {
        return DEFAULT_BUILDINGS.map(function (b) { return new Building(b); });
    }
    getDefaultResources(): Resource[] {
        return DEFAULT_RESOURCES.map(function (r) { return new Resource(r); });
    }
    getResourceById(rid: ResourceID) {
        return DEFAULT_RESOURCES.find(r => r.rid === rid);
    }
    buildResourceRequirements(): any {
        this.baseResourceRequirements = JOB_TYPES.reduce(function (map, job) {
            let costs: any = [];
            let data: any = {};
            let action = job.actions.find(a => a.action === JobAction.PRODUCE);
            if (action && action.cost) {
                for (let costAbility of action.cost) {
                    let ability = DEFAULT_ABILITIES.find(a => a.abilityId === costAbility);
                    costs.push({ resource: DEFAULT_RESOURCES.find(r => r.rid === ability.c_rid), amount: ability.baseValue });
                }
                let yieldAbility = DEFAULT_ABILITIES.find(a => a.abilityId === action.yield);
                data.y_resource = DEFAULT_RESOURCES.find(r => r.rid === yieldAbility.rid);
                data.y_amount = yieldAbility.baseValue;
                data.costs = costs;

                map[job.jid] = data;

            }
            else
                map[job.jid] = {};

            return map;
        }, {});
    }
    getResourceCost(jid: JobID): any {
        return this.baseResourceRequirements[jid];
    }

}