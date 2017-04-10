/// <reference path="../../node_modules/lz-string/typings/lz-string.d.ts" />
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Hive } from 'app/classes/hive.class';
import * as Bee from './classes/bee.class';
import { Map } from 'app/classes/map.class';
import { ConfigService } from 'app/config/config.service';


@Injectable()
export class GameService {
    map: Map;
    saveTime: number;
    lastTime: number;
    stepTimeMs: number;
    gameSaveKey: string = "GENETIX_SAVE"
    lastSave: string = "";
    private _elapsedMs = new BehaviorSubject<number>(0);
    private _running = new BehaviorSubject<boolean>(true);
    gameLoopEvent$ = this._elapsedMs.asObservable();
    stateChangeEvent$ = this._running.asObservable();
    constructor(private _configService: ConfigService) {
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

        if (savedState && savedState.map) {
            this.map = new Map(this._configService, this.stepTimeMs, savedState.map);
        } else {
            this.map = new Map(this._configService, this.stepTimeMs, null);
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
            this.map.handleGameLoop(this.stepTimeMs * steps);
        }
        window.requestAnimationFrame(this.gameLoop.bind(this));

    }

    toggleState() {
        this._running.next(!this._running.value);
    }

    saveGame() {
        var state = {
            saveTime: this.saveTime,
            lastTime: this.lastTime,
            stepTimeMs: this.stepTimeMs,
            map: this.map
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