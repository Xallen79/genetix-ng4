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
    stepTimeMs: number;
    gameSaveKey: string = "GENETIX_SAVE"
    lastSave: string = "";
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
        var s = localStorage.getItem(this.gameSaveKey)
        var json = LZString.decompressFromBase64(s);
        this.lastSave = s;
        var savedState = json ? JSON.parse(json) : null;
        this.saveTime = savedState && savedState.saveTime || Date.now();
        this.lastTime = this.saveTime - Date.now();
        this.stepTimeMs = savedState && savedState.stepTimeMs || 1000;
        this.hives = [];
        if (savedState && savedState.hives) {
            for (let hiveState of savedState.hives) {
                this.hives.push(new Hive(hiveState));
            }
        } else {
            this.hives = [];
            this.addHive("G5");
            this.addHive("G9");
        }
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
    addHive(position: string): Hive {
        var id = this.hives.length + 1;
        var bees = [];
        bees.push(new Bee.Queen({ id: "1-H" + id }));
        for (var i = 0; i < 10; i++) {
            bees.push(new Bee.Drone({ id: i + 2 + "-H" + id }));
        }
        var hive = new Hive({ id: id, nextId: 12, bees: bees, pos: position });
        this.hives.push(hive);
        return hive;
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
        var save = LZString.compressToBase64(JSON.stringify(state));
        console.log(save);
        this.lastSave = save;
        localStorage.setItem(this.gameSaveKey, save);
    }
    hardReset() {
        localStorage.removeItem(this.gameSaveKey);
        this.initGame();
    }
}