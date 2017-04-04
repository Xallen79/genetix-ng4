import { GameComponent } from 'app/game.component';
import { MainGameComponent } from 'app/mainGame/mainGame.component';
import { TestInterfaceComponent } from 'app/testInterface/testInterface.component';

export const gameState = {
    name: 'game',
    redirectTo: 'home',
    component: GameComponent,
};

/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
export const mainState = {
    parent: 'game',
    name: 'main',
    url: '/main',
    component: MainGameComponent,
};

export const testState = {
    parent: 'game',
    name: 'test',
    url: '/test',
    component: TestInterfaceComponent
}

export const APP_STATES = [
    mainState,
    gameState,
    testState
];