/// <reference path="../../node_modules/lz-string/typings/lz-string.d.ts" />
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Hive } from 'app/classes/hive.class';
import * as Bee from './classes/bee.class';
import { IMapState, Map } from 'app/classes/map.class';
import { ConfigService } from 'app/config/config.service';
import { LogService } from 'app/log/log.component';


@Injectable()
export class GameService {
    map: Map;
    saveTime: number;// Used when loading to determine amount of time the elapsed while player was offline.
    lastTime: number;// 
    stepTimeMs: number;
    gameSaveKey: string = "GENETIX_SAVE"
    lastSave: string = "";
    private _elapsedMs = new BehaviorSubject<number>(0);
    private _running = new BehaviorSubject<boolean>(true);
    private _msSinceAutoSave: number = 0;
    private _animationRequest: number;
    gameLoopEvent$ = this._elapsedMs.asObservable();
    stateChangeEvent$ = this._running.asObservable();
    constructor(private _configService: ConfigService, private _logService: LogService) {
        this.initGame();
    }

    initGame() {
        if (this._animationRequest) window.cancelAnimationFrame(this._animationRequest);
        this._logService.clearLog("Welcome to Genetix!");
        var s = localStorage.getItem(this.gameSaveKey)
        var json = LZString.decompressFromBase64(s);
        this.lastSave = s;
        var savedState = json ? JSON.parse(json) : null;
        this.saveTime = savedState && savedState.saveTime || Date.now();
        this.stepTimeMs = savedState && savedState.stepTimeMs || 50;
        this._msSinceAutoSave = 0;
        this._elapsedMs.next(0);
        if (savedState && savedState.map) {
            this.map = new Map(this._configService, this.stepTimeMs, savedState.map);
        } else {
            this.map = new Map(this._configService, this.stepTimeMs, null);
        }
        this.gameLoop(0);

    }

    gameLoop(step) {
        this._animationRequest = null;
        if (this.lastTime == null) this.lastTime = (this.saveTime - Date.now());
        this.saveTime = Date.now();
        var steps = 0;
        while (step - this.lastTime >= (this.stepTimeMs * (steps + 1))) {
            steps++;
        }
        let elapsedMs: number = (this.stepTimeMs * steps);
        this.lastTime += elapsedMs;
        if (this._running.value && steps > 0) {
            this._elapsedMs.next(elapsedMs);
            this.map.handleGameLoop(elapsedMs);
            this._msSinceAutoSave += elapsedMs;
            if (this._msSinceAutoSave >= 30000) {
                this.saveGame();
                this._msSinceAutoSave = 0;
            }

        }
        if (!this._animationRequest)
            this._animationRequest = window.requestAnimationFrame(this.gameLoop.bind(this));

    }

    toggleState() {
        this._running.next(!this._running.value);
    }

    saveGame() {
        var state = {
            saveTime: this.saveTime,
            stepTimeMs: this.stepTimeMs,
            map: this.map.getState()
        };
        console.log(state);
        var save = LZString.compressToBase64(JSON.stringify(state));
        //console.log(save);
        this.lastSave = save;
        localStorage.setItem(this.gameSaveKey, save);
        this._logService.logGeneralMessage("Game saved.");

    }
    hardReset() {
        localStorage.removeItem(this.gameSaveKey);
        this.initGame();
    }
}