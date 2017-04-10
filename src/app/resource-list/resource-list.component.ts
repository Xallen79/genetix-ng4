import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';
@Component({
    selector: 'bloqhead-resource-list',
    templateUrl: './resource-list.component.html',
    styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

    constructor(private _gameService: GameService) { }

    ngOnInit() {

    }
}