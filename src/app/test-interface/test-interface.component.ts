import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';


@Component({
    template: `
    <div class="row" style="height: 95vh;">
    <div class="col-xs-12 fullH"> 
        <div class="player-content">
            <div class="log-component">
            <pre>{{_gameService.hives|json}}</pre>            
            </div>            
        </div>
        <textarea style="width:100%; color:black;" rows="5" readonly ngModel={{_gameService.lastSave}}></textarea>
    </div>
    </div>`
})
export class TestInterfaceComponent implements OnInit {

    constructor(private _gameService: GameService) { }

    ngOnInit() { }
}