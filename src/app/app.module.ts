import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule, UIView } from "ui-router-ng2";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GameService } from 'app/game.service';
import { GameComponent } from './game.component';
import { GameControl } from 'gameControl/gameControl.component';
import { MainGameComponent } from 'app/mainGame/mainGame.component';
import { LogService, LogComponent } from 'app/logComponent/log.component';
import { ResourceComponent } from 'app/mainGame/resources.component';
import { TestInterfaceComponent } from 'app/testInterface/testInterface.component';
import { APP_STATES } from 'app/app.states';
import { routerConfigFn } from 'app/router.config';



@NgModule({
  declarations: [
    GameComponent,
    GameControl,
    LogComponent,
    MainGameComponent,
    TestInterfaceComponent,
    ResourceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: true,
      otherwise: { state: 'game' },
      config: routerConfigFn,
    }),
  ],
  providers: [GameService, LogService],
  bootstrap: [UIView]
})
export class AppModule { }
