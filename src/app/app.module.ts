import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { UIRouterModule, UIView } from "ui-router-ng2";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GameService } from 'app/game.service';
import { ConfigService } from 'app/config/config.service';
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
import { PopulationPanelComponent } from './population-panel/population-panel.component';
import { BloqHeadDraggableDirective, BloqHeadDropTargetDirective } from './drag-drop/drag-drop.directive';
import { DragService } from './drag-drop/drag-service.service';



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
    GoalListComponent,
    PopulationPanelComponent,
    BloqHeadDraggableDirective,
    BloqHeadDropTargetDirective
  ],
  imports: [
    BrowserModule,
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
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
  providers: [GameService, LogService, ConfigService, DragService],
  bootstrap: [UIView]
})
export class AppModule {

  constructor(private injector: Injector) {
    AppInjector = this.injector;

  }
}
export let AppInjector: Injector;
export function randomIntFromInterval(min: number, max: number, func?) {
  if (func == null) func = Math.random;
  return Math.floor(func() * (max - min + 1) + min);
}

export let uuid = {
  new: function (): string {
    function _p8(s?: boolean) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  },
  empty: function () {
    return '00000000-0000-0000-0000-000000000000';
  }
};