import { Component } from '@angular/core';
import { GameService } from 'app/game.service';
;

@Component({
    templateUrl: './mainGame.component.html'

})
export class MainGameComponent {
    /**
     *
     */
    constructor(private _gameService: GameService) {

    }
}