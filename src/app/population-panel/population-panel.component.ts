import { Component, OnInit, Input } from '@angular/core';
import { GameService } from "app/game.service";
import { BeeTypes, BaseBee } from "app/classes/bee.class";
import { JobID } from 'app/config/types.config';
import { JOB_TYPES } from 'app/config/jobTypes.config';



@Component({
  selector: 'population-panel',
  templateUrl: './population-panel.component.html',
  styleUrls: ['./population-panel.component.scss'],

})
export class PopulationPanelComponent implements OnInit {
  @Input() filter: { type: BeeTypes, traits: any[] }
  jids: Map<BeeTypes, JobID[]> = new Map<BeeTypes, JobID[]>();
  constructor(public _gameService: GameService) { }

  ngOnInit() {
    let bt = BeeTypes.DRONE;
    this.addJids(bt);
    bt = BeeTypes.WORKER;
    this.addJids(bt);
    bt = BeeTypes.QUEEN;
    this.addJids(bt);


  }

  addJids(bt: BeeTypes) {

    this.jids[bt] = [];
    for (let job of JOB_TYPES) {
      if (job.beetypes.indexOf(bt) !== -1)
        this.jids[bt].push(job.jid);
    }
  }

}
