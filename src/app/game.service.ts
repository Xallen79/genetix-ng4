import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Hive } from 'app/classes/hive.class';
import * as Bee from './classes/bee.class';
import { IMapState, Map } from 'app/classes/map.class';
import { ConfigService } from 'app/config/config.service';
import { LogService } from 'app/log/log.component';
import { ResourceID } from "app/config/resourceTypes.config";
import * as LZString from 'lz-string'


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
    animationEvent$ = this._elapsedMs.asObservable();
    stateChangeEvent$ = this._running.asObservable();
    constructor(private _configService: ConfigService, private _logService: LogService) {
        this.initGame();
    }

    initGame() {
        var now = Date.now();
        if (this._animationRequest) window.cancelAnimationFrame(this._animationRequest);
        this._logService.clearLog("Welcome to Genetix!");
        var s = localStorage.getItem(this.gameSaveKey)
        var json = LZString.decompressFromBase64(s);
        this.lastSave = s;
        var savedState = json ? JSON.parse(json) : null;
        this.saveTime = savedState && savedState.saveTime || now;
        this.lastTime = null;
        this.map = null;
        this.stepTimeMs = savedState && savedState.stepTimeMs || 500;
        if (savedState && savedState.map) {
            this.map = new Map(this.stepTimeMs, savedState.map);
        } else {
            this.map = new Map(this.stepTimeMs, null);
        }
        this._msSinceAutoSave = 0;
        this._elapsedMs.next(0);
        this._animationRequest = window.requestAnimationFrame(this.gameLoop.bind(this));

    }

    gameLoop(runningTime) {
        var now = Date.now();
        var diff = now - this.saveTime;
        this.saveTime = now;
        this._animationRequest = null;
        if (this.lastTime == null) this.lastTime = runningTime;
        var steps = 0;
        while (runningTime - this.lastTime >= (this.stepTimeMs * (steps + 1))) {
            steps++;

        }
        let elapsedMs: number = (this.stepTimeMs * steps);
        this.lastTime += elapsedMs;
        if (this._running.value && steps > 0) {
            this.map.handleGameLoop(elapsedMs);
            this._msSinceAutoSave += elapsedMs;
            if (this._msSinceAutoSave >= 30000) {
                this.saveGame();
                this._msSinceAutoSave = 0;
            }

        }
        // do animations every loop, after any game object updates have occurred.
        this._elapsedMs.next(diff);
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

    getResourceType(rid: ResourceID) {
        return this._configService.getResourceById(rid);
    }
}