import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';

@Component({
  selector: 'bloqhead-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent implements OnInit {

  constructor(public _gameService: GameService) { }

  ngOnInit() {
  }

}
