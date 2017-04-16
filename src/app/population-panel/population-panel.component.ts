import { Component, OnInit, Input } from '@angular/core';
import { GameService } from "app/game.service";
import { BeeTypes } from "app/classes/bee.class";



@Component({
  selector: 'population-panel',
  templateUrl: './population-panel.component.html',
  styleUrls: ['./population-panel.component.scss'],

})
export class PopulationPanelComponent implements OnInit {
  @Input() filter: { type: BeeTypes, traits: any[] }
  constructor(public _gameService: GameService) { }

  ngOnInit() {
  }

}
