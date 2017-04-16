import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';
import * as Bee from 'app/classes/bee.class';
@Component({
  selector: 'bloqhead-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.scss']
})
export class PopulationComponent implements OnInit {
  BeeTypes = Bee.BeeTypes;
  constructor(public _gameService: GameService) { }

  ngOnInit() {
  }

}
