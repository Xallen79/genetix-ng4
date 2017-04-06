import { randomIntFromInterval } from 'app/app.module';
interface IGenomeState {
    chromosomeCount: number;
    hasPairs: boolean;
    chromosomes: [IChromosome[]];
    mutationChance?: number;

}
interface IGenome extends IGenomeState {
    loadChromosomes(c: [IChromosome[]]): void;
    getGene(cIndex: number, gIndex: number): boolean;
    fertilize(mate: IGenome): IGenome;
    getEggGenome(): IGenome;
}

interface IChromosome extends IChromosomeState {
    toBitString(): string;
    getGene(index: number): boolean;
    doMutation(): void;
}
interface IChromosomeState {
    geneCount: number;
    mutationChance: number;
    mutationString: string;
    genes: number;
}

export class Genome implements IGenome {
    chromosomes: [IChromosome[]];
    chromosomeCount: number;
    hasPairs: boolean;
    mutationChance: number;

    constructor(state?: IGenomeState, hasPairsOverride?: boolean) {
        this.chromosomeCount = state && state.chromosomeCount || 10;
        this.hasPairs = state && state.hasPairs || hasPairsOverride || false;
        this.mutationChance = state && state.mutationChance || 0.005;
        this.loadChromosomes(state && state.chromosomes || null);

    }

    loadChromosomes(chromos: [IChromosome[]]) {
        this.chromosomes = [[]];
        if (chromos != null) {
            var pairIndex: number = 0;
            for (let pair of chromos) {
                if (this.chromosomes.length - 1 < pairIndex) this.chromosomes.push([]);
                for (let c of pair) {
                    this.chromosomes[pairIndex].push(new Chromosome(c));
                }
                pairIndex++;
            }
        } else {
            var count = this.hasPairs ? 2 : 1;
            for (var i = 0; i < count; i++) {
                if (this.chromosomes.length - 1 < i) this.chromosomes.push([]);
                for (var c = 0; c < this.chromosomeCount; c++) {
                    var a = new Chromosome();
                    a.mutationChance = this.mutationChance;
                    this.chromosomes[i].push(a);
                }
            }
        }
    }

    getGene(cIndex: number, gIndex: number): boolean {
        var v: boolean = this.chromosomes[0][cIndex].getGene(gIndex);
        if (this.hasPairs)
            v = (v || this.chromosomes[1][cIndex].getGene(gIndex));

        return v;

    }
    fertilize(mate: IGenome): IGenome {
        var offspring: Genome;
        var chromosomes: [IChromosomeState[]];
        if (!this.hasPairs || !mate.hasPairs)
            throw new Error("Cannot mate genomes with chromosome pairs.");

        chromosomes[0] = Object.assign({}, this.chromosomes[0]);
        chromosomes[1] = Object.assign({}, mate.chromosomes[0]);


        return offspring;
    }
    getEggGenome(): IGenome {
        var chromosomes: [IChromosome[]];
        for (var i = 0; i < this.chromosomeCount; i++) {
            var p = randomIntFromInterval(0, 1);
            var c = this.chromosomes[p][i];
            chromosomes[0].push(Object.assign({}, c));
        }

        return new Genome({
            hasPairs: false,
            chromosomeCount: this.chromosomeCount,
            chromosomes: chromosomes,
            mutationChance: this.mutationChance
        });

    }

}

export var geneMask: number[] = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
class Chromosome implements IChromosome {
    geneCount: number;
    mutationChance: number;
    mutationString: string;
    genes: number;



    constructor(state?: IChromosomeState) {
        this.geneCount = state && state.geneCount || 10;
        this.mutationChance = state && state.mutationChance || 0.005;
        this.genes = (state && state.genes != null) ? state.genes : randomIntFromInterval(0, Math.pow(2, this.geneCount));

        if (geneMask.length < this.geneCount) {
            for (var i = geneMask.length; i < this.geneCount; i++) {
                geneMask.push(Math.pow(2, i));
            }
        }
    }
    toBitString(): string {
        return this.genes.toString(2);
    }
    getGene(index: number): boolean {
        return (this.genes & geneMask[index]) === 1;
    }
    doMutation(): void {
        this.mutationString = "";
        for (var i = 0; i < this.geneCount; i++) {
            if (Math.random() < this.mutationChance) this.mutationString += '1';
            else this.mutationString += '0';
        }
        this.genes ^= parseInt(this.mutationString, 2);
    }
}