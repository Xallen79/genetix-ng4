import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from 'app/game.service';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'bloqhead-game-control',
    template: '<div>' +
    '<button title="Save Game" type="button" class="btn btn-xs btn-primary" (click)="_gameService.saveGame()"><i class="fa fa-floppy-o"></i></button>' +
    '<button title="Hard Reset" type="button" class="btn btn-xs btn-primary" (click)="_gameService.hardReset()"><i class="fa fa-recycle"></i></button>' +
    '<button title="Play/Pause" type="button" class="btn btn-xs btn-primary" (click)="_gameService.toggleState()"><i class="fa" ngClass="{{getIcon()}}"></i></button>' +
    '</div>'

})
export class GameControl implements OnInit {
    RUNNING: boolean;
    stateSub: Subscription;
    constructor(private _gameService: GameService) { }
    ngOnInit() {
        this.stateSub = this._gameService.stateChangeEvent$.subscribe(state => this.RUNNING = state);
    }

    getIcon() {
        return this.RUNNING ? 'fa-pause' : 'fa-play';
    }

    ngOnDestroy() {
        this.stateSub.unsubscribe();
    }

}