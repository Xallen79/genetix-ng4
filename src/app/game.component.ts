import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hive } from './classes/hive.class';
import * as Bee from './classes/bee.class';
import { GameService } from './game.service';
import { LogService } from 'app/log/log.component';
import { Subscription } from "rxjs/Subscription";

@Component({

  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  title = 'GenetixNg4';
  count: number = 0;
  gameLoopSub: Subscription;
  constructor(private _gameService: GameService, private _logService: LogService) {
  }
  ngOnInit() {
    this.gameLoopSub = this._gameService.gameLoopEvent$.subscribe(elapsedMs => {
      if (elapsedMs === 0) {
        this.count = 0;
        return;
      }
      while (elapsedMs >= 50) {
        this.count++;
        elapsedMs -= 50;
        if (this.count % (1000 / 50 * 10) === 0)
          this._logService.logGeneralMessage("Test");
      }
    });
  }

  ngOnDestroy() {
    this.gameLoopSub.unsubscribe();
  }
}