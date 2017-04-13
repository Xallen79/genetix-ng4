import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';

@Component({
  selector: 'bloqhead-nursery-list',
  templateUrl: './nursery.component.html',
  styleUrls: ['./nursery.component.scss']
})
export class NurseryComponent implements OnInit {

  constructor(public _gameService: GameService) { }

  ngOnInit() {
  }

}
