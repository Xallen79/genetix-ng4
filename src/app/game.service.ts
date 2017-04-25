import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Hive } from 'app/classes/hive.class';
import * as Bee from './classes/bee.class';
import { IMapState, Map } from 'app/classes/map.class';
import { ConfigService } from 'app/config/config.service';
import { LogService } from 'app/log/log.component';
import { ResourceID } from "app/config/types.config";
import * as LZString from 'lz-string'


@Injectable()
export class GameService {
    map: Map;
    saveTime: number;// Used when loading to determine amount of time the elapsed while player was offline.
    lastTime: number;// 
    stepTimeMs: number;
    gameSaveKey: string = "GENETIX_SAVE"
    lastSave: string = "";
    offlineMs: number = 0;
    private _elapsedMs = new BehaviorSubject<number>(0);
    private _running = new BehaviorSubject<boolean>(true);
    private _processAwayTime = new BehaviorSubject<boolean>(false);
    private _processedAwayMs = new BehaviorSubject<number>(0);
    private _msSinceAutoSave: number = 0;
    private _animationRequest: number;
    private _maxAwayMs: number = 600000;

    animationEvent$ = this._elapsedMs.asObservable();
    stateChangeEvent$ = this._running.asObservable();
    processAwayEvent$ = this._processAwayTime.asObservable();
    processingEvent$ = this._processedAwayMs.asObservable();

    constructor(private _configService: ConfigService, private _logService: LogService, private ngZone: NgZone) {
        this.initGame();
    }

    initGame() {
        var now = Date.now();
        if (this._animationRequest) window.cancelAnimationFrame(this._animationRequest);
        this._logService.clearLog("Welcome to Genetix!");
        var s = localStorage.getItem(this.gameSaveKey);
        var json = LZString.decompressFromBase64(s);
        this.lastSave = s;
        var savedState = json ? JSON.parse(json) : null;
        this.saveTime = savedState && savedState.saveTime || now;
        this.lastTime = null;
        this.map = null;
        this.stepTimeMs = savedState && savedState.stepTimeMs || 66;
        if (savedState && savedState.map) {
            this.map = new Map(this.stepTimeMs, savedState.map);
        } else {
            this.map = new Map(this.stepTimeMs, null);
        }
        this._msSinceAutoSave = 0;
        this._elapsedMs.next(0);
        this.offlineMs = now - this.saveTime;// + this._maxAwayMs * 144;//test 24 hours offline
        if (this.offlineMs >= this.stepTimeMs) {
            if (this.offlineMs >= this._maxAwayMs) {
                this._processAwayTime.next(true);
            } else {
                this.map.handleGameLoop(this.offlineMs);
                this.offlineMs = 0;
            }
        }
        this._animationRequest = window.requestAnimationFrame(this.gameLoop.bind(this));

    }

    gameLoop(runningTime) {

        this._animationRequest = null;
        if (!this._processAwayTime.value) {
            var now = Date.now();
            var diff = now - this.saveTime;
            this.saveTime = now;

            if (this.lastTime == null) this.lastTime = runningTime;
            var steps = Math.floor((runningTime - this.lastTime) / this.stepTimeMs);

            let elapsedMs: number = (this.stepTimeMs * steps);
            this.lastTime += elapsedMs;
            if (elapsedMs >= this._maxAwayMs) {
                this.offlineMs = elapsedMs;
                this._processAwayTime.next(true);
                this.lastTime = 0;
                return;
            } else {
                if (this._running.value && steps > 0) {
                    this.map.handleGameLoop(elapsedMs);
                    this._msSinceAutoSave += elapsedMs;
                    if (this._msSinceAutoSave >= 30000) {
                        this.saveGame();
                    }

                }
            }
            if (!this._animationRequest)
                this._animationRequest = window.requestAnimationFrame(this.gameLoop.bind(this));
        }
        // do animations every loop, after any game object updates have occurred.
        this._elapsedMs.next(diff);


    }

    processOfflineTime() {
        this._animationRequest = null;
        if (this._processAwayTime && this._processedAwayMs.value <= this.offlineMs) {
            this._logService.enabled = false;
            var nextTime = this._processedAwayMs.value + this._maxAwayMs;
            var procTime = this._maxAwayMs;
            if (nextTime > this.offlineMs) {
                procTime = nextTime - this.offlineMs;
                nextTime = this.offlineMs;
                this._processAwayTime.next(false);
            }
            if (this.lastTime % 4 === 0) {
                this.ngZone.run(() => {
                    this._processedAwayMs.next(nextTime);
                });
            }
            else this._processedAwayMs.next(nextTime);
            this.map.handleGameLoop(procTime);
            this.lastTime++;
            if (!this._animationRequest)
                this._animationRequest = window.requestAnimationFrame(this.processOfflineTime.bind(this));
        } else {
            this.lastTime = null;
            this._processAwayTime.next(false);
            this._processedAwayMs.next(0);
            this._logService.enabled = true;
            this.saveGame();
            if (!this._animationRequest)
                this.ngZone.run(() => {
                    this._animationRequest = window.requestAnimationFrame(this.gameLoop.bind(this));
                });

        }
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
        this._msSinceAutoSave = 0;
        var save = LZString.compressToBase64(JSON.stringify(state));
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