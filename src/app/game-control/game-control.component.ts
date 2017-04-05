import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/game.service';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'bloqhead-game-control',
    template: '<div>' +
    '<button title="Save Game" type="button" class="btn btn-xs btn-primary" (click)="_gameService.saveGame();"><i class="fa fa-floppy-o"></i></button>' +
    '<button title="Hard Reset" type="button" class="btn btn-xs btn-primary" ng-click="$ctrl.resetSave();"><i class="fa fa-recycle"></i></button>' +
    '<button title="Play/Pause" type="button" class="btn btn-xs btn-primary" (click)="_gameService.toggleState()"><i class="fa" ngClass="{{getIcon()}}"></i></button>' +
    '</div>'

})
export class GameControl implements OnInit {
    RUNNING: boolean;
    stateSub: Subscription;
    constructor(private _gameService: GameService) { }
    ngOnInit() {
        this.stateSub = this._gameService.stateChangeEvent$.subscribe(state => this.RUNNING = state);
    }

    getIcon() {
        return this.RUNNING ? 'fa-pause' : 'fa-play';
    }

}
// app.component('bloqheadGameControl', {
//     template: '<div>' +
//         '<button title="Save Game" type="button" class="btn btn-xs btn-primary" ng-click="$ctrl.saveGame();"><i class="fa fa-floppy-o"></i></button>' +
//         '<button title="Hard Reset" type="button" class="btn btn-xs btn-primary" ng-click="$ctrl.resetSave();"><i class="fa fa-recycle"></i></button>' +
//         '<button title="Play/Pause" type="button" class="btn btn-xs btn-primary" ng-click="$ctrl.toggleState();"><i class="fa" ng-class="$ctrl.getIcon()"></i></button>' +
//         '</div>',
//     controller: ['$scope', 'gameService', 'gameLoopService', 'gameStates', function($scope, gameService, gameLoopService, gameStates) {
//         var self = this;
//         self.$onInit = function() {
//             self.currentState = gameLoopService.getState().currentState;
//         };
//         self.toggleState = function() {
//             self.currentState = (self.currentState === gameStates.RUNNING ? gameStates.PAUSED : gameStates.RUNNING);
//             gameLoopService.setState(self.currentState);
//         };
//         self.getIcon = function() {
//             return self.currentState === gameStates.RUNNING ? 'fa-pause' : 'fa-play';
//         };
//         self.resetSave = function() {
//             gameService.hardReset();
//         };
//         self.saveGame = function() {
//             gameService.saveGame();
//         };
//     }]
// });