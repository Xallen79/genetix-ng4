import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';
@Component({
    selector: 'bloqhead-resource-list',
    templateUrl: './resource-list.component.html',
    styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

    constructor(public _gameService: GameService) { }

    ngOnInit() {

    }

    dropped(e, jid) {
        var bee = this._gameService.map.currentHive.getBeeById(e.dragData);
        bee.setJob(jid);
    }

    getWorkerCount(jid) {
        return this._gameService.map.currentHive.bees.filter(b => b.jid === jid).length;
    }
}