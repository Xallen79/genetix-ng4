import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';
@Component({
  selector: 'bloqhead-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.scss']
})
export class PopulationComponent implements OnInit {

  constructor(public _gameService: GameService) { }

  ngOnInit() {
  }

}
