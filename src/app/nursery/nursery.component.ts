import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';
import { AbilityID } from 'app/config/types.config';
import * as Bee from 'app/classes/bee.class';

@Component({
  selector: 'bloqhead-nursery-list',
  templateUrl: './nursery.component.html',
  styleUrls: ['./nursery.component.scss']
})
export class NurseryComponent implements OnInit {
  BeeTypes = Bee.BeeTypes;
  larvas: Bee.BaseBee[];
  eggs: Bee.BaseBee[];
  constructor(public _gameService: GameService) { }

  ngOnInit() {

  }

  getQueenElapsedSec(): number {
    return Math.round(this._gameService.map.currentHive.bees.find(b => b.jid === 'breeder').msSinceWork / 1000);

  }

  getQueenBreedTimeSec(): number {
    return Math.round(this._gameService.map.currentHive.bees.find(b => b.jid === 'breeder').getAbility(AbilityID.PRD_EGG).value / 1000);

  }

  canBreed(bee: Bee.BaseBee): boolean {
    let hive = this._gameService.map.currentHive;
    return !bee.dead && hive.getPopulationCount() < hive.populationLimit;
  }

  canFertilize(egg: Bee.Egg): boolean {
    return !egg.dead;
  }

  assignBee(bee: Bee.BaseBee, type: Bee.BeeTypes) {
    this._gameService.map.currentHive.assignBee(bee, type);
  }

}
