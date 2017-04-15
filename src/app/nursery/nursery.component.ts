import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';
import { AbilityID } from 'app/config/abilities.config';
import * as Bee from 'app/classes/bee.class';

@Component({
  selector: 'bloqhead-nursery-list',
  templateUrl: './nursery.component.html',
  styleUrls: ['./nursery.component.scss']
})
export class NurseryComponent implements OnInit {

  constructor(public _gameService: GameService) { }

  ngOnInit() {

  }

  getQueenElapsedSec(): number {
    return Math.round(this._gameService.map.getCurrentHive().bees.find(b => b.jid === 'breeder').msSinceWork / 1000);

  }

  getQueenBreedTimeSec(): number {
    return Math.round(this._gameService.map.getCurrentHive().bees.find(b => b.jid === 'breeder').getAbility(AbilityID.PRD_EGG).value / 1000);

  }

  canBreed(): boolean {
    return true;
  }

  canFertilize(egg: Bee.Egg): boolean {
    return true;
  }

  assignMe(bee: Bee.BaseBee, action: string) {
    console.log(bee.name + '->' + action);
  }

}
