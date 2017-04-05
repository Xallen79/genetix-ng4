/// <reference path="../../node_modules/lz-string/typings/lz-string.d.ts" />
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Hive } from 'app/classes/hive.class';
import * as Bee from './classes/bee.class';


@Injectable()
export class GameService {
    hives: Hive[];
    saveTime: number;
    lastTime: number;
    stepTimeMs: number
    private _elapsedMs = new BehaviorSubject<number>(0);
    private _running = new BehaviorSubject<boolean>(true);
    gameLoopEvent$ = this._elapsedMs.asObservable();
    stateChangeEvent$ = this._running.asObservable();
    constructor() {
        this.saveTime = Date.now();
        //this.lastTime = this.saveTime - Date.now();
        this.stepTimeMs = 1000;
        this.initGame();
    }

    initGame() {
        this.hives = [];
        var bees = [];
        bees.push(new Bee.Queen({ id: "1-H1" }))
        this.hives.push(new Hive({ id: 1, nextId: 1, bees: bees }));
        var json = JSON.stringify(this.hives[0]);
        var hive2 = JSON.parse(json);
        hive2.id = 2;
        hive2.bees[0].id = "1-H2";
        this.hives.push(new Hive(hive2));
        this.gameLoop(0);
    }

    gameLoop(step) {
        this.saveTime = Date.now();
        if (this.lastTime == null) this.lastTime = this.saveTime - Date.now();
        var steps = 0;
        while (step - this.lastTime >= (this.stepTimeMs * (steps + 1))) {
            steps++;
        }
        this.lastTime += (this.stepTimeMs * steps);
        if (this._running.value && steps > 0) {
            this._elapsedMs.next(this.stepTimeMs * steps);
            this.hives[0].bees[0].msSinceWork += this.stepTimeMs * steps;
        }
        window.requestAnimationFrame(this.gameLoop.bind(this));

    }

    getHives(): Hive[] {
        return this.hives;
    }

    toggleState() {
        this._running.next(!this._running.value);
    }

    saveGame() {
        var state = {
            saveTime: this.saveTime,
            lastTime: this.lastTime,
            stepTimeMs: this.stepTimeMs,
            hives: this.hives
        };
        console.log(LZString.compressToBase64(JSON.stringify(state)));
    }
}