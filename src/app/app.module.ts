import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UIRouterModule, UIView } from "ui-router-ng2";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GameService } from 'app/game.service';
import { GameComponent } from './game.component';
import { GameControl } from './game-control/game-control.component';
import { MainGameComponent } from 'app/main-game/main-game.component';
import { LogService, LogComponent } from 'app/log/log.component';
import { TestInterfaceComponent } from 'app/test-interface/test-interface.component';
import { APP_STATES } from 'app/app.states';
import { routerConfigFn } from 'app/router.config';
import { NurseryComponent } from './nursery/nursery.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { BuildingListComponent } from './building-list/building-list.component';
import { MapComponent } from './map/map.component';
import { PopulationComponent } from './population/population.component';
import { GoalListComponent } from './goal-list/goal-list.component';



@NgModule({
  declarations: [
    GameComponent,
    GameControl,
    LogComponent,
    MainGameComponent,
    TestInterfaceComponent,
    ResourceListComponent,
    NurseryComponent,
    BuildingListComponent,
    MapComponent,
    PopulationComponent,
    GoalListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: true,
      otherwise: { state: 'main' },
      config: routerConfigFn,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GameService, LogService],
  bootstrap: [UIView]
})
export class AppModule { }

export function randomIntFromInterval(min: number, max: number, func?) {
  if (func == null) func = Math.random;
  return Math.floor(func() * (max - min + 1) + min);
}