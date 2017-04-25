import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Hive } from './classes/hive.class';
import * as Bee from './classes/bee.class';
import { GameService } from './game.service';
import { LogService } from 'app/log/log.component';
import { Subscription } from "rxjs/Subscription";
import { ModalDirective } from "ngx-bootstrap/modal";

interface IOfflineData {
  offlineMs: number;
  offlineString: string;
  processing: boolean;
  processedMs: number;
}

@Component({

  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit, OnInit, OnDestroy {



  title = 'GenetixNg4';
  @ViewChild('progressModal') public progressModal: ModalDirective;
  modalData: IOfflineData = {
    offlineMs: 0,
    offlineString: "",
    processing: false,
    processedMs: 0
  };
  processAwaySub: Subscription;
  processingSub: Subscription;
  modalShownSub: Subscription;
  constructor(public _gameService: GameService, public _logService: LogService, private ngZone: NgZone) {
  }
  ngOnInit() {
    this.processingSub = this._gameService.processingEvent$.subscribe((ms) => {
      this.modalData.processedMs = ms;
      this.modalData.processing = ms > 0;
    });
    this.modalShownSub = this.progressModal.onShown.subscribe(() => {
      this.startProcessing();
    })
  }
  ngAfterViewInit(): void {
    this.processAwaySub = this._gameService.processAwayEvent$.subscribe((process) => {
      if (process) {
        this.showProgress();
      } else {
        this.stopProcessing();
      }
    });

  }
  ngOnDestroy() {
    this.processAwaySub.unsubscribe();
    this.processingSub.unsubscribe();
    this.modalShownSub.unsubscribe();
  }

  showProgress() {
    this.progressModal.show();
    this.modalData.offlineMs = this._gameService.offlineMs;
    this.modalData.offlineString = this.createOfflineString(this.modalData.offlineMs);
  }

  startProcessing() {
    this.ngZone.runOutsideAngular(() => {
      this._gameService.processOfflineTime();
    });
  }

  stopProcessing() {
    this._gameService.offlineMs = 0;
    this.closeProgress();
  }

  closeProgress() {
    this.modalData = {
      offlineMs: 0,
      offlineString: "",
      processing: false,
      processedMs: 0
    };
    this.progressModal.hide();
  }

  private createOfflineString(ms: number): string {
    let s = "You have been away for: ";
    var x = ms / 1000;
    var sec = Math.floor(x % 60);
    x /= 60;
    var minutes = Math.floor(x % 60);
    x /= 60;
    var hours = Math.floor(x % 24);
    x /= 24;
    var days = Math.floor(x);
    s += days ? days + " days, " : "";
    s += hours + " hours, ";
    s += minutes + " minutes, ";
    s += sec + " seconds.";
    return s;
  }
}