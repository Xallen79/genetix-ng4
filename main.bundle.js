webpackJsonp([1,5],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_config_resourceTypes_config__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sprintf_js__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sprintf_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sprintf_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__ = __webpack_require__(18);
/* unused harmony export BuildingUse */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Building; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_BUILDINGS; });



var BuildingUse = {
    HOUSING: 'housing',
    STORAGE: 'storage',
    NURSERY: 'nursery'
};
;
var Building = (function () {
    function Building(buildingType) {
        this._calcLevel = -1;
        this._sizeChanged = true;
        var resource = __WEBPACK_IMPORTED_MODULE_0_app_config_resourceTypes_config__["a" /* DEFAULT_RESOURCES */].find(function (r) { return r.rid === buildingType.rid; });
        var obj = {};
        if (resource)
            obj.resource = resource.name;
        this.bid = buildingType.bid;
        this.name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_sprintf_js__["sprintf"])(buildingType.name, obj);
        this.description = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_sprintf_js__["sprintf"])(buildingType.description, obj);
        this.use = buildingType.use;
        this.size = buildingType.size;
        this.rid = buildingType.rid;
        this.cost = buildingType.cost;
        this.purchased = buildingType.purchased;
        this.gifted = buildingType.gifted;
        this.unlocked = buildingType.unlocked;
        this.multiplier = buildingType.multiplier;
        this.canBuild = false;
        this.getNextCost();
    }
    Building.prototype.setCanBuild = function (resources) {
        var _loop_1 = function (cost) {
            var r = resources.find(function (r) { return r.rid === cost.resource.rid; });
            if (!r || r.owned < cost.amount) {
                this_1.canBuild = false;
                return { value: false };
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.getNextCost(); _i < _a.length; _i++) {
            var cost = _a[_i];
            var state_1 = _loop_1(cost);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.canBuild = true;
        return true;
    };
    Building.prototype.getNextCost = function () {
        if (this._calcLevel !== this.purchased) {
            this._nextCost = [];
            var _loop_2 = function (c) {
                var r = __WEBPACK_IMPORTED_MODULE_0_app_config_resourceTypes_config__["a" /* DEFAULT_RESOURCES */].find(function (r) { return r.rid === c.rid; });
                var nextAmount = Math.ceil(c.base * Math.pow(1 + (c.percent / 100), this_2.purchased));
                this_2._nextCost.push({ resource: r, amount: nextAmount });
            };
            var this_2 = this;
            for (var _i = 0, _a = this.cost; _i < _a.length; _i++) {
                var c = _a[_i];
                _loop_2(c);
            }
            this._calcLevel = this.purchased;
        }
        return this._nextCost;
    };
    Building.prototype.getSize = function () {
        if (this._sizeChanged) {
            if (this.gifted + this.purchased > 0)
                this._size = Math.floor(this.size.base * Math.pow(1 + (this.size.percent / 100), (this.gifted + this.purchased - 1)));
            else
                this._size = 0;
            this._sizeChanged = false;
        }
        return this._size;
    };
    Building.prototype.build = function (number, gifted) {
        var ret = [];
        if (!number)
            number = 1;
        if (gifted)
            this.gifted += number;
        else if (this.canBuild) {
            ret = this._nextCost;
            this.purchased += number;
        }
        this._sizeChanged = true;
        return ret;
    };
    return Building;
}());

var DEFAULT_BUILDINGS = [
    {
        bid: __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["c" /* BuildingID */].DORMITORY,
        name: "Dormitory",
        description: "Where the adult bees live.",
        use: BuildingUse.HOUSING,
        size: {
            base: 20,
            percent: 15
        },
        cost: [{
                rid: "wax",
                base: 50,
                percent: 125
            }],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["c" /* BuildingID */].NURSERY,
        name: "Nursery",
        description: "Where the eggs and larva live.",
        use: BuildingUse.NURSERY,
        size: {
            base: 5,
            percent: 12.5
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["c" /* BuildingID */].STORAGE_NECTAR,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "nectar",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["c" /* BuildingID */].STORAGE_POLLEN,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "pollen",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["c" /* BuildingID */].STORAGE_WATER,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "water",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["c" /* BuildingID */].STORAGE_FOOD,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "food",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["c" /* BuildingID */].STORAGE_HONEY,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "honey",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["c" /* BuildingID */].STORAGE_JELLY,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "royal_jelly",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    },
    {
        bid: __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["c" /* BuildingID */].STORAGE_WAX,
        name: "%(resource)s Storage",
        description: "Stores %(resource)s.",
        use: "storage",
        rid: "wax",
        size: {
            base: 75,
            percent: 100
        },
        cost: [
            {
                rid: "wax",
                base: 50,
                percent: 125
            }
        ],
        purchased: 0,
        gifted: 1,
        unlocked: true,
        multiplier: 1
    }
];
//# sourceMappingURL=buildingTypes.config.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JobAction; });
/* unused harmony export JobType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JOB_TYPES; });

var JobAction = {
    SPAWN: 'spawn',
    TRAVEL: 'travel',
    COLLECT: 'collect',
    DEPOSIT: 'deposit',
    PRODUCE: 'produce',
    PROTECT: 'protect'
};
var JobType = (function () {
    function JobType(jobType) {
        this.jid = jobType.jid;
        this.name = jobType.name;
        this.desc = jobType.desc;
        this.actions = jobType.actions;
        this.beetypes = jobType.beetypes;
    }
    return JobType;
}());

var JOB_TYPES = [{
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].IDLE,
        name: "Idle",
        desc: "No job assigned.",
        actions: [],
        beetypes: ['drone', 'egg', 'larva', 'queen', 'worker']
    },
    {
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].BREEDER,
        name: "Breeding Queen",
        desc: "Head Queen, performs the task of laying eggs and fertilizing them.",
        actions: [
            {
                action: JobAction.SPAWN,
                rate: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_EGG
            }
        ],
        beetypes: ['queen']
    },
    {
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].FORAGER,
        name: "Forager",
        desc: "Collects nectar, pollen, and water.",
        actions: [{
                action: JobAction.TRAVEL,
                rate: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].SPD_FLY
            },
            {
                action: JobAction.COLLECT,
                rate: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].SPD_CLT,
                storage: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].Get_STR,
            },
            {
                action: JobAction.DEPOSIT,
                rate: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].SPD_DEP
            }],
        beetypes: ['worker']
    },
    {
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].NURSE,
        name: "Nurse Bee",
        desc: "Cares for eggs and produces royal jelly from honey and pollen",
        actions: [{
                action: JobAction.PRODUCE,
                rate: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_JELLY,
                yield: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].YLD_JELLY,
                cost: [__WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_JELLY_HONEY, __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_JELLY_POLLEN]
            }],
        beetypes: ['worker']
    },
    {
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].PRODUCER_FOOD,
        name: "Food Producer",
        desc: "Converts stored honey, pollen, and water into usable food",
        actions: [{
                action: JobAction.PRODUCE,
                rate: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_FOOD,
                yield: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].YLD_FOOD,
                cost: [__WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_FOOD_HONEY, __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_FOOD_POLLEN, __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_FOOD_WATER]
            }],
        beetypes: ['worker']
    },
    {
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].PRODUCER_HONEY,
        name: "Honey Producer",
        desc: "Converts stored nectar into honey",
        actions: [{
                action: JobAction.PRODUCE,
                rate: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_HONEY,
                yield: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].YLD_HONEY,
                cost: [__WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_HONEY_NECTAR]
            }],
        beetypes: ['worker']
    },
    {
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].BUILDER,
        name: "Builder",
        desc: "Converts stored food into wax",
        actions: [{
                action: JobAction.PRODUCE,
                rate: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_WAX,
                yield: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].YLD_WAX,
                cost: [__WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_WAX_FOOD]
            }],
        beetypes: ['worker']
    },
    {
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].UNDERTAKER,
        name: "Undertaker Bee",
        desc: "Converts dead bees and rejected eggs into food.",
        actions: [{
                action: JobAction.PRODUCE,
                rate: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_FOOD,
                yield: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].YLD_FOOD,
                cost: [__WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_FOOD_DEADBEES]
            }],
        beetypes: ['worker']
    },
    {
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].GUARD,
        name: "Guard Bee",
        desc: "Protects the hive which reduces the mortality rate",
        actions: [{
                action: JobAction.PROTECT,
                amount: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].DEF
            }],
        beetypes: ['drone', 'worker']
    }];
//# sourceMappingURL=jobTypes.config.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DragService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DragService = (function () {
    function DragService() {
        this.onDragStart = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.onDragEnd = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    return DragService;
}());
DragService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])()
], DragService);

//# sourceMappingURL=drag-service.service.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_log_log_component__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GameComponent = (function () {
    // gameLoopSub: Subscription;
    function GameComponent(_gameService, _logService) {
        this._gameService = _gameService;
        this._logService = _logService;
        this.title = 'GenetixNg4';
        this.count = 0;
    }
    GameComponent.prototype.ngOnInit = function () {
        // this.gameLoopSub = this._gameService.gameLoopEvent$.subscribe(elapsedMs => {
        //   if (elapsedMs === 0) {
        //     this.count = 0;
        //     return;
        //   }
        //   while (elapsedMs >= 50) {
        //     this.count++;
        //     elapsedMs -= 50;
        //     if (this.count % (1000 / 50 * 10) === 0)
        //       this._logService.logGeneralMessage("Test");
        //   }
        // });
    };
    GameComponent.prototype.ngOnDestroy = function () {
        // this.gameLoopSub.unsubscribe();
    };
    return GameComponent;
}());
GameComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        template: __webpack_require__(299),
        styles: [__webpack_require__(270)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__game_service__["a" /* GameService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_app_log_log_component__["b" /* LogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_log_log_component__["b" /* LogService */]) === "function" && _b || Object])
], GameComponent);

var _a, _b;
//# sourceMappingURL=game.component.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainGameComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainGameComponent = (function () {
    /**
     *
     */
    function MainGameComponent() {
    }
    MainGameComponent.prototype.ngOnInit = function () {
    };
    return MainGameComponent;
}());
MainGameComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        template: __webpack_require__(302)
    }),
    __metadata("design:paramtypes", [])
], MainGameComponent);

//# sourceMappingURL=main-game.component.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_game_service__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestInterfaceComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TestInterfaceComponent = (function () {
    function TestInterfaceComponent(_gameService) {
        this._gameService = _gameService;
    }
    TestInterfaceComponent.prototype.ngOnInit = function () { };
    return TestInterfaceComponent;
}());
TestInterfaceComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        template: "\n    <div class=\"row\" style=\"height: 95vh;\">\n    <div class=\"col-xs-12 fullH\"> \n        <div class=\"player-content\">\n            <div class=\"log-component\">\n            <pre>{{_gameService.map.getState()|json}}</pre>            \n            </div>            \n        </div>\n        <textarea style=\"width:100%; color:black;\" rows=\"5\" readonly ngModel={{_gameService.lastSave}}></textarea>\n    </div>\n    </div>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */]) === "function" && _a || Object])
], TestInterfaceComponent);

var _a;
//# sourceMappingURL=test-interface.component.js.map

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_classes_map_class__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_config_config_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_log_log_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lz_string__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lz_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lz_string__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GameService = (function () {
    function GameService(_configService, _logService) {
        this._configService = _configService;
        this._logService = _logService;
        this.gameSaveKey = "GENETIX_SAVE";
        this.lastSave = "";
        this._elapsedMs = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](0);
        this._running = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](true);
        this._msSinceAutoSave = 0;
        this.animationEvent$ = this._elapsedMs.asObservable();
        this.stateChangeEvent$ = this._running.asObservable();
        this.initGame();
    }
    GameService.prototype.initGame = function () {
        var now = Date.now();
        if (this._animationRequest)
            window.cancelAnimationFrame(this._animationRequest);
        this._logService.clearLog("Welcome to Genetix!");
        var s = localStorage.getItem(this.gameSaveKey);
        var json = __WEBPACK_IMPORTED_MODULE_5_lz_string__["decompressFromBase64"](s);
        this.lastSave = s;
        var savedState = json ? JSON.parse(json) : null;
        this.saveTime = savedState && savedState.saveTime || now;
        this.lastTime = null;
        this.map = null;
        this.stepTimeMs = 50 || savedState && savedState.stepTimeMs || 50;
        if (savedState && savedState.map) {
            this.map = new __WEBPACK_IMPORTED_MODULE_2_app_classes_map_class__["a" /* Map */](this.stepTimeMs, savedState.map);
        }
        else {
            this.map = new __WEBPACK_IMPORTED_MODULE_2_app_classes_map_class__["a" /* Map */](this.stepTimeMs, null);
        }
        this._msSinceAutoSave = 0;
        this._elapsedMs.next(0);
        var offlineMs = now - this.saveTime;
        if (offlineMs >= this.stepTimeMs)
            this.map.handleGameLoop(offlineMs);
        this._animationRequest = window.requestAnimationFrame(this.gameLoop.bind(this));
    };
    GameService.prototype.gameLoop = function (runningTime) {
        var now = Date.now();
        var diff = now - this.saveTime;
        this.saveTime = now;
        this._animationRequest = null;
        if (this.lastTime == null)
            this.lastTime = runningTime;
        var steps = 0;
        while (runningTime - this.lastTime >= (this.stepTimeMs * (steps + 1))) {
            steps++;
        }
        var elapsedMs = (this.stepTimeMs * steps);
        this.lastTime += elapsedMs;
        if (this._running.value && steps > 0) {
            this.map.handleGameLoop(elapsedMs);
            this._msSinceAutoSave += elapsedMs;
            if (this._msSinceAutoSave >= 30000) {
                this.saveGame();
                this._msSinceAutoSave = 0;
            }
        }
        // do animations every loop, after any game object updates have occurred.
        this._elapsedMs.next(diff);
        if (!this._animationRequest)
            this._animationRequest = window.requestAnimationFrame(this.gameLoop.bind(this));
    };
    GameService.prototype.toggleState = function () {
        this._running.next(!this._running.value);
    };
    GameService.prototype.saveGame = function () {
        var state = {
            saveTime: this.saveTime,
            stepTimeMs: this.stepTimeMs,
            map: this.map.getState()
        };
        console.log(state);
        var save = __WEBPACK_IMPORTED_MODULE_5_lz_string__["compressToBase64"](JSON.stringify(state));
        //console.log(save);
        this.lastSave = save;
        localStorage.setItem(this.gameSaveKey, save);
        this._logService.logGeneralMessage("Game saved.");
    };
    GameService.prototype.hardReset = function () {
        localStorage.removeItem(this.gameSaveKey);
        this.initGame();
    };
    GameService.prototype.getResourceType = function (rid) {
        return this._configService.getResourceById(rid);
    };
    return GameService;
}());
GameService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_app_config_config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_config_config_service__["a" /* ConfigService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_app_log_log_component__["b" /* LogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_log_log_component__["b" /* LogService */]) === "function" && _b || Object])
], GameService);

var _a, _b;
//# sourceMappingURL=game.service.js.map

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JobID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AbilityID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BuildingID; });
var JobID = {
    IDLE: 'idle', BREEDER: 'breeder', FORAGER: 'forager',
    NURSE: 'nurse', PRODUCER_FOOD: 'producer_food', PRODUCER_HONEY: 'producer_honey',
    BUILDER: 'builder', UNDERTAKER: 'undertaker', GUARD: 'guard'
};
var AbilityID = {
    DEF: 'def', RNG: 'rng',
    STR_POLLEN: 'str_pollen', STR_NECTAR: 'str_nectar', STR_WATER: 'str_water',
    SPD_FLY: 'spd_fly', SPD_CLT: 'spd_clt', SPD_DEP: 'spd_dep',
    PRD_HONEY: 'prd_honey', YLD_HONEY: 'yld_honey', COST_HONEY_NECTAR: 'cost_honey_nectar',
    PRD_WAX: 'prd_wax', YLD_WAX: 'yld_wax', COST_WAX_FOOD: 'cost_wax_food',
    PRD_JELLY: 'prd_jelly', YLD_JELLY: 'yld_jelly', COST_JELLY_HONEY: 'cost_jelly_honey', COST_JELLY_POLLEN: 'cost_jelly_pollen',
    PRD_FOOD: 'prd_food', YLD_FOOD: 'yld_food', COST_FOOD_POLLEN: 'cost_food_pollen', COST_FOOD_HONEY: 'cost_food_honey', COST_FOOD_WATER: 'cost_food_water', COST_FOOD_DEADBEES: 'cost_food_deadbees',
    PRD_EGG: 'prd_egg',
    Get_STR: function (rid) {
        switch (rid) {
            case 'nectar':
                return AbilityID.STR_NECTAR;
            case 'pollen':
                return AbilityID.STR_POLLEN;
            case 'water':
                return AbilityID.STR_WATER;
        }
    }
};
var ResourceID = {
    NECTAR: 'nectar',
    POLLEN: 'pollen',
    WATER: 'water',
    FOOD: 'food',
    HONEY: 'honey',
    ROYAL_JELLY: 'royal_jelly',
    WAX: 'wax',
    DEADBEES: 'deadbees',
    DEFENSE: 'defense'
};
var BuildingID = {
    DORMITORY: 'dormitory',
    NURSERY: 'nursery',
    STORAGE_NECTAR: 'storage_nectar',
    STORAGE_POLLEN: 'storage_pollen',
    STORAGE_WATER: 'storage_water',
    STORAGE_WAX: 'storage_wax',
    STORAGE_JELLY: 'storage_jelly',
    STORAGE_HONEY: 'storage_honey',
    STORAGE_FOOD: 'storage_food'
};
//# sourceMappingURL=types.config.js.map

/***/ }),

/***/ 184:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 184;


/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(214);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_game_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_main_game_main_game_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_test_interface_test_interface_component__ = __webpack_require__(116);
/* unused harmony export gameState */
/* unused harmony export mainState */
/* unused harmony export testState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_STATES; });



var gameState = {
    name: 'game',
    redirectTo: 'home',
    component: __WEBPACK_IMPORTED_MODULE_0_app_game_component__["a" /* GameComponent */],
};
/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
var mainState = {
    parent: 'game',
    name: 'main',
    url: '/main',
    component: __WEBPACK_IMPORTED_MODULE_1_app_main_game_main_game_component__["a" /* MainGameComponent */],
};
var testState = {
    parent: 'game',
    name: 'test',
    url: '/test',
    component: __WEBPACK_IMPORTED_MODULE_2_app_test_interface_test_interface_component__["a" /* TestInterfaceComponent */]
};
var APP_STATES = [
    mainState,
    gameState,
    testState
];
//# sourceMappingURL=app.states.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_game_service__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildingListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BuildingListComponent = (function () {
    function BuildingListComponent(_gameService) {
        this._gameService = _gameService;
    }
    BuildingListComponent.prototype.ngOnInit = function () {
    };
    return BuildingListComponent;
}());
BuildingListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'bloqhead-building-list',
        template: __webpack_require__(298),
        styles: [__webpack_require__(269)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */]) === "function" && _a || Object])
], BuildingListComponent);

var _a;
//# sourceMappingURL=building-list.component.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_app_module__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Genome; });
/* unused harmony export geneMask */

var Genome = (function () {
    function Genome(state, hasPairsOverride) {
        this.chromosomeCount = state && state.chromosomeCount || 10;
        this.hasPairs = state && state.hasPairs || hasPairsOverride || false;
        this.mutationChance = state && state.mutationChance || 0.005;
        this.loadChromosomes(state && state.chromosomes || null);
    }
    Genome.prototype.loadChromosomes = function (chromos) {
        this.chromosomes = [[]];
        if (chromos != null) {
            var pairIndex = 0;
            for (var _i = 0, chromos_1 = chromos; _i < chromos_1.length; _i++) {
                var pair = chromos_1[_i];
                if (this.chromosomes.length - 1 < pairIndex)
                    this.chromosomes.push([]);
                for (var _a = 0, pair_1 = pair; _a < pair_1.length; _a++) {
                    var c_1 = pair_1[_a];
                    this.chromosomes[pairIndex].push(new Chromosome(c_1));
                }
                pairIndex++;
            }
        }
        else {
            var count = this.hasPairs ? 2 : 1;
            for (var i = 0; i < count; i++) {
                if (this.chromosomes.length - 1 < i)
                    this.chromosomes.push([]);
                for (var c = 0; c < this.chromosomeCount; c++) {
                    var a = new Chromosome();
                    a.mutationChance = this.mutationChance;
                    this.chromosomes[i].push(a);
                }
            }
        }
    };
    Genome.prototype.getGene = function (cIndex, gIndex) {
        var v = this.chromosomes[0][cIndex].getGene(gIndex);
        if (this.hasPairs)
            v = (v || this.chromosomes[1][cIndex].getGene(gIndex));
        return v;
    };
    Genome.prototype.fertilize = function (mate) {
        var offspring;
        var chromosomes = [[]];
        if (this.hasPairs || mate.hasPairs)
            throw new Error("Cannot mate genomes with chromosome pairs.");
        chromosomes[0] = Object.assign({}, this.chromosomes[0]);
        chromosomes[1] = Object.assign({}, mate.chromosomes[0]);
        return offspring;
    };
    Genome.prototype.getEggGenome = function () {
        var chromosomes = [[]];
        for (var i = 0; i < this.chromosomeCount; i++) {
            var p = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_app_app_module__["c" /* randomIntFromInterval */])(0, 1);
            var c = this.chromosomes[p][i];
            chromosomes[0].push(Object.assign({}, c));
        }
        return new Genome({
            hasPairs: false,
            chromosomeCount: this.chromosomeCount,
            chromosomes: chromosomes,
            mutationChance: this.mutationChance
        });
    };
    return Genome;
}());

var geneMask = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
var Chromosome = (function () {
    function Chromosome(state) {
        this.geneCount = state && state.geneCount || 10;
        this.mutationChance = state && state.mutationChance || 0.005;
        this.genes = (state && state.genes != null) ? state.genes : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_app_app_module__["c" /* randomIntFromInterval */])(0, Math.pow(2, this.geneCount));
        if (geneMask.length < this.geneCount) {
            for (var i = geneMask.length; i < this.geneCount; i++) {
                geneMask.push(Math.pow(2, i));
            }
        }
    }
    Chromosome.prototype.toBitString = function () {
        return this.genes.toString(2);
    };
    Chromosome.prototype.getGene = function (index) {
        return (this.genes & geneMask[index]) === 1;
    };
    Chromosome.prototype.doMutation = function () {
        this.mutationString = "";
        for (var i = 0; i < this.geneCount; i++) {
            if (Math.random() < this.mutationChance)
                this.mutationString += '1';
            else
                this.mutationString += '0';
        }
        this.genes ^= parseInt(this.mutationString, 2);
    };
    return Chromosome;
}());
//# sourceMappingURL=genome.class.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point_class__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hexagon_class__ = __webpack_require__(199);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Grid; });


var Grid = (function () {
    function Grid(config) {
        this.Static = { Letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' };
        this.config = config;
        this.config.hexConfig = this.config.hexConfig || {
            HEIGHT: 91.14378277661477,
            WIDTH: 91.14378277661477,
            SIDE: 50.0,
            MARGIN: 5
        };
        this.config.STROKEWIDTH = this.config.STROKEWIDTH || 3;
        this.config.SHOW_HEX_ID = this.config.SHOW_HEX_ID || false;
        this.config.SHOW_HEX_XY = this.config.SHOW_HEX_XY || false;
        this.Hexes = [];
        //setup a dictionary for use later for assigning the X or Y CoOrd (depending on Orientation)
        var HexagonsByXOrYCoOrd = [[]]; //Dictionary<int, List<Hexagon>>
        var row = 0;
        var y = 0.0;
        while (row <= (this.config.MAPHEIGHT - 1) * 2) {
            var col = 0;
            var offset = 0.0;
            if (row % 2 == 1) {
                offset = (this.config.hexConfig.WIDTH - this.config.hexConfig.SIDE) / 2 + this.config.hexConfig.SIDE;
                col = 1;
            }
            var x = offset;
            while (col <= (this.config.MAPWIDTH - 1) * 2) {
                var hexId = this.GetHexId(row, col);
                //var h = new Hexagon(hexId, x, y, this.config);
                var h = new __WEBPACK_IMPORTED_MODULE_1__hexagon_class__["a" /* Hexagon */](hexId, col, row, this.config.hexConfig);
                var pathCoOrd = col;
                h.PathCoOrdX = col; //the column is the x coordinate of the hex, for the y coordinate we need to get more fancy
                this.Hexes.push(h);
                if (!HexagonsByXOrYCoOrd[pathCoOrd])
                    HexagonsByXOrYCoOrd[pathCoOrd] = [];
                HexagonsByXOrYCoOrd[pathCoOrd].push(h);
                col += 2;
                x += this.config.hexConfig.WIDTH + this.config.hexConfig.SIDE;
            }
            row++;
            y += this.config.hexConfig.HEIGHT / 2;
        }
        //finally go through our list of hexagons by their x co-ordinate to assign the y co-ordinate
        for (var coOrd1 in HexagonsByXOrYCoOrd) {
            var hexagonsByXOrY = HexagonsByXOrYCoOrd[coOrd1];
            var n = parseInt(coOrd1);
            var coOrd2 = Math.floor(n / 2) + (n % 2);
            for (var i in hexagonsByXOrY) {
                var h2 = hexagonsByXOrY[i]; //Hexagon
                h2.PathCoOrdY = coOrd2++;
            }
        }
    }
    Grid.prototype.GetHexId = function (row, col) {
        var letterIndex = row;
        var letters = "";
        while (letterIndex > 25) {
            letters = this.Static.Letters[letterIndex % 26] + letters;
            letterIndex -= 26;
        }
        return this.Static.Letters[letterIndex] + letters + (col + 1);
    };
    Grid.prototype.Relocate = function () {
        for (var _i = 0, _a = this.Hexes; _i < _a.length; _i++) {
            var hex = _a[_i];
            hex.Relocate(this.config.hexConfig);
        }
    };
    Grid.prototype.GetHexAt = function (p) {
        return this.Hexes.find(function (hex) { return hex.Contains(p); });
    };
    Grid.prototype.GetHexDistance = function (h1, h2) {
        //a good explanation of this calc can be found here:
        //http://playtechs.blogspot.com/2007/04/hex-grids.html
        var deltaX = h1.PathCoOrdX - h2.PathCoOrdX;
        var deltaY = h1.PathCoOrdY - h2.PathCoOrdY;
        return ((Math.abs(deltaX) + Math.abs(deltaY) + Math.abs(deltaX - deltaY)) / 2);
    };
    Grid.prototype.GetHexById = function (id) {
        return this.Hexes.find(function (hex) { return hex.id === id; });
    };
    Grid.prototype.GetNearestHex = function (p) {
        var distance;
        var minDistance = Number.MAX_VALUE;
        var hx = null;
        // iterate through each hex in the grid
        for (var _i = 0, _a = this.Hexes; _i < _a.length; _i++) {
            var h = _a[_i];
            distance = h.distanceFromMidPoint(p);
            if (distance < minDistance) {
                minDistance = distance;
                hx = h;
            }
        }
        return hx;
    };
    Grid.prototype.setHexSizeByHeight = function (height) {
        height = height || 30;
        var width = height * (2 / (Math.sqrt(3)));
        //solve quadratic
        var a = -3.0;
        var b = (-2.0 * width);
        var c = (Math.pow(width, 2)) + (Math.pow(height, 2));
        var z = (-b - Math.sqrt(Math.pow(b, 2) - (4.0 * a * c))) / (2.0 * a);
        this.config.hexConfig.WIDTH = width;
        this.config.hexConfig.HEIGHT = height;
        this.config.hexConfig.SIDE = z;
        this.Relocate();
        this.config.canvasSize = this.calcCanvasSize();
        // return the new config
        return this.config;
    };
    Grid.prototype.setHexSizeBySide = function (legnth, ratio) {
        length = length || 18;
        ratio = ratio || (2 / (Math.sqrt(3)));
        var z = length;
        var r = ratio;
        //solve quadratic
        var r2 = Math.pow(r, 2);
        var a = (1 + r2) / r2;
        var b = z / r2;
        var c = ((1 - 4.0 * r2) / (4.0 * r2)) * (Math.pow(z, 2));
        var x = (-b + Math.sqrt(Math.pow(b, 2) - (4.0 * a * c))) / (2.0 * a);
        var y = ((2.0 * x) + z) / (2.0 * r);
        var width = ((2.0 * x) + z);
        var height = (2.0 * y);
        this.config.hexConfig.WIDTH = width;
        this.config.hexConfig.HEIGHT = height;
        this.config.hexConfig.SIDE = z;
        this.Relocate();
        this.config.canvasSize = this.calcCanvasSize();
        // return the new config
        return this.config;
    };
    Grid.prototype.calcCanvasSize = function () {
        var x = this.config.MAPWIDTH * ((this.config.hexConfig.WIDTH + this.config.hexConfig.SIDE)) - this.config.hexConfig.SIDE;
        var y = this.config.MAPHEIGHT * this.config.hexConfig.HEIGHT;
        x += (this.config.hexConfig.MARGIN * 2);
        y += (this.config.hexConfig.MARGIN * 2);
        return new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x, y);
    };
    return Grid;
}());

//# sourceMappingURL=grid.class.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point_class__ = __webpack_require__(50);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hexagon; });

var Hexagon = (function () {
    function Hexagon(id, col, row, config) {
        this.draw = function (ctx, SHOW_HEX_ID, SHOW_HEX_XY) {
            if (this.selected)
                ctx.fillStyle = "#7283BA";
            else if (this.inRange)
                ctx.fillStyle = "tomato"; // love this color
            else
                ctx.fillStyle = "#EDC867";
            ctx.strokeStyle = "black";
            ctx.lineWidth = this.config.STROKEWIDTH;
            ctx.beginPath();
            ctx.moveTo(this.Points[0].X, this.Points[0].Y);
            for (var i = 1; i < this.Points.length; i++) {
                var p = this.Points[i];
                ctx.lineTo(p.X, p.Y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            if (this.id && (SHOW_HEX_ID || SHOW_HEX_XY)) {
                //draw text for debugging
                ctx.fillStyle = "black";
                ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = 'middle';
                //var textWidth = ctx.measureText(this.Planet.BoundingHex.id);
                var msg = '';
                if (SHOW_HEX_ID)
                    msg += this.id + ' ';
                if (SHOW_HEX_XY)
                    msg += this.row + ',' + this.col;
                ctx.fillText(msg, this.MidPoint.X, this.MidPoint.Y);
            }
        };
        this.config = config || { HEIGHT: 91.14378277661477, WIDTH: 91.14378277661477, SIDE: 50.0, MARGIN: 0 };
        this.id = id;
        this.col = col;
        this.row = row;
        this.selected = false;
        this.inRange = false;
        this.Relocate(this.config);
    }
    Hexagon.prototype.Relocate = function (config) {
        this.config = config;
        var x = ((this.col) * (config.WIDTH + config.SIDE / 2)) - ((this.col * config.WIDTH) / 2);
        var y = this.row * (config.HEIGHT / 2);
        var x1 = (config.WIDTH - config.SIDE) / 2;
        var y1 = (config.HEIGHT / 2);
        if (config.MARGIN) {
            x += config.MARGIN;
            y += config.MARGIN;
        }
        this.Points = []; //Polygon Base
        this.Points.push(new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x1 + x, y));
        this.Points.push(new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x1 + config.SIDE + x, y));
        this.Points.push(new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](config.WIDTH + x, y1 + y));
        this.Points.push(new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x1 + config.SIDE + x, config.HEIGHT + y));
        this.Points.push(new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x1 + x, config.HEIGHT + y));
        this.Points.push(new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x, y1 + y));
        this.TopLeftPoint = new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x, y);
        this.BottomRightPoint = new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x + config.WIDTH, y + config.HEIGHT);
        this.MidPoint = new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x + (config.WIDTH / 2), y + (config.HEIGHT / 2));
    };
    Hexagon.prototype.isInBounds = function (x, y) {
        return this.Contains(new __WEBPACK_IMPORTED_MODULE_0__point_class__["a" /* Point */](x, y));
    };
    Hexagon.prototype.isInHexBounds = function (p) {
        if (this.TopLeftPoint.X < p.X && this.TopLeftPoint.Y < p.Y &&
            p.X < this.BottomRightPoint.X && p.Y < this.BottomRightPoint.Y)
            return true;
        return false;
    };
    Hexagon.prototype.Contains = function (p) {
        var isIn = false;
        if (this.isInHexBounds(p)) {
            //turn our absolute point into a relative point for comparing with the polygon's points
            //var pRel = new HT.Point(p.X - this.x, p.Y - this.y);
            var i, j = 0;
            for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i++) {
                var iP = this.Points[i];
                var jP = this.Points[j];
                if ((((iP.Y <= p.Y) && (p.Y < jP.Y)) ||
                    ((jP.Y <= p.Y) && (p.Y < iP.Y))) &&
                    (p.X < (jP.X - iP.X) * (p.Y - iP.Y) / (jP.Y - iP.Y) + iP.X)) {
                    isIn = !isIn;
                }
            }
        }
        return isIn;
    };
    Hexagon.prototype.distanceFromMidPoint = function (p) {
        // Pythagoras' Theorem: Square of hypotenuse = sum of squares of other two sides
        var deltaX = this.MidPoint.X - p.X;
        var deltaY = this.MidPoint.Y - p.Y;
        // squaring so don't need to worry about square-rooting a negative number 
        return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    };
    return Hexagon;
}());

//# sourceMappingURL=hexagon.class.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bee_class__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_buildingTypes_config__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_resourceTypes_config__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_config_config_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_app_module__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_log_log_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sprintf_js__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sprintf_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_sprintf_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_config_types_config__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hive; });








var Hive = (function () {
    function Hive(state) {
        this.getPopulationCount = function () {
            return this.bees.length - this.getNurseryCount();
        };
        this._configService = __WEBPACK_IMPORTED_MODULE_4_app_app_module__["b" /* AppInjector */].get(__WEBPACK_IMPORTED_MODULE_3_app_config_config_service__["a" /* ConfigService */]);
        this._logService = __WEBPACK_IMPORTED_MODULE_4_app_app_module__["b" /* AppInjector */].get(__WEBPACK_IMPORTED_MODULE_5_app_log_log_component__["b" /* LogService */]);
        this.update(state);
    }
    Hive.prototype.update = function (state) {
        this.id = state.id || this.id || 1;
        this.nextId = state.nextId || this.nextId || 0;
        this.initialSize = state.initialSize || this.initialSize || 2;
        this.maxSize = state.maxSize || this.maxSize || 10;
        this.pos = state.pos || this.pos || 'A1';
        this.newbornLimit = state.newbornLimit || this.newbornLimit || 5;
        this.beeMutationChance = state.beeMutationChance || this.beeMutationChance || 0.005;
        if (state.beeStates != null)
            this.loadBees(state);
        else {
            this.bees = this.bees || [];
            if (this.bees.length === 0)
                this.createInitialQueen(true);
        }
        this.updateResources(state);
        this.updateBuildings(state);
    };
    Hive.prototype.getState = function () {
        var beeStates = [];
        for (var _i = 0, _a = this.bees; _i < _a.length; _i++) {
            var bee = _a[_i];
            beeStates.push(bee.getState());
        }
        return {
            id: this.id,
            pos: this.pos,
            initialSize: this.initialSize,
            maxSize: this.maxSize,
            newbornLimit: this.newbornLimit,
            beeMutationChance: this.beeMutationChance,
            nextId: this.nextId,
            beeStates: beeStates,
            resources: this.resources,
            buildings: this.buildings
        };
    };
    Hive.prototype.getBeesByType = function (type) {
        return this.bees.filter(function (bee) { return bee.beetype === type; });
    };
    Hive.prototype.getBeeById = function (id) {
        var index = this.bees.findIndex(function (bee) { return bee.id === id; });
        if (index == -1)
            return null;
        return this.bees[index];
    };
    Hive.prototype.getNurseryCount = function () {
        return this.getBeesByType(__WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].EGG).length + this.getBeesByType(__WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].LARVA).length;
    };
    Hive.prototype.loadBees = function (state) {
        this.bees = [];
        for (var _i = 0, _a = state.beeStates; _i < _a.length; _i++) {
            var bee = _a[_i];
            switch (bee.beetype) {
                case __WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].QUEEN:
                    this.bees.push(new __WEBPACK_IMPORTED_MODULE_0__bee_class__["b" /* Queen */](bee));
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].DRONE:
                    this.bees.push(new __WEBPACK_IMPORTED_MODULE_0__bee_class__["c" /* Drone */](bee));
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].WORKER:
                    this.bees.push(new __WEBPACK_IMPORTED_MODULE_0__bee_class__["d" /* Worker */](bee));
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].EGG:
                    this.bees.push(new __WEBPACK_IMPORTED_MODULE_0__bee_class__["e" /* Egg */](bee));
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].LARVA:
                    this.bees.push(new __WEBPACK_IMPORTED_MODULE_0__bee_class__["f" /* Larva */](bee));
                    break;
            }
        }
    };
    Hive.prototype.createInitialQueen = function (inseminate) {
        var queen = new __WEBPACK_IMPORTED_MODULE_0__bee_class__["b" /* Queen */]({
            id: this.getNextId(),
            generation: 0,
            beeMutationChance: this.beeMutationChance,
            jid: __WEBPACK_IMPORTED_MODULE_7_app_config_types_config__["b" /* JobID */].BREEDER,
            pos: this.pos
        });
        if (inseminate) {
            for (var d = 0; d < 10; d++) {
                var drone = new __WEBPACK_IMPORTED_MODULE_0__bee_class__["c" /* Drone */]({
                    id: this.getNextId(),
                    generation: 0,
                    beeMutationChance: this.beeMutationChance,
                    pos: this.pos
                });
                queen.mate(drone);
            }
        }
        queen.update();
        this.bees.push(queen);
    };
    Hive.prototype.updateResources = function (state) {
        if (state.resources == null && this.resources == null)
            this.resources = this._configService.getDefaultResources();
        else if (state.resources != null) {
            this.resources = [];
            for (var _i = 0, _a = state.resources; _i < _a.length; _i++) {
                var r = _a[_i];
                var res = new __WEBPACK_IMPORTED_MODULE_2__config_resourceTypes_config__["b" /* Resource */](r);
                // res.max = 1000;
                // res.owned = 10;
                this.resources.push(res);
            }
        }
        // else do nothing, nothing in the state and this hive already has resources
    };
    Hive.prototype.changeResource = function (rid, amount) {
        var r = this.resources.find(function (r) { return r.rid === rid; });
        r.owned += amount;
        var actualAmount = amount;
        if (r.max != -1 && r.owned > r.max) {
            actualAmount = amount - (r.owned - r.max);
            r.owned = r.max;
        }
        // if this puts us negative, we cannot deduct the amount, reset and return -1 to indicate failure.
        if (r.owned < 0) {
            r.owned -= amount;
            return -1;
        }
        // we didn't actually add anything, return -2
        if (actualAmount === 0)
            return -2;
        this.updateBuildings();
        return r.owned;
    };
    Hive.prototype.build = function (building) {
        var costs = building.build();
        for (var _i = 0, costs_1 = costs; _i < costs_1.length; _i++) {
            var cost = costs_1[_i];
            this.changeResource(cost.resource.rid, cost.amount * -1);
        }
        this.updateBuildings();
    };
    Hive.prototype.updateBuildings = function (state) {
        if (state && state.buildings == null && this.buildings == null)
            this.buildings = this._configService.getDefaultBuildings();
        else if (state && state.buildings != null) {
            this.buildings = [];
            for (var _i = 0, _a = state.buildings; _i < _a.length; _i++) {
                var b = _a[_i];
                var building = new __WEBPACK_IMPORTED_MODULE_1__config_buildingTypes_config__["b" /* Building */](b);
                this.buildings.push(building);
            }
        }
        // else do nothing, nothing in the state and this hive already has buildings
        this.nurseryLimit = 0;
        this.populationLimit = 0;
        var _loop_1 = function (building) {
            building.setCanBuild(this_1.resources);
            switch (building.use) {
                case 'storage':
                    this_1.resources.find(function (r) { return r.rid === building.rid; }).max = building.getSize();
                    break;
                case 'nursery':
                    this_1.nurseryLimit += building.getSize();
                    break;
                case 'housing':
                    this_1.populationLimit += building.getSize();
                    break;
            }
        };
        var this_1 = this;
        for (var _b = 0, _c = this.buildings; _b < _c.length; _b++) {
            var building = _c[_b];
            _loop_1(building);
        }
    };
    Hive.prototype.getNextId = function () {
        return ++this.nextId + '-H' + this.id;
    };
    Hive.prototype.assignBee = function (bee, type) {
        var msg = "";
        var index = this.bees.findIndex(function (b) { return b.id === bee.id; });
        switch (type) {
            case __WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].DRONE:
                var drone = bee.hatch(type);
                this.bees[index] = drone;
                msg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_sprintf_js__["sprintf"])("New %(type)s in Hive#%(id)d! (%(name)s)", { type: type, name: drone.name, id: this.id });
                break;
            case __WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].LARVA:
                var queen = this.bees.find(function (b) { return b.jid === __WEBPACK_IMPORTED_MODULE_7_app_config_types_config__["b" /* JobID */].BREEDER; });
                if (!queen)
                    msg = "Cannot fertlize egg. There is no queen assigned to breeding duties.";
                else {
                    var larva = queen.fertilizeEgg(bee);
                    this.bees[index] = larva;
                    msg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_sprintf_js__["sprintf"])("New %(type)s in Hive#%(id)d! (%(name)s)", { type: type, name: larva.name, id: this.id });
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].QUEEN:
            case __WEBPACK_IMPORTED_MODULE_0__bee_class__["a" /* BeeTypes */].WORKER:
                var worker = bee.mature(type);
                this.bees[index] = worker;
                msg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_sprintf_js__["sprintf"])("New %(type)s in Hive#%(id)d! (%(name)s)", { type: type, name: worker.name, id: this.id });
                break;
            default:
                msg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_sprintf_js__["sprintf"])("Invalid type: %s", type);
        }
        this._logService.logGeneralMessage(msg);
    };
    Hive.prototype.handleGameLoop = function (ms, map) {
        if (ms === 0)
            return;
        for (var _i = 0, _a = this.bees; _i < _a.length; _i++) {
            var bee = _a[_i];
            bee.doWork(ms, this, map);
        }
    };
    return Hive;
}());

//# sourceMappingURL=hive.class.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapResource; });

var MapResource = (function () {
    function MapResource(state) {
        this.id = state && state.id || 0;
        this.level = state && state.level || 1;
        this.pos = state && state.pos || 'A1';
        this.dt = state && state.dt || new Date().getTime();
        this.color = state && state.color || 'green';
        this.image = state && state.image || 'bee.svg';
        this.cooldown = state && state.cooldown || 5000;
        this.cooldownRemaining = state && state.cooldownRemaining || 0;
        this.pollen = state && state.pollen || 0;
        this.col_pollen = state && state.col_pollen || 0;
        this.nectar = state && state.nectar || 0;
        this.col_nectar = state && state.col_nectar || 0;
        this.water = state && state.water || 0;
        this.col_water = state && state.col_water || 0;
        this.harvestMultiplier = state && state.harvestMultiplier || 1.0;
        this.beeIsHarvesting = state && state.beeIsHarvesting || false;
        this.resourceName = state && state.resourceName || '??';
        this.beeids = state && state.beeids || [];
        this.bees = [];
        this.name = this.resourceName + " #" + this.id;
    }
    MapResource.prototype.getState = function () {
        var beeids = this.bees.map(function (a) { return a.id; });
        return {
            id: this.id,
            level: this.level,
            pos: this.pos,
            dt: this.dt,
            color: this.color,
            image: this.image,
            cooldown: this.cooldown,
            cooldownRemaining: this.cooldownRemaining,
            pollen: this.pollen,
            col_pollen: this.col_pollen,
            nectar: this.nectar,
            col_nectar: this.col_nectar,
            water: this.water,
            col_water: this.col_water,
            harvestMultiplier: this.harvestMultiplier,
            beeIsHarvesting: this.beeIsHarvesting,
            resourceName: this.resourceName,
            beeids: beeids
        };
    };
    MapResource.prototype.queueHarvest = function (bee) {
        //logService.logWorkMessage(bee.name + ' reached ' + this.name);
        bee.waitingAtResource = true;
        // add the bee to the collection queue
        this.bees.push(bee);
    };
    MapResource.prototype.processElapsedTime = function (ms) {
        if (this.cooldownRemaining > 0) {
            this.cooldownRemaining -= ms;
        }
        // if the cooldown has elapsed and there is a bee waiting and no bees are currently harvesting
        if (this.cooldownRemaining <= 0 && this.bees.length > 0 && this.beeIsHarvesting === false) {
            this.beeIsHarvesting = true;
            var bee = this.bees.shift();
            bee.waitingAtResource = false;
            bee.harvesting = true;
        }
    };
    MapResource.prototype.doneHarvesting = function () {
        this.cooldownRemaining = this.cooldown;
        this.beeIsHarvesting = false;
        this.col_nectar = 0;
        this.col_pollen = 0;
        this.col_water = 0;
    };
    MapResource.prototype.getAvailable = function (rid) {
        var avail = 0;
        switch (rid) {
            case __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].NECTAR:
                avail = this.nectar - this.col_nectar;
                break;
            case __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].POLLEN:
                avail = this.pollen - this.col_pollen;
                break;
            case __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].WATER:
                avail = this.water - this.col_water;
                break;
        }
        return avail;
    };
    MapResource.prototype.collect = function (rid, amount) {
        var harvestAmount = 0;
        var avail = 0;
        switch (rid) {
            case __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].NECTAR:
                avail = this.getAvailable(rid);
                if (amount <= avail)
                    harvestAmount = amount;
                else if (avail > 0)
                    harvestAmount = avail;
                this.col_nectar += harvestAmount;
                break;
            case __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].POLLEN:
                avail = this.getAvailable(rid);
                if (amount <= avail)
                    harvestAmount = amount;
                else if (avail > 0)
                    harvestAmount = avail;
                this.col_pollen += harvestAmount;
                break;
            case __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].WATER:
                avail = this.getAvailable(rid);
                if (amount <= avail)
                    harvestAmount = amount;
                else if (avail > 0)
                    harvestAmount = avail;
                this.col_water += harvestAmount;
                break;
        }
        return harvestAmount;
    };
    return MapResource;
}());

//# sourceMappingURL=map-resource.class.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_classes_hive_class__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_classes_hexmap_grid_class__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_classes_hexmap_point_class__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_classes_map_resource_class__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_config_config_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_app_module__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Map; });






var Map = (function () {
    function Map(stepTimeMs, state) {
        this.Q_PI = Math.PI / 4;
        this.TWO_PI = Math.PI * 2;
        this._configService = __WEBPACK_IMPORTED_MODULE_5_app_app_module__["b" /* AppInjector */].get(__WEBPACK_IMPORTED_MODULE_4_app_config_config_service__["a" /* ConfigService */]);
        this.hives = [];
        this.mapResources = [];
        this.stepTimeMs = stepTimeMs;
        if (state) {
            this.grid = new __WEBPACK_IMPORTED_MODULE_1_app_classes_hexmap_grid_class__["a" /* Grid */](state.gridConfig);
            this.currentHiveID = state.currentHiveID;
            for (var _i = 0, _a = state.hiveStates; _i < _a.length; _i++) {
                var h = _a[_i];
                var hive = new __WEBPACK_IMPORTED_MODULE_0_app_classes_hive_class__["a" /* Hive */](h);
                if (this.currentHiveID === hive.id)
                    this.currentHive = hive;
                for (var _b = 0, _c = hive.bees; _b < _c.length; _b++) {
                    var b = _c[_b];
                    for (var _d = 0, _e = b.nodeIds; _d < _e.length; _d++) {
                        var nodeid = _e[_d];
                        b.nodes.push(this.grid.GetHexById(nodeid));
                    }
                }
                this.hives.push(hive);
            }
            for (var _f = 0, _g = state.mapResourceStates; _f < _g.length; _f++) {
                var mr = _g[_f];
                var node = new __WEBPACK_IMPORTED_MODULE_3_app_classes_map_resource_class__["a" /* MapResource */](mr);
                this.mapResources.push(node);
                this.grid.GetHexById(node.pos).mapResource = node;
                for (var _h = 0, _j = node.beeids; _h < _j.length; _h++) {
                    var beeid = _j[_h];
                    node.bees.push(this.getBeeById(beeid));
                }
            }
        }
        else {
            this.generateInitialMap();
        }
    }
    Map.prototype.getState = function () {
        var hives = [];
        for (var _i = 0, _a = this.hives; _i < _a.length; _i++) {
            var h = _a[_i];
            hives.push(h.getState());
        }
        var mapResources = [];
        for (var _b = 0, _c = this.mapResources; _b < _c.length; _b++) {
            var mr = _c[_b];
            mapResources.push(mr.getState());
        }
        return {
            hiveStates: hives,
            mapResourceStates: mapResources,
            gridConfig: this.grid.config,
            currentHiveID: this.currentHiveID,
            stepTimeMs: this.stepTimeMs
        };
    };
    Map.prototype.generateInitialMap = function () {
        this.grid = new __WEBPACK_IMPORTED_MODULE_1_app_classes_hexmap_grid_class__["a" /* Grid */]({
            MAPWIDTH: 7,
            MAPHEIGHT: 7
        });
        this.grid.setHexSizeByHeight(50);
        this.canvasLocation = new __WEBPACK_IMPORTED_MODULE_2_app_classes_hexmap_point_class__["a" /* Point */](0, 0);
        // add hives
        this.addHive("G5");
        this.addHive("G9");
        // add water resources
        this.addWaterNode("D6");
        this.addWaterNode("J10");
        this.addWaterNode("E3");
        // add clover resources
        this.addCloverNode("I7", 1);
        this.addCloverNode("H6", 1);
        this.addCloverNode("G11", 1);
        this.addCloverNode("D4", 1);
        this.addCloverNode("B2", 2);
        this.addCloverNode("G13", 2);
        this.addCloverNode("A7", 3);
        this.addCloverNode("E7", 3);
        this.currentHiveID = this.hives[0].id;
        this.currentHive = this.hives[0];
    };
    Map.prototype.getHiveByPosition = function (pos) {
        return this.hives.find(function (hive) { return hive.pos === pos; });
    };
    Map.prototype.getHiveById = function (id) {
        return this.hives.find(function (hive) { return hive.id === id; });
    };
    Map.prototype.getBeeById = function (beeid) {
        return this.getHiveById(parseInt(beeid.substring(beeid.indexOf('H') + 1))).getBeeById(beeid);
    };
    Map.prototype.mapClicked = function (x, y) {
        var p = new __WEBPACK_IMPORTED_MODULE_2_app_classes_hexmap_point_class__["a" /* Point */](x, y);
        // TODO: handle clicking bees before falling through to the hex
        // handle clicking on a hex
        var hex = this.grid.GetHexAt(p);
        var oldhex = this.grid.GetHexById(this.selectedHexID);
        if (hex === null || typeof hex === 'undefined')
            return;
        if (oldhex !== null && typeof oldhex !== 'undefined') {
            if (hex.id === oldhex.id) {
                console.log('TODO: show additional info via dialog or somethin');
            }
            else {
                oldhex.selected = false;
            }
        }
        hex.selected = true;
        this.selectedHexID = hex.id;
        // check if this hex has a hive, if so, select it
        var hive = this.getHiveByPosition(hex.id);
        if (hive && hive.id != this.currentHiveID) {
            this.currentHiveID = hive.id;
            this.currentHive = hive;
            //self.sendHiveChangeEvent();
        }
    };
    Map.prototype.mapMoved = function (x, y) {
        this.canvasLocation = new __WEBPACK_IMPORTED_MODULE_2_app_classes_hexmap_point_class__["a" /* Point */](x, y);
    };
    Map.prototype.setRangeGraph = function (beeid) {
        if (beeid) {
            var bee = this.currentHive.getBeeById(beeid);
            var range = bee.getAbility('rng').value;
            var center = this.grid.GetHexById(this.currentHive.pos);
            for (var _i = 0, _a = this.grid.Hexes; _i < _a.length; _i++) {
                var target = _a[_i];
                target.inRange = this.grid.GetHexDistance(center, target) <= range;
            }
        }
        else {
            for (var _b = 0, _c = this.grid.Hexes; _b < _c.length; _b++) {
                var hex = _c[_b];
                hex.inRange = false;
            }
        }
    };
    Map.prototype.handleGameLoop = function (elapsedMs) {
        while (elapsedMs >= this.stepTimeMs) {
            for (var _i = 0, _a = this.mapResources; _i < _a.length; _i++) {
                var mapResource = _a[_i];
                mapResource.processElapsedTime(this.stepTimeMs);
            }
            for (var _b = 0, _c = this.hives; _b < _c.length; _b++) {
                var hive = _c[_b];
                hive.handleGameLoop(this.stepTimeMs, this);
            }
            elapsedMs -= this.stepTimeMs;
        }
    };
    Map.prototype.drawMap = function (context, elapsedMs) {
        this.clear(context);
        this.drawHexes(context);
        this.drawResources(context);
        this.drawHives(context, elapsedMs);
    };
    Map.prototype.addHive = function (position) {
        var id = this.hives.length + 1;
        var hive = new __WEBPACK_IMPORTED_MODULE_0_app_classes_hive_class__["a" /* Hive */]({
            "id": id,
            "initialSize": 2,
            "maxSize": 5,
            "beeMutationChance": 0.0025,
            "pos": position
        });
        this.hives.push(hive);
        return hive;
    };
    Map.prototype.addWaterNode = function (position) {
        var hex = this.grid.GetHexById(position);
        if (typeof hex.mapResource != 'undefined') {
            return null;
        }
        var id = 1;
        var mr = new __WEBPACK_IMPORTED_MODULE_3_app_classes_map_resource_class__["a" /* MapResource */]({
            "id": id,
            "resourceName": 'Water',
            "pos": position,
            "color": '#04328C',
            "cooldown": 0,
            "water": 10000
        });
        this.mapResources.push(mr);
        hex.mapResource = mr;
        return mr;
    };
    Map.prototype.addCloverNode = function (position, level) {
        level = level || 1;
        var hex = this.grid.GetHexById(position);
        if (typeof hex.mapResource != 'undefined') {
            return null;
        }
        var id = 1;
        var mr = new __WEBPACK_IMPORTED_MODULE_3_app_classes_map_resource_class__["a" /* MapResource */]({
            "id": id,
            "level": level,
            "resourceName": 'Clover',
            "pos": position,
            "color": '#2C4001',
            "cooldown": 5000,
            "harvestMultiplier": (1.0 / level),
            "nectar": (3 * level),
            "pollen": (2 * level)
        });
        this.mapResources.push(mr);
        hex.mapResource = mr;
        return mr;
    };
    Map.prototype.clear = function (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };
    Map.prototype.drawHexes = function (context) {
        for (var _i = 0, _a = this.grid.Hexes; _i < _a.length; _i++) {
            var hex = _a[_i];
            hex.draw(context, this.grid.config.SHOW_HEX_ID, this.grid.config.SHOW_HEX_XY);
        }
    };
    Map.prototype.drawResources = function (context) {
        for (var _i = 0, _a = this.mapResources; _i < _a.length; _i++) {
            var resource = _a[_i];
            var hex = this.grid.GetHexById(resource.pos);
            context.fillStyle = resource.color;
            context.beginPath();
            context.arc(hex.MidPoint.X, hex.MidPoint.Y, this.grid.config.hexConfig.HEIGHT * 0.3, 0, this.TWO_PI);
            context.closePath();
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.stroke();
        }
    };
    Map.prototype.drawHives = function (context, elapsedMs) {
        for (var _i = 0, _a = this.hives; _i < _a.length; _i++) {
            var hive = _a[_i];
            var hex = this.grid.GetHexById(hive.pos);
            var id = 'H' + hive.id;
            context.fillStyle = hive.id === this.currentHiveID ? 'yellow' : 'grey';
            context.beginPath();
            context.arc(hex.MidPoint.X, hex.MidPoint.Y, this.grid.config.hexConfig.HEIGHT * 0.3, 0, this.TWO_PI);
            context.closePath();
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.stroke();
            context.fillStyle = 'black';
            context.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
            context.textAlign = "center";
            context.textBaseline = 'middle';
            //var textWidth = ctx.measureText(this.Planet.BoundingHex.id);
            context.fillText(id, hex.MidPoint.X, hex.MidPoint.Y);
            this.drawBees(context, hive, elapsedMs);
        }
    };
    Map.prototype.drawBees = function (context, hive, elapsedMs) {
        for (var _i = 0, _a = hive.bees; _i < _a.length; _i++) {
            var bee = _a[_i];
            if (bee.isMoving) {
                var hexStart = this.grid.GetHexById(bee.tripStart);
                var hexEnd = this.grid.GetHexById(bee.tripEnd);
                var percentComplete = bee.tripElaspedTime / bee.tripTotalTime;
                if (isNaN(percentComplete))
                    percentComplete = 1;
                var deltaX = hexEnd.MidPoint.X - hexStart.MidPoint.X;
                var deltaY = hexEnd.MidPoint.Y - hexStart.MidPoint.Y;
                var rads = Math.atan2(deltaY, deltaX);
                var coordX = hexStart.MidPoint.X + ((deltaX) * percentComplete);
                var coordY = hexStart.MidPoint.Y + ((deltaY) * percentComplete);
                context.fillStyle = 'yellow';
                context.beginPath();
                context.arc(coordX, coordY, this.grid.config.hexConfig.HEIGHT * 0.2, rads - this.Q_PI, rads + this.Q_PI, true);
                context.closePath();
                context.fill();
                context.lineWidth = 1;
                context.strokeStyle = 'black';
                context.stroke();
                context.fillStyle = 'black';
                context.font = "bolder 6pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
                context.textAlign = "center";
                context.textBaseline = 'middle';
                //var textWidth = ctx.measureText(this.Planet.BoundingHex.id);
                context.fillText(bee.id, coordX, coordY);
            }
        }
    };
    return Map;
}());

//# sourceMappingURL=map.class.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Ability; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_ABILITIES; });

var Ability = (function () {
    function Ability(def) {
        this.abilityId = def.abilityId;
        this.name = def.name;
        this.desc = def.name;
        this.rid = def.rid;
        this.c_rid = def.c_rid;
        this.baseValue = def.baseValue;
        this.value = def.value != null ? def.value : def.baseValue;
    }
    return Ability;
}());

var DEFAULT_ABILITIES = [{
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].DEF,
        "name": "Defense",
        "desc": "Ability to defend the hive.",
        "baseValue": 1,
        "rid": "defense"
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].RNG,
        "name": "Range",
        "desc": "Number of cells a bee can fly before having to return to the hive.",
        "baseValue": 2
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].STR_POLLEN,
        "name": "Pollen Storage",
        "desc": "The amount of pollen a bee can hold.",
        "baseValue": 10,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].POLLEN
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].STR_NECTAR,
        "name": "Nectar Storage",
        "desc": "The amount of nectar a bee can hold.",
        "baseValue": 10,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].NECTAR
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].STR_WATER,
        "name": "Water Storage",
        "desc": "The amount of water a bee can hold.",
        "baseValue": 10,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].WATER
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].SPD_FLY,
        "name": "Flight Speed",
        "desc": "The rate at which a bee can traverse 1 cell.",
        "baseValue": 4000
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].SPD_CLT,
        "name": "Collection Speed",
        "desc": "The rate at which a bee can collect 1 resource from a node.",
        "baseValue": 1000
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].SPD_DEP,
        "name": "Deposit Speed",
        "desc": "The rate at which a bee can deposits 1 resource from its resource baskets.",
        "baseValue": 1500
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_HONEY,
        "name": "%(resource)s Production Rate",
        "desc": "The rate at which a bee can produce %(resource)s.",
        "baseValue": 10000,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].HONEY
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].YLD_HONEY,
        "name": "%(resource) Production Yield",
        "desc": "The amount of %(resource)s a bee can produce.",
        "baseValue": 4,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].HONEY
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_HONEY_NECTAR,
        "name": "%(resource)s Production Cost (%(cost)s)",
        "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
        "baseValue": 2,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].HONEY,
        "c_rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].NECTAR
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_WAX,
        "name": "%(resource)s Production Rate",
        "desc": "The rate at which a bee can produce %(resource)s.",
        "baseValue": 30000,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].WAX
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].YLD_WAX,
        "name": "%(resource) Production Yield",
        "desc": "The amount of %(resource)s a bee can produce.",
        "baseValue": 1,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].WAX
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_WAX_FOOD,
        "name": "%(resource)s Production Cost (%(cost)s)",
        "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
        "baseValue": 2,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].WAX,
        "c_rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].FOOD
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_JELLY,
        "name": "%(resource)s Production Rate",
        "desc": "The rate at which a bee can produce %(resource)s.",
        "baseValue": 30000,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].ROYAL_JELLY
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].YLD_JELLY,
        "name": "%(resource) Production Yield",
        "desc": "The amount of %(resource)s a bee can produce.",
        "baseValue": 1,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].ROYAL_JELLY
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_JELLY_HONEY,
        "name": "%(resource)s Production Cost (%(cost)s)",
        "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
        "baseValue": 10,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].ROYAL_JELLY,
        "c_rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].HONEY
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_JELLY_POLLEN,
        "name": "%(resource)s Production Cost (%(cost)s)",
        "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
        "baseValue": 10,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].ROYAL_JELLY,
        "c_rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].POLLEN
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_FOOD,
        "name": "%(resource)s Production Rate",
        "desc": "The rate at which a bee can produce %(resource)s.",
        "baseValue": 10000,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].FOOD
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].YLD_FOOD,
        "name": "%(resource) Production Yield",
        "desc": "The amount of %(resource)s a bee can produce.",
        "baseValue": 1,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].FOOD
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_FOOD_POLLEN,
        "name": "%(resource)s Production Cost (%(cost)s)",
        "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
        "baseValue": 2,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].FOOD,
        "c_rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].POLLEN
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_FOOD_HONEY,
        "name": "%(resource)s Production Cost (%(cost)s)",
        "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
        "baseValue": 1,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].FOOD,
        "c_rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].HONEY
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_FOOD_WATER,
        "name": "%(resource)s Production Cost (%(cost)s)",
        "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
        "baseValue": 2,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].FOOD,
        "c_rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].WATER
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].COST_FOOD_DEADBEES,
        "name": "%(resource)s Production Cost (%(cost)s)",
        "desc": "The amount of %(cost)s a bee needs to produce %(resource)s.",
        "baseValue": 5,
        "rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].FOOD,
        "c_rid": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].DEADBEES
    },
    {
        "abilityId": __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["d" /* AbilityID */].PRD_EGG,
        "name": "Egg Production",
        "desc": "The rate at which a bee can produce eggs.",
        "baseValue": 30000
    }
];
//# sourceMappingURL=abilities.config.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Trait; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_TRAITS; });
var Trait = (function () {
    function Trait(def) {
        this.id = def.id;
        this.name = def.name;
        this.desc = def.desc;
        this.genes = def.genes;
        this.requiredTraits = def.requiredTraits;
        this.mods = def.mods;
        this.icon = def.icon;
    }
    return Trait;
}());

var DEFAULT_TRAITS = [{
        "id": "B_STING",
        "name": "Big stinger",
        "desc": "A stinger built for defense.",
        "genes": [
            { "chromosome": 0, "gene": 0, "value": true }
        ],
        "mods": [
            { "abilityId": "def", "add": 5 }
        ],
        "icon": "icon-shield text-success"
    },
    {
        "id": "L_STING",
        "name": "Little stinger",
        "desc": "This below average sized stinger is bad for defense.",
        "genes": [
            { "chromosome": 0, "gene": 0, "value": false }
        ],
        "mods": [
            { "abilityId": "def", "add": -5 }
        ],
        "icon": "icon-shield text-danger"
    },
    {
        "id": "RNG_1",
        "name": "Extra Range 1",
        "desc": "Can fly 1 additional cell.",
        "genes": [
            { "chromosome": 1, "gene": 0, "value": true }
        ],
        "mods": [
            { "abilityId": "rng", "add": 1 }
        ],
        "icon": "fa-arrow-up text-success"
    },
    {
        "id": "VENOM_10_PCT",
        "name": "10% More Venomous",
        "desc": "Extra venom for better defense.",
        "genes": [
            { "chromosome": 2, "gene": 0, "value": false }
        ],
        "requiredTraits": ["B_STING"],
        "mods": [
            { "abilityId": "def", "percent": 10 }
        ],
        "icon": "icon-shield text-success"
    },
    {
        "id": "FLY_10_PCT",
        "name": "Fly 10% Faster",
        "desc": "Little stinger, faster flier.",
        "genes": [
            { "chromosome": 2, "gene": 0, "value": false }
        ],
        "requiredTraits": ["L_STING"],
        "mods": [
            { "abilityId": "spd_fly", "percent": -10 }
        ],
        "icon": "fa-bolt text-success"
    }
];
//# sourceMappingURL=traits.config.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_app_module__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_drag_drop_drag_service_service__ = __webpack_require__(113);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BloqHeadDraggableDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BloqHeadDropTargetDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BloqHeadDraggableDirective = (function () {
    function BloqHeadDraggableDirective(refEl) {
        this.onDragStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]();
        this.onDragEnd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]();
        this.element = refEl.nativeElement;
        this.dragService = __WEBPACK_IMPORTED_MODULE_1_app_app_module__["b" /* AppInjector */].get(__WEBPACK_IMPORTED_MODULE_2_app_drag_drop_drag_service_service__["a" /* DragService */]);
    }
    BloqHeadDraggableDirective.prototype.ngOnInit = function () {
        if (!this.data)
            this.data = __WEBPACK_IMPORTED_MODULE_1_app_app_module__["d" /* uuid */].new();
    };
    BloqHeadDraggableDirective.prototype.dragStart = function (e) {
        var oe = e.orignalEvent || e;
        if (oe.dataTransfer)
            oe.dataTransfer.setData('text/plain', this.data);
        this.element.classList.add(this.dragClass || 'lvl-moving');
        this.dragService.dragData = this.data;
        this.dragService.dropTargetIds = this.dropTargetIds;
        oe.stopPropagation();
        this.onDragStart.emit(oe);
        this.dragService.onDragStart.next();
    };
    BloqHeadDraggableDirective.prototype.dragEnd = function (e) {
        this.element.classList.remove(this.dragClass || 'lvl-moving');
        var oe = e.originalEvent || e;
        this.dragService.onDragEnd.next();
        this.onDragEnd.emit(oe);
        oe.stopPropagation();
        oe.preventDefault();
    };
    return BloqHeadDraggableDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", Object)
], BloqHeadDraggableDirective.prototype, "dropTargetIds", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", Object)
], BloqHeadDraggableDirective.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", String)
], BloqHeadDraggableDirective.prototype, "dragClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]) === "function" && _a || Object)
], BloqHeadDraggableDirective.prototype, "onDragStart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]) === "function" && _b || Object)
], BloqHeadDraggableDirective.prototype, "onDragEnd", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* HostListener */])('dragstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BloqHeadDraggableDirective.prototype, "dragStart", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* HostListener */])('dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BloqHeadDraggableDirective.prototype, "dragEnd", null);
BloqHeadDraggableDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Directive */])({
        selector: '[bloqheadDraggable]',
        host: {
            '[draggable]': 'true'
        }
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _c || Object])
], BloqHeadDraggableDirective);

var BloqHeadDropTargetDirective = (function () {
    function BloqHeadDropTargetDirective(refEl, ngZone) {
        this.ngZone = ngZone;
        this.enabled = true;
        this.onDragOver = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]();
        this.onDragEnter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]();
        this.onDragLeave = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]();
        this.onDrop = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]();
        this.element = refEl.nativeElement;
        this.dragService = __WEBPACK_IMPORTED_MODULE_1_app_app_module__["b" /* AppInjector */].get(__WEBPACK_IMPORTED_MODULE_2_app_drag_drop_drag_service_service__["a" /* DragService */]);
    }
    BloqHeadDropTargetDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.overClass = this.overClass || 'lvl-over';
        this.targetClass = this.targetClass || 'lvl-target';
        this.dragStartEvent = this.dragService.onDragStart.subscribe(function () {
            if (_this.allowDrop()) {
                _this.element.classList.add(_this.targetClass);
            }
        });
        this.dragEndEvent = this.dragService.onDragEnd.subscribe(function () {
            _this.element.classList.remove(_this.overClass, _this.targetClass);
        });
        this.ngZone.runOutsideAngular(function () {
            _this.element.addEventListener('dragover', function (e) {
                _this.dragOver(e);
            });
        });
    };
    BloqHeadDropTargetDirective.prototype.ngOnDestroy = function () {
        this.dragStartEvent.unsubscribe();
        this.dragEndEvent.unsubscribe();
    };
    //@HostListener('dragover', ['$event'])
    BloqHeadDropTargetDirective.prototype.dragOver = function (e) {
        var oe = e.originalEvent || e;
        if (this.allowDrop()) {
            oe.preventDefault();
            if (oe.dataTransfer)
                oe.dataTransfer.dropEffect = 'move';
            this.onDragOver.emit(oe);
            return false;
        }
    };
    BloqHeadDropTargetDirective.prototype.dragEnter = function (e) {
        if (this.allowDrop()) {
            this.element.classList.add(this.overClass);
        }
        var oe = e.originalEvent || e;
        oe.preventDefault();
        oe.stopPropagation();
        this.onDragEnter.emit({ nativeEvent: oe, dragData: this.dragService.dragData });
    };
    BloqHeadDropTargetDirective.prototype.dragLeave = function (e) {
        var oe = e.originalEvent || e;
        this.element.classList.remove(this.overClass);
        oe.preventDefault();
        this.onDragLeave.emit({ nativeEvent: oe, dragData: this.dragService.dragData });
    };
    BloqHeadDropTargetDirective.prototype.drop = function (e) {
        var oe = e.originalEvent || e;
        oe.preventDefault();
        oe.stopPropagation();
        this.dragService.onDragEnd.next();
        var relativePos = {
            x: oe.clientX - this.element.offsetLeft,
            y: oe.clientY - this.element.offsetTop
        };
        this.onDrop.emit({ nativeEvent: oe, dragData: this.dragService.dragData, relativePos: relativePos });
    };
    BloqHeadDropTargetDirective.prototype.allowDrop = function () {
        return this.enabled && this.dragService.dropTargetIds.indexOf(this.dropTargetId) !== -1;
    };
    return BloqHeadDropTargetDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", String)
], BloqHeadDropTargetDirective.prototype, "overClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", String)
], BloqHeadDropTargetDirective.prototype, "targetClass", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", String)
], BloqHeadDropTargetDirective.prototype, "dropTargetId", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", Boolean)
], BloqHeadDropTargetDirective.prototype, "enabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Output */])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]) === "function" && _d || Object)
], BloqHeadDropTargetDirective.prototype, "onDragOver", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Output */])(),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]) === "function" && _e || Object)
], BloqHeadDropTargetDirective.prototype, "onDragEnter", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Output */])(),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]) === "function" && _f || Object)
], BloqHeadDropTargetDirective.prototype, "onDragLeave", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Output */])(),
    __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* EventEmitter */]) === "function" && _g || Object)
], BloqHeadDropTargetDirective.prototype, "onDrop", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* HostListener */])('dragenter', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BloqHeadDropTargetDirective.prototype, "dragEnter", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* HostListener */])('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BloqHeadDropTargetDirective.prototype, "dragLeave", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* HostListener */])('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BloqHeadDropTargetDirective.prototype, "drop", null);
BloqHeadDropTargetDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Directive */])({
        selector: '[bloqheadDropTarget]'
    }),
    __metadata("design:paramtypes", [typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* NgZone */]) === "function" && _j || Object])
], BloqHeadDropTargetDirective);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=drag-drop.directive.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_game_service__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameControl; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GameControl = (function () {
    function GameControl(_gameService) {
        this._gameService = _gameService;
    }
    GameControl.prototype.ngOnInit = function () {
        var _this = this;
        this.stateSub = this._gameService.stateChangeEvent$.subscribe(function (state) { return _this.RUNNING = state; });
    };
    GameControl.prototype.getIcon = function () {
        return this.RUNNING ? 'fa-pause' : 'fa-play';
    };
    GameControl.prototype.ngOnDestroy = function () {
        this.stateSub.unsubscribe();
    };
    return GameControl;
}());
GameControl = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'bloqhead-game-control',
        template: '<div>' +
            '<button title="Save Game" type="button" class="btn btn-xs btn-primary" (click)="_gameService.saveGame()"><i class="fa fa-floppy-o"></i></button>' +
            '<button title="Hard Reset" type="button" class="btn btn-xs btn-primary" (click)="_gameService.hardReset()"><i class="fa fa-recycle"></i></button>' +
            '<button title="Play/Pause" type="button" class="btn btn-xs btn-primary" (click)="_gameService.toggleState()"><i class="fa" ngClass="{{getIcon()}}"></i></button>' +
            '</div>'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */]) === "function" && _a || Object])
], GameControl);

var _a;
//# sourceMappingURL=game-control.component.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoalListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GoalListComponent = (function () {
    function GoalListComponent() {
    }
    GoalListComponent.prototype.ngOnInit = function () {
    };
    return GoalListComponent;
}());
GoalListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'bloqhead-goal-list',
        template: __webpack_require__(300),
        styles: [__webpack_require__(271)]
    }),
    __metadata("design:paramtypes", [])
], GoalListComponent);

//# sourceMappingURL=goal-list.component.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_game_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_classes_hexmap_point_class__ = __webpack_require__(50);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapComponent = (function () {
    function MapComponent(_gameService) {
        this._gameService = _gameService;
        this._imageList = [
            'bee.svg',
            'bee-2.svg',
            'egg.svg',
            'honeypot.svg',
            'larva.svg',
            'nectar.svg',
            'nectar2.svg',
            'pollen.svg',
            'tombstone.svg'
        ];
        this.dontTranslate = false;
        this.needsResize = false;
        this.hexsize_min = 20;
        this.hexsize_max = 160;
        this.imagesLoaded = false;
        this.fps = 0;
        this.smoothing = 0.99;
        this.mapconfig = _gameService.map.grid.config;
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadImages(this._imageList)
            .then(function (images) {
            var i = images.reduce(function (total, current) {
                return total[current.name] = current.image, total;
            }, {});
            _this.images = i;
            _this.imagesLoaded = true;
            _this.setupCanvas();
            // document.getElementById('beeimg').appendChild(this.images['bee-2.svg']);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    MapComponent.prototype.ngOnDestroy = function () {
        this.gameLoopSub.unsubscribe();
    };
    MapComponent.prototype.loadImage = function (imageName) {
        return new Promise(function (resolve, reject) {
            var img = new Image(100, 100);
            img.src = 'assets/images/map/' + imageName;
            resolve({ name: imageName, image: img });
        });
    };
    MapComponent.prototype.loadImages = function (imageNames) {
        var promises = imageNames.map(this.loadImage);
        return Promise.all(promises);
    };
    MapComponent.prototype.setupCanvas = function () {
        var _this = this;
        this.canvas = document.getElementById('map');
        this.context = this.canvas.getContext('2d');
        this.gameLoopSub = this._gameService.animationEvent$.subscribe(function (elapsedMs) {
            if (elapsedMs > 0) {
                var instantFps = 1 / (elapsedMs / 1000);
                if (_this.fps === 0)
                    _this.fps = instantFps;
                _this.fps = (_this.fps * _this.smoothing) + (instantFps * (1.0 - _this.smoothing));
            }
            _this.draw(elapsedMs);
        });
        this.setHexSize(this.mapconfig.hexConfig.HEIGHT);
    };
    MapComponent.prototype.mousewheel = function (event) {
        if (event.wheelDeltaY > 0)
            this.zoomIn();
        if (event.wheelDeltaY < 0)
            this.zoomOut();
        return false;
    };
    MapComponent.prototype.mousedown = function (event) {
        if (event.button === 0)
            this.mouseMoved = false;
        return false;
    };
    MapComponent.prototype.mouseup = function (event) {
        if (event.button === 0 && !this.mouseMoved && event.target.id === 'map')
            this._gameService.map.mapClicked(event.offsetX, event.offsetY);
        return false;
    };
    MapComponent.prototype.mousemove = function (event) {
        if (event.buttons === 1 && (Math.abs(event.movementX) > 0.1 || Math.abs(event.movementY) > 0.1)) {
            this.mouseMoved = true;
            this.moveCanvasBy(event.movementX, event.movementY);
        }
        return false;
    };
    MapComponent.prototype.zoomIn = function () {
        if (this.mapconfig.hexConfig.HEIGHT < this.hexsize_max)
            this.setHexSize(this.mapconfig.hexConfig.HEIGHT * 1.1);
    };
    ;
    MapComponent.prototype.zoomOut = function () {
        if (this.mapconfig.hexConfig.HEIGHT > this.hexsize_min)
            this.setHexSize(this.mapconfig.hexConfig.HEIGHT / 1.1);
    };
    ;
    MapComponent.prototype.resetZoom = function () {
        // this should probably be coded to center the map
        this.setHexSize(50);
        this.moveCanvas(0, 0);
        this.dontTranslate = true;
    };
    ;
    MapComponent.prototype.moveCanvas = function (x, y) {
        this.canvas.style.left = x + 'px';
        this.canvas.style.top = y + 'px';
        this._gameService.map.mapMoved(x, y);
    };
    ;
    MapComponent.prototype.moveCanvasBy = function (x, y) {
        var l = parseFloat(this.canvas.style.left) + x;
        var t = parseFloat(this.canvas.style.top) + y;
        this.moveCanvas(l, t);
    };
    ;
    MapComponent.prototype.setHexSize = function (size) {
        this.mapconfig = this._gameService.map.grid.setHexSizeByHeight(size);
        this.needsResize = true;
    };
    ;
    MapComponent.prototype.draw = function (elapsedMs) {
        if (typeof this.canvas === 'undefined' || typeof this.context === 'undefined')
            return;
        if (this.needsResize) {
            this.needsResize = false;
            this.resizeCanvas();
        }
        this._gameService.map.drawMap(this.context, elapsedMs);
    };
    MapComponent.prototype.resizeCanvas = function () {
        var old_w = parseFloat(this.canvas.style.width);
        var old_h = parseFloat(this.canvas.style.height);
        this.canvas.style.width = this.mapconfig.canvasSize.X + 'px';
        this.canvas.style.height = this.mapconfig.canvasSize.Y + 'px';
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        old_w = old_w || this.mapconfig.canvasSize.X;
        old_h = old_h || this.mapconfig.canvasSize.Y;
        var tran_x = Math.round((0 - (this.mapconfig.canvasSize.X - old_w)) / 2);
        var tran_y = Math.round((0 - (this.mapconfig.canvasSize.Y - old_h)) / 2);
        if (!this.dontTranslate) {
            // move the map if we need to translate it
            if (tran_x !== 0 || tran_y !== 0)
                this.moveCanvasBy(tran_x, tran_y);
        }
        this.dontTranslate = false;
    };
    MapComponent.prototype.dragEnter = function (event) {
        this._gameService.map.setRangeGraph(event.dragData);
    };
    MapComponent.prototype.dragLeave = function (event) {
        this._gameService.map.setRangeGraph(null);
    };
    MapComponent.prototype.dropped = function (event) {
        var hex = this._gameService.map.grid.GetHexAt(new __WEBPACK_IMPORTED_MODULE_2_app_classes_hexmap_point_class__["a" /* Point */](event.nativeEvent.offsetX, event.nativeEvent.offsetY));
        if (hex && hex.inRange && hex.mapResource)
            this._gameService.map.getBeeById(event.dragData).addWaypointNode(hex);
        this._gameService.map.setRangeGraph(null);
    };
    return MapComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* HostListener */])('mousewheel', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MapComponent.prototype, "mousewheel", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* HostListener */])('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MapComponent.prototype, "mousedown", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* HostListener */])('mouseup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MapComponent.prototype, "mouseup", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* HostListener */])('mousemove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MapComponent.prototype, "mousemove", null);
MapComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'bloqhead-map',
        template: __webpack_require__(303),
        styles: [__webpack_require__(272)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */]) === "function" && _a || Object])
], MapComponent);

var _a;
//# sourceMappingURL=map.component.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_game_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_config_types_config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_classes_bee_class__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NurseryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NurseryComponent = (function () {
    function NurseryComponent(_gameService) {
        this._gameService = _gameService;
        this.BeeTypes = __WEBPACK_IMPORTED_MODULE_3_app_classes_bee_class__["a" /* BeeTypes */];
    }
    NurseryComponent.prototype.ngOnInit = function () {
    };
    NurseryComponent.prototype.getQueenElapsedSec = function () {
        return Math.round(this._gameService.map.currentHive.bees.find(function (b) { return b.jid === 'breeder'; }).msSinceWork / 1000);
    };
    NurseryComponent.prototype.getQueenBreedTimeSec = function () {
        return Math.round(this._gameService.map.currentHive.bees.find(function (b) { return b.jid === 'breeder'; }).getAbility(__WEBPACK_IMPORTED_MODULE_2_app_config_types_config__["d" /* AbilityID */].PRD_EGG).value / 1000);
    };
    NurseryComponent.prototype.canBreed = function (bee) {
        return this.isAlive(bee);
    };
    NurseryComponent.prototype.canFertilize = function (egg) {
        return this.isAlive(egg);
    };
    NurseryComponent.prototype.isAlive = function (bee) {
        return !bee.dead;
    };
    NurseryComponent.prototype.assignBee = function (bee, type) {
        this._gameService.map.currentHive.assignBee(bee, type);
    };
    return NurseryComponent;
}());
NurseryComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'bloqhead-nursery-list',
        template: __webpack_require__(304),
        styles: [__webpack_require__(273)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */]) === "function" && _a || Object])
], NurseryComponent);

var _a;
//# sourceMappingURL=nursery.component.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_game_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_classes_bee_class__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_config_jobTypes_config__ = __webpack_require__(112);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopulationPanelComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PopulationPanelComponent = (function () {
    function PopulationPanelComponent(_gameService) {
        this._gameService = _gameService;
        this.jids = new Map();
    }
    PopulationPanelComponent.prototype.ngOnInit = function () {
        var bt = __WEBPACK_IMPORTED_MODULE_2_app_classes_bee_class__["a" /* BeeTypes */].DRONE;
        this.addJids(bt);
        bt = __WEBPACK_IMPORTED_MODULE_2_app_classes_bee_class__["a" /* BeeTypes */].WORKER;
        this.addJids(bt);
        bt = __WEBPACK_IMPORTED_MODULE_2_app_classes_bee_class__["a" /* BeeTypes */].QUEEN;
        this.addJids(bt);
    };
    PopulationPanelComponent.prototype.addJids = function (bt) {
        this.jids[bt] = [];
        for (var _i = 0, JOB_TYPES_1 = __WEBPACK_IMPORTED_MODULE_3_app_config_jobTypes_config__["a" /* JOB_TYPES */]; _i < JOB_TYPES_1.length; _i++) {
            var job = JOB_TYPES_1[_i];
            if (job.beetypes.indexOf(bt) !== -1)
                this.jids[bt].push(job.jid);
        }
    };
    return PopulationPanelComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", Object)
], PopulationPanelComponent.prototype, "filter", void 0);
PopulationPanelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'population-panel',
        template: __webpack_require__(305),
        styles: [__webpack_require__(274)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */]) === "function" && _a || Object])
], PopulationPanelComponent);

var _a;
//# sourceMappingURL=population-panel.component.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_game_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_classes_bee_class__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopulationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PopulationComponent = (function () {
    function PopulationComponent(_gameService) {
        this._gameService = _gameService;
        this.BeeTypes = __WEBPACK_IMPORTED_MODULE_2_app_classes_bee_class__["a" /* BeeTypes */];
    }
    PopulationComponent.prototype.ngOnInit = function () {
    };
    return PopulationComponent;
}());
PopulationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'bloqhead-population',
        template: __webpack_require__(306),
        styles: [__webpack_require__(275)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */]) === "function" && _a || Object])
], PopulationComponent);

var _a;
//# sourceMappingURL=population.component.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_game_service__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResourceListComponent = (function () {
    function ResourceListComponent(_gameService) {
        this._gameService = _gameService;
    }
    ResourceListComponent.prototype.ngOnInit = function () {
    };
    ResourceListComponent.prototype.dropped = function (e, jid) {
        var bee = this._gameService.map.currentHive.getBeeById(e.dragData);
        bee.setJob(jid);
    };
    ResourceListComponent.prototype.getWorkerCount = function (jid) {
        return this._gameService.map.currentHive.bees.filter(function (b) { return b.jid === jid; }).length;
    };
    return ResourceListComponent;
}());
ResourceListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'bloqhead-resource-list',
        template: __webpack_require__(307),
        styles: [__webpack_require__(276)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_game_service__["a" /* GameService */]) === "function" && _a || Object])
], ResourceListComponent);

var _a;
//# sourceMappingURL=resource-list.component.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_router_core__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_router_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ui_router_core__);
/* harmony export (immutable) */ __webpack_exports__["a"] = routerConfigFn;

function routerConfigFn(router) {
    var transitionService = router.transitionService;
    router.trace.enable(__WEBPACK_IMPORTED_MODULE_0_ui_router_core__["Category"].TRANSITION);
}
//# sourceMappingURL=router.config.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_tooltip__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_progressbar__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_tabs__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ui_router_ng2__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_game_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_config_config_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__game_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__game_control_game_control_component__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_main_game_main_game_component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_log_log_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_test_interface_test_interface_component__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_app_states__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_router_config__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__nursery_nursery_component__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__resource_list_resource_list_component__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__building_list_building_list_component__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__map_map_component__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__population_population_component__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__goal_list_goal_list_component__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__population_panel_population_panel_component__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__drag_drop_drag_drop_directive__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__drag_drop_drag_service_service__ = __webpack_require__(113);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppInjector; });
/* harmony export (immutable) */ __webpack_exports__["c"] = randomIntFromInterval;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return uuid; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


























var AppModule = (function () {
    function AppModule(injector) {
        this.injector = injector;
        AppInjector = this.injector;
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__game_component__["a" /* GameComponent */],
            __WEBPACK_IMPORTED_MODULE_11__game_control_game_control_component__["a" /* GameControl */],
            __WEBPACK_IMPORTED_MODULE_13_app_log_log_component__["a" /* LogComponent */],
            __WEBPACK_IMPORTED_MODULE_12_app_main_game_main_game_component__["a" /* MainGameComponent */],
            __WEBPACK_IMPORTED_MODULE_14_app_test_interface_test_interface_component__["a" /* TestInterfaceComponent */],
            __WEBPACK_IMPORTED_MODULE_18__resource_list_resource_list_component__["a" /* ResourceListComponent */],
            __WEBPACK_IMPORTED_MODULE_17__nursery_nursery_component__["a" /* NurseryComponent */],
            __WEBPACK_IMPORTED_MODULE_19__building_list_building_list_component__["a" /* BuildingListComponent */],
            __WEBPACK_IMPORTED_MODULE_20__map_map_component__["a" /* MapComponent */],
            __WEBPACK_IMPORTED_MODULE_21__population_population_component__["a" /* PopulationComponent */],
            __WEBPACK_IMPORTED_MODULE_22__goal_list_goal_list_component__["a" /* GoalListComponent */],
            __WEBPACK_IMPORTED_MODULE_23__population_panel_population_panel_component__["a" /* PopulationPanelComponent */],
            __WEBPACK_IMPORTED_MODULE_24__drag_drop_drag_drop_directive__["a" /* BloqHeadDraggableDirective */],
            __WEBPACK_IMPORTED_MODULE_24__drag_drop_drag_drop_directive__["b" /* BloqHeadDropTargetDirective */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_tooltip__["a" /* TooltipModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_progressbar__["a" /* ProgressbarModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_tabs__["a" /* TabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5_ui_router_ng2__["UIRouterModule"].forRoot({
                states: __WEBPACK_IMPORTED_MODULE_15_app_app_states__["a" /* APP_STATES */],
                useHash: true,
                otherwise: { state: 'main' },
                config: __WEBPACK_IMPORTED_MODULE_16_app_router_config__["a" /* routerConfigFn */],
            }),
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_4__angular_core__["c" /* CUSTOM_ELEMENTS_SCHEMA */]],
        providers: [__WEBPACK_IMPORTED_MODULE_8_app_game_service__["a" /* GameService */], __WEBPACK_IMPORTED_MODULE_13_app_log_log_component__["b" /* LogService */], __WEBPACK_IMPORTED_MODULE_9_app_config_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_25__drag_drop_drag_service_service__["a" /* DragService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ui_router_ng2__["UIView"]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_core__["d" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_core__["d" /* Injector */]) === "function" && _a || Object])
], AppModule);

var AppInjector;
function randomIntFromInterval(min, max, func) {
    if (func == null)
        func = Math.random;
    return Math.floor(func() * (max - min + 1) + min);
}
var uuid = {
    new: function () {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    },
    empty: function () {
        return '00000000-0000-0000-0000-000000000000';
    }
};
var _a;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 298:
/***/ (function(module, exports) {

module.exports = "<div class=\"player-box\">\r\n    <h3 class=\"box-title\">\r\n        <i class=\"fa fa-building\"></i> Hive Expansion\r\n    </h3>\r\n    <div class=\"player-content\">\r\n        <div class=\"building-list col-xs-12\">\r\n            <div class=\"scalable-list-button-big\" *ngFor=\"let building of _gameService.map.currentHive.buildings\">\r\n                <div *ngIf=\"building.getNextCost().length > 0\">\r\n                    <!--<div placement=\"bottom\" [tooltip]=\"costTooltip\" container=\"body\" #tool=\"bs-tooltip\" triggers=\"\" (click)=\"tool.toggle()\">-->\r\n                    <div placement=\"bottom\" [tooltip]=\"costTooltip\" container=\"body\">\r\n                        <button type=\"button\" [disabled]=\"!building.canBuild\" class=\"btn btn-xs btn-primary\" (click)=\"_gameService.map.currentHive.build(building)\">\r\n                            {{(building.name + ' (' + (building.gifted + building.purchased) + ')')}}\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n                <ng-template #costTooltip>\r\n\r\n                    <div style=\"text-align: left;\">\r\n                        <h5>{{building.description}}</h5>\r\n\r\n                        <p style=\"white-space:nowrap\">\r\n                            <span>Requires: </span>\r\n                            <span *ngFor=\"let cost of building.getNextCost()\">\r\n                                <i class=\"fa\" [ngClass]=\"cost.resource.icon\" [attr.data-rid]=\"cost.resource.rid\"></i>\r\n                                <!--data-attr=\"{{$ctrl.resourceTypes[cost.rid].attr}}\"-->\r\n                                <span>{{cost.amount}}</span>\r\n                            </span>\r\n                        </p>\r\n                    </div>\r\n\r\n                </ng-template>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 299:
/***/ (function(module, exports) {

module.exports = "<div ng-init=\"$ctrl.pauseScroll=false\">\r\n    <div class=\"nopadding col-xs-3\">\r\n        <div class=\"row topRow\">\r\n            <div class=\"col-xs-12 fullH\">\r\n                <bloqhead-log></bloqhead-log>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <bloqhead-goal-list></bloqhead-goal-list>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-xs-9 fullH nopadding\">\r\n        <ui-view></ui-view>\r\n    </div>\r\n    <nav class=\"navbar navbar-inverse navbar-fixed-bottom game-menu\">\r\n        <div class=\"container-fluid\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li><button class=\"btn btn-primary\" uiSref=\"main\">Main</button></li>\r\n                <li><button class=\"btn btn-primary\" uiSref=\"farm\">Farm</button></li>\r\n                <li><button class=\"btn btn-primary\" uiSref=\"achievements\">Achievements</button></li>\r\n                <li><button class=\"btn btn-primary\" uiSref=\"test\">Test Interface</button></li>\r\n\r\n            </ul>\r\n            <bloqhead-game-control class=\"navbar-brand navbar-right\"></bloqhead-game-control>\r\n        </div>\r\n    </nav>\r\n</div>"

/***/ }),

/***/ 300:
/***/ (function(module, exports) {

module.exports = "<div class=\"player-box\">\n    <h3 class=\"box-title\">\n        <div class=\"row\">\n            <div class=\"col-xs-9\">\n                <i class=\"fa fa-check-square-o\"></i> Goals\n            </div>\n            <div class=\"col-xs-3\">\n                <div class=\" pull-right\">\n                </div>\n            </div>\n        </div>\n    </h3>\n    <div class=\"player-content\">\n        <div class=\"row goal-container\">\n            <h4>Active Goals</h4>\n            <h4>Daily Goals</h4>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 301:
/***/ (function(module, exports) {

module.exports = "<div class=\"player-box\">\r\n    <h3 class=\"box-title\" ng-transclude=\"boxTitleHtml\">\r\n        <i class=\"fa fa-list\"></i> Log\r\n        <i class=\"pull-right fa\" ngClass=\"{{pauseScroll ? 'fa-play' : 'fa-pause'}}\" (click)=\"pauseScroll=!pauseScroll\" title=\"Autoscroll On/Off\"></i>\r\n    </h3>\r\n    <div class=\"player-content\">\r\n        <div class=\"log-component\">\r\n            <ul class=\"list-group\">\r\n                <li *ngFor=\"let item of _logService.messages\" ngClass=\"{{getLogClass(item.type)}}\">\r\n                    [<span>{{item.timestamp|date:'MM/dd HH:mm:ss'}}</span>]&nbsp;\r\n                    <span>{{item.message}}</span>\r\n                </li>\r\n                <li ngShow=\"scrolling\">\r\n                    <a id=\"scrollBottom\"></a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 302:
/***/ (function(module, exports) {

module.exports = "<div class=\"\">\r\n    <div class=\"row topRow\">\r\n        <div class=\"col-xs-4 fullH\">\r\n            <bloqhead-resource-list></bloqhead-resource-list>\r\n\r\n        </div>\r\n        <div class=\"col-xs-4 fullH\">\r\n            <bloqhead-building-list></bloqhead-building-list>\r\n        </div>\r\n\r\n        <div class=\"col-xs-4 fullH\">\r\n            <bloqhead-nursery-list></bloqhead-nursery-list>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\" id=\"bottomRow\">\r\n        <div class=\"col-xs-8 fullH\">\r\n            <bloqhead-map></bloqhead-map>\r\n        </div>\r\n        <div class=\"col-xs-4 fullH\">\r\n            <bloqhead-population></bloqhead-population>\r\n        </div>\r\n\r\n    </div>\r\n</div>"

/***/ }),

/***/ 303:
/***/ (function(module, exports) {

module.exports = "<div class=\"player-box\">\r\n    <h3 class=\"box-title\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <i class=\"fa fa-map\"></i> Map\r\n                <div class=\"pull-right\">\r\n                    {{fps|number:'1.2-2'}} FPS\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </h3>\r\n    <div class=\"player-content\">\r\n        <div class=\"row map-container\">\r\n            <div class=\"row map-container\" style=\"overflow: hidden;  position: relative;\">\r\n                <span *ngIf=\"!imagesLoaded\">Loading...<i class=\"fa fa-spinner fa-spin\"></i></span>\r\n                <div [hidden]=\"!imagesLoaded\">\r\n                    <!--<span id=\"beeimg\"></span>-->\r\n                    <div class=\"pull-left\">\r\n                        <span>ID <input type=\"checkbox\" [(ngModel)]=\"_gameService.map.grid.config.SHOW_HEX_ID\" /></span>\r\n                        <span>XY <input type=\"checkbox\" [(ngModel)]=\"_gameService.map.grid.config.SHOW_HEX_XY\" /></span>\r\n                    </div>\r\n                    <div class=\"btn-group pull-right\" style=\"z-index: 100;\" role=\"group\">\r\n                        <div class=\"btn btn-sm btn-info\" (click)=\"resetZoom()\"><i class=\"fa fa-arrows-alt\"></i></div>\r\n                        <div class=\"btn btn-sm btn-info\" (click)=\"zoomOut()\"><i class=\"fa fa-minus\"></i></div>\r\n                        <div class=\"btn btn-sm btn-info\" (click)=\"zoomIn()\"><i class=\"fa fa-plus\"></i></div>\r\n                    </div>\r\n\r\n                    <!--<canvas ng-show=\"$ctrl.loadPercent == 100\" id=\"map\" style=\"position:absolute;top:0px;left:0px;\" lvl-drop-target=\"true\" on-drag-start=\"$ctrl.onDragStart(dragId)\" on-drag-stop=\"$ctrl.onDragStop()\" on-drop=\"$ctrl.dropped(dragId, dropId, relativePos)\"></canvas>-->\r\n                    <canvas id=\"map\" style=\"position:absolute;top:0px;left:0px;\" bloqheadDropTarget [dropTargetId]=\"'forager'\" (onDragEnter)=\"dragEnter($event)\" (onDragLeave)=\"dragLeave($event)\" (onDrop)=\"dropped($event)\">\r\n                    </canvas>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 304:
/***/ (function(module, exports) {

module.exports = "<div class=\"player-box\">\r\n    <h3 class=\"box-title\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-3\">\r\n                <i class=\"icon-bee\"></i> Nursery\r\n            </div>\r\n            <div class=\"col-xs-3\">\r\n                [{{_gameService.map.currentHive.getNurseryCount()}} / {{_gameService.map.currentHive.nurseryLimit}}]\r\n            </div>\r\n            <div class=\"col-xs-6 pull-right\">\r\n\r\n            </div>\r\n        </div>\r\n        <!--[{{$ctrl.hive.getNurseryCount()}} / {{$ctrl.hive.getNurseryLimit()}}]-->\r\n    </h3>\r\n    <div class=\"player-content\">\r\n        <div class=\"row breeder-container\">\r\n            <div *ngFor=\"let egg of _gameService.map.currentHive.getBeesByType('egg')\">\r\n                <div class=\"bloqhead-component\">\r\n                    <h5>\r\n                        <div class=\"col-xs-12 mortal-name\">\r\n                            <span><s class=\"dead\" *ngIf=\"!isAlive(egg)\">{{egg.name}}</s></span>\r\n                            <span *ngIf=\"isAlive(egg)\">{{egg.name}}</span> &nbsp;\r\n                            <i class=\"fa icon-tombstone text-danger\" *ngIf=\"!isAlive(egg)\"></i><i class=\"fa {{trait.icon}} {{trait.style}}\" *ngFor=\"let trait of egg.traits\"></i>\r\n                        </div>\r\n                    </h5>\r\n                    <div class=\"row\">\r\n                        <div class=\"scalable-list-button\">\r\n                            <button class=\"btn btn-xs btn-primary\" (click)=\"assignBee(egg,BeeTypes.LARVA)\" [disabled]=\"!canFertilize(egg)\">Fertilize</button>\r\n                        </div>\r\n                        <div class=\"scalable-list-button\">\r\n                            <button class=\"btn btn-xs btn-primary\" (click)=\"assignBee(egg, BeeTypes.DRONE)\" [disabled]=\"!canBreed(egg)\">Make Drone</button>\r\n                        </div>\r\n                        <div class=\"scalable-list-button\">\r\n                            <button class=\"btn btn-xs btn-primary\" (click)=\"egg.die()\" [disabled]=\"!isAlive(egg)\">Consume</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div *ngFor=\"let larva of _gameService.map.currentHive.getBeesByType('larva')\">\r\n                <div class=\"bloqhead-component\">\r\n                    <h5>\r\n                        <div class=\"col-xs-12 mortal-name\">\r\n                            <span>{{larva.name}}</span>&nbsp;<i class=\"fa icon-tombstone\" *ngIf=\"!isAlive(larva)\"></i><i class=\"fa {{trait.icon}} {{trait.style}}\" *ngFor=\"let trait of larva.traits\"></i>\r\n                        </div>\r\n                    </h5>\r\n                    <div class=\"row\">\r\n                        <div class=\"scalable-list-button\">\r\n                            <button class=\"btn btn-xs btn-primary\" (click)=\"assignBee(larva,BeeTypes.QUEEN)\" [disabled]=\"!canBreed(larva)\">Make Queen</button>\r\n                        </div>\r\n                        <div class=\"scalable-list-button\">\r\n                            <button class=\"btn btn-xs btn-primary\" (click)=\"assignBee(larva,BeeTypes.WORKER)\" [disabled]=\"!canBreed(larva)\">Make Worker</button>\r\n                        </div>\r\n                        <div class=\"scalable-list-button\">\r\n                            <button class=\"btn btn-xs btn-primary\" (click)=\"larva.die()\" [disabled]=\"!isAlive(larva)\">Consume</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n\r\n            <!--<div ng-repeat=\"child in $ctrl.hive.getBeesByType('egg')\" class=\"col-xs-12 col-lg-12 animate-repeat\">\r\n                <bloqhead-bee mode=\"NURSE\" unit=\"child\" assign=\"$ctrl.decideFate($id, $type)\" can-breed=\"$ctrl.hive.getPopulationCount()<$ctrl.hive.getPopulationLimit()\"></bloqhead-bee>\r\n            </div>\r\n            <div ng-repeat=\"child in $ctrl.hive.getBeesByType('larva')\" class=\"col-xs-12 col-lg-12 animate-repeat\">\r\n                <bloqhead-bee mode=\"NURSE\" unit=\"child\" assign=\"$ctrl.decideFate($id, $type)\" can-breed=\"$ctrl.hive.getPopulationCount()<$ctrl.hive.getPopulationLimit()\"></bloqhead-bee>\r\n            </div>-->\r\n\r\n\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 305:
/***/ (function(module, exports) {

module.exports = "<div class=\"population-panel\">\n    <div class=\"row\">\n        <div class=\"row\" *ngFor=\"let bee of _gameService.map.currentHive.getBeesByType(this.filter.type)\" class=\"population-list animate-repeat\">\n            <div class=\"col-xs-12 col-sm-4\" bloqheadDraggable [data]=\"bee.id\" [dropTargetIds]=\"jids[bee.beetype]\" [attr.data-rid]=\"bee.id\">\n                <span>{{bee.name}}</span>&nbsp;<i class=\"fa {{trait.icon}} {{trait.style}}\" *ngFor=\"let trait of bee.traits\"></i>\n            </div>\n            <div class=\"col-xs-12 col-sm-8\" *ngIf=\"bee.workStatus\" [attr.data-rid]=\"bee.workStatus.rid || 'NONE'\">\n                <div class=\"progress progress-custom\">\n                    <progressbar [max]=\"bee.workStatus.max\" [value]=\"bee.workStatus.value\" [animate]=\"false\">\n                        <span class=\"work-status\">{{bee.workStatus.action}}</span>\n                        <span class=\"work-amounts\">{{bee.workStatus.value|number:'1.1-1'}} / {{bee.workStatus.max|number:'1.1-1'}}</span>\n                    </progressbar>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 306:
/***/ (function(module, exports) {

module.exports = "<div class=\"player-box\">\r\n    <h3 class=\"box-title\">\r\n        <div class=\"row\">\r\n            <div class=\"col-xs-12\">\r\n                <i class=\"fa fa-globe\"></i> Hive#{{_gameService.map.currentHiveID}} Population [{{_gameService.map.currentHive.getPopulationCount()}} / {{_gameService.map.currentHive.populationLimit}}]\r\n            </div>\r\n        </div>\r\n    </h3>\r\n    <div class=\"player-content\">\r\n        <div class=\"row population-container\">\r\n            <tabset type=\"pills\">\r\n\r\n                <tab heading=\"Overview\" customClass=\"tab-list-button\">\r\n                    <h4>Queens</h4>\r\n                    <population-panel [filter]=\"{type:BeeTypes.QUEEN, traits:[]}\"></population-panel>\r\n                    <h4>Workers</h4>\r\n                    <population-panel [filter]=\"{type:BeeTypes.WORKER, traits:[]}\"></population-panel>\r\n                    <h4>Drones</h4>\r\n                    <population-panel [filter]=\"{type:BeeTypes.DRONE, traits:[]}\"></population-panel>\r\n                </tab>\r\n                <tab heading=\"Custom View\" customClass=\"tab-list-button\">\r\n                    <ul>\r\n                        <li *ngFor=\"let bee of _gameService.map.currentHive.bees\">{{bee.name}}</li>\r\n                    </ul>\r\n                </tab>\r\n            </tabset>\r\n            <!--<div class=\"col-xs-12\">\r\n                <uib-tabset type=\"pills\">\r\n\r\n                    <div uib-tab template-url=\"tab.html\" heading=\"Gender View\">\r\n                        <div class=\"col-xs-6 col-lg-6\">\r\n                            <h4>Queens</h4>\r\n                            <bloqhead-population-panel population=\"$ctrl.hive\" filter=\"{type:'queen',traits:[]}\"></bloqhead-population-panel>\r\n                            <h4>Workers</h4>\r\n                            <bloqhead-population-panel population=\"$ctrl.hive\" filter=\"{type:'worker',traits:[]}\"></bloqhead-population-panel>\r\n                            <h4>Drones</h4>\r\n                            <bloqhead-population-panel population=\"$ctrl.hive\" filter=\"{type:'drone',traits:[]}\"></bloqhead-population-panel>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div uib-tab template-url=\"tab.html\" heading=\"Custom View\">\r\n\r\n                        <div class=\"col-xs-12\">\r\n                            <div class=\"row\">\r\n                                <div class=\"col-xs-12\">\r\n                                    <div class=\"btn btn-xs btn-primary trait-filter-item\" ng-repeat=\"c in $ctrl.criteria\" ng-click=\"$ctrl.deleteCriteria($index)\">\r\n                                        <div ng-if=\"c.type='trait'\">\r\n                                            <span ng-bind=\"c.val.name\"></span>\r\n                                            <button type=\"button\" class=\"close\" ng-click=\"$ctrl.deleteCriteria($index)\"><span>×</span></button>\r\n                                        </div>\r\n                                    </div>\r\n                                    <button class=\"btn btn-xs btn-primary\" type=\"button\" href=\"javascript:void(0);\" ng-click=\"$ctrl.openTraitSelector()\">Add Filter</button>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-xs-12\">\r\n                                    <bloqhead-population-panel population=\"$ctrl.hive\" filter=\"$ctrl.getCustomFilter()\"></bloqhead-population-panel>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n\r\n\r\n                    </div>\r\n                </uib-tabset>\r\n            </div>-->\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 307:
/***/ (function(module, exports) {

module.exports = "<div class=\"player-box\">\r\n    <h3 class=\"box-title\">\r\n        <i class=\"fa fa-th\"></i> Resources\r\n    </h3>\r\n    <div class=\"player-content\">\r\n        <div class=\"resource-list col-xs-12\">\r\n            <div class=\"row\" *ngFor=\"let resource of _gameService.map.currentHive.resources\" [attr.data-rid]=\"resource.rid\" bloqheadDropTarget [enabled]=\"resource.jid !== 'forager'\" [dropTargetId]=\"resource.jid\" (onDrop)=\"dropped($event, resource.jid)\">\r\n                <div class=\"col-xs-12 col-sm-3\">\r\n                    <h5 tooltip=\"{{resource.desc}}\" container=\"body\" placement=\"right\">{{resource.name}}</h5>\r\n                </div>\r\n                <div class=\"col-xs-12 col-sm-9\">\r\n                    <div class=\"progress progress-custom\" *ngIf=\"resource.max !== -1\">\r\n                        <progressbar [max]=\"resource.max\" [value]=\"resource.owned\">\r\n                            <span class=\"workers\"><i class=\"fa\" [ngClass]=\"resource.icon\"></i> {{getWorkerCount(resource.jid)}}</span>\r\n                            <span class=\"amounts\">{{resource.owned}} / {{resource.max}}</span>\r\n                        </progressbar>\r\n                    </div>\r\n                    <div class=\"progress progress-custom\" *ngIf=\"resource.max === -1\">\r\n                        <progressbar [max]=\"0\" [value]=\"0\">\r\n                            <span class=\"workers\"><i class=\"fa\" [ngClass]=\"resource.icon\"></i> {{getWorkerCount(resource.jid)}}</span>\r\n                            <span class=\"amounts\">{{resource.owned}}</span>\r\n                        </progressbar>\r\n                    </div>\r\n                </div>\r\n                <!--<div class=\"col-xs-12 col-sm-9\">\r\n                    <div class=\"progress progress-custom\" ng-if=\"resource.max !== -1\">\r\n                        <div class=\"progress-bar\" role=\"progressbar\" (aria-valuenow)=\"{{resource.owned}}\" (aria-valuemin)=\"0\" (aria-valuemax)=\"{{resource.max}}\" ng-style=\"{width: (100*(resource.owned/resource.max)) + '%'}\">\r\n                            <span class=\"workers\">\r\n                        <i class=\"fa\" ng-class=\"$ctrl.getWorkerIcon(key)\"></i>\r\n                        <span ng-bind=\"$ctrl.getWorkerRate(key)\"></span>/s\r\n\r\n                            </span>\r\n                            <span class=\"amounts\" ng-bind=\"value[0] + ' / ' + value[1]\"></span>\r\n\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"progress progress-custom\" ng-if=\"value[1] === -1\">\r\n                        <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"1\" aria-valuemin=\"0\" aria-valuemax=\"1\" ng-style=\"{width: '100%'}\">\r\n                            <span class=\"workers\">\r\n                                <i class=\"fa\" ng-class=\"$ctrl.getWorkerIcon(key)\"></i>\r\n                        <span ng-bind=\"$ctrl.getWorkerRate(key)\"></span>/s\r\n                            </span>\r\n                            <span class=\"amounts\" ng-bind=\"value[0]\"></span>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>-->\r\n\r\n            </div>\r\n        </div>\r\n\r\n\r\n\r\n        <!--\r\n<table class=\"table table-condensed\">\r\n    <tbody>\r\n        <tr ng-repeat=\"(key, value) in $ctrl.resources\" ng-show=\"value[1] > 0\">\r\n            <td ng-bind=\"$ctrl.resourceTypes[key]\"></td>\r\n            <td ng-bind=\"(value[0] + ' / ' + value[1])\"></td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n-->\r\n    </div>\r\n</div>"

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__traits_config__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buildingTypes_config__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resourceTypes_config__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_config_abilities_config__ = __webpack_require__(203);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConfigService = (function () {
    function ConfigService() {
        this.buildTraits();
        console.log(this.TRAITS);
    }
    ConfigService.prototype.getRequiredGenesRecursive = function (trait) {
        if (trait.requiredTraits != null) {
            var _loop_1 = function (req) {
                reqTrait = __WEBPACK_IMPORTED_MODULE_1__traits_config__["a" /* DEFAULT_TRAITS */].find(function (t) { return t.id === req; });
                if (this_1.checked.indexOf(req) === -1)
                    this_1.getRequiredGenesRecursive(reqTrait);
                for (var _i = 0, _a = reqTrait.genes; _i < _a.length; _i++) {
                    var g = _a[_i];
                    trait.genes.push(Object.assign({}, g));
                }
            };
            var this_1 = this, reqTrait;
            for (var _i = 0, _a = trait.requiredTraits; _i < _a.length; _i++) {
                var req = _a[_i];
                _loop_1(req);
            }
        }
        this.checked.push(trait.id);
    };
    ConfigService.prototype.buildTraits = function () {
        this.TRAITS = [];
        this.checked = [];
        for (var _i = 0, DEFAULT_TRAITS_1 = __WEBPACK_IMPORTED_MODULE_1__traits_config__["a" /* DEFAULT_TRAITS */]; _i < DEFAULT_TRAITS_1.length; _i++) {
            var t = DEFAULT_TRAITS_1[_i];
            this.getRequiredGenesRecursive(t);
            this.TRAITS.push(new __WEBPACK_IMPORTED_MODULE_1__traits_config__["b" /* Trait */](t));
        }
    };
    ConfigService.prototype.getTraits = function (genome) {
        var ret = [];
        for (var _i = 0, _a = this.TRAITS; _i < _a.length; _i++) {
            var trait = _a[_i];
            var met = true;
            for (var _b = 0, _c = trait.genes; _b < _c.length; _b++) {
                var gene = _c[_b];
                var on = genome.getGene(gene.chromosome, gene.gene);
                if (on !== gene.value)
                    met = false;
            }
            if (met) {
                ret.push(Object.assign({}, trait));
            }
        }
        return ret;
    };
    ConfigService.prototype.getAbilities = function (traits) {
        var ret = __WEBPACK_IMPORTED_MODULE_4_app_config_abilities_config__["a" /* DEFAULT_ABILITIES */].map(function (a) { return new __WEBPACK_IMPORTED_MODULE_4_app_config_abilities_config__["b" /* Ability */](a); });
        var modifiers = ret.reduce(function (total, current) {
            return total[current.abilityId] = {
                add: 0,
                percent: 0
            }, total;
        }, {});
        for (var _i = 0, traits_1 = traits; _i < traits_1.length; _i++) {
            var trait = traits_1[_i];
            for (var _a = 0, _b = trait.mods; _a < _b.length; _a++) {
                var mod = _b[_a];
                modifiers[mod.abilityId].add += mod.add || 0;
                modifiers[mod.abilityId].percent += mod.percent && (mod.percent / 100) || 0;
            }
        }
        var _loop_2 = function (m) {
            var a = ret.find(function (r) { return r.abilityId === m; });
            a.value = a.baseValue;
            a.value += modifiers[m].add;
            a.value *= (1 + modifiers[m].percent);
        };
        for (var m in modifiers) {
            _loop_2(m);
        }
        return ret;
    };
    ConfigService.prototype.getDefaultBuildings = function () {
        return __WEBPACK_IMPORTED_MODULE_2__buildingTypes_config__["a" /* DEFAULT_BUILDINGS */].map(function (b) { return new __WEBPACK_IMPORTED_MODULE_2__buildingTypes_config__["b" /* Building */](b); });
    };
    ConfigService.prototype.getDefaultResources = function () {
        return __WEBPACK_IMPORTED_MODULE_3__resourceTypes_config__["a" /* DEFAULT_RESOURCES */].map(function (r) { return new __WEBPACK_IMPORTED_MODULE_3__resourceTypes_config__["b" /* Resource */](r); });
    };
    ConfigService.prototype.getResourceById = function (rid) {
        return __WEBPACK_IMPORTED_MODULE_3__resourceTypes_config__["a" /* DEFAULT_RESOURCES */].find(function (r) { return r.rid === rid; });
    };
    return ConfigService;
}());
ConfigService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ConfigService);

//# sourceMappingURL=config.service.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LogService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LogType;
(function (LogType) {
    LogType[LogType["GENERAL"] = 0] = "GENERAL";
    LogType[LogType["BREED"] = 1] = "BREED";
    LogType[LogType["ACHIEVEMENT"] = 2] = "ACHIEVEMENT";
    LogType[LogType["WORK"] = 3] = "WORK";
})(LogType || (LogType = {}));
var LogMessage = (function () {
    /**
     *
     */
    function LogMessage(value) {
        this.type = value.type;
        this.timestamp = value.timestamp;
        this.message = value.message;
    }
    return LogMessage;
}());
var LogService = (function () {
    /**
     *
     */
    function LogService() {
        this.maxMessages = 500;
        this.messages = [];
        this.clearLog("Welcome to Genetix!");
    }
    LogService.prototype.clearLog = function (initMessage) {
        this.messages = [];
        if (initMessage != null)
            this.logGeneralMessage(initMessage);
    };
    LogService.prototype.logGeneralMessage = function (message) {
        this.messages.push(new LogMessage({ type: LogType.GENERAL, timestamp: Date.now(), message: message }));
        if (this.messages.length > this.maxMessages)
            this.messages.splice(0, 1);
        //$rootScope.$emit('newMessageEvent', self.messages);
    };
    ;
    LogService.prototype.logBreedMessage = function (message) {
        this.messages.push({ type: LogType.BREED, timestamp: Date.now(), message: message });
        if (this.messages.length > this.maxMessages)
            this.messages.splice(0, 1);
        //$rootScope.$emit('newMessageEvent', self.messages);
    };
    ;
    LogService.prototype.logAchievementMessage = function (message) {
        this.messages.push({ type: LogType.ACHIEVEMENT, timestamp: Date.now(), message: message });
        if (this.messages.length > this.maxMessages)
            this.messages.splice(0, 1);
        //$rootScope.$emit('newMessageEvent', self.messages);
    };
    ;
    LogService.prototype.logWorkMessage = function (message) {
        this.messages.push({ type: LogType.WORK, timestamp: Date.now(), message: message });
        if (this.messages.length > this.maxMessages)
            this.messages.splice(0, 1);
        //$rootScope.$emit('newMessageEvent', self.messages);
    };
    ;
    return LogService;
}());
LogService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], LogService);

var LogComponent = (function () {
    function LogComponent(_logService) {
        this._logService = _logService;
    }
    LogComponent.prototype.ngOnInit = function () {
        this.pauseScroll = false;
    };
    LogComponent.prototype.ngOnDestroy = function () {
    };
    LogComponent.prototype.getLogClass = function (type) {
        var prefix = 'list-group-item-';
        var a = '';
        switch (type) {
            case LogType.GENERAL:
                a = 'color-general';
                break;
            case LogType.ACHIEVEMENT:
                a = 'color-achievement';
                break;
            case LogType.BREED:
                a = 'color-breed';
                break;
            case LogType.WORK:
                a = 'color-work';
                break;
            default:
                a = prefix + 'none';
                break;
        }
        return a;
    };
    ;
    return LogComponent;
}());
LogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
        selector: 'bloqhead-log',
        template: __webpack_require__(301),
    }),
    __metadata("design:paramtypes", [LogService])
], LogComponent);

//# sourceMappingURL=log.component.js.map

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(185);


/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_config_config_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_classes_genome_class__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_app_module__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_log_log_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeeTypes; });
/* unused harmony export BaseBee */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Queen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Worker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Drone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Egg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Larva; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var BeeTypes = {
    QUEEN: 'queen',
    DRONE: 'drone',
    WORKER: 'worker',
    LARVA: 'larva',
    EGG: 'egg',
};
var BaseBee = (function () {
    function BaseBee(config) {
        this._configService = __WEBPACK_IMPORTED_MODULE_3_app_app_module__["b" /* AppInjector */].get(__WEBPACK_IMPORTED_MODULE_0_app_config_config_service__["a" /* ConfigService */]);
        this._logService = __WEBPACK_IMPORTED_MODULE_3_app_app_module__["b" /* AppInjector */].get(__WEBPACK_IMPORTED_MODULE_4_app_log_log_component__["b" /* LogService */]);
    }
    BaseBee.prototype.update = function (config) {
        this.id = config && config.id || this.id || '0';
        this.pos = config && config.pos || this.pos || 'A1';
        this.tripStart = config && config.tripStart || this.tripStart || null;
        this.tripEnd = config && config.tripEnd || this.tripEnd || null;
        this.tripElaspedTime = config && config.tripElaspedTime || this.tripElaspedTime || 0;
        this.tripTotalTime = config && config.tripTotalTime || this.tripTotalTime || 0;
        this.waitingAtResource = (config && config.waitingAtResource != null) ? config.waitingAtResource : ((this.waitingAtResource != null) ? this.waitingAtResource : true);
        this.dt = config && config.dt || this.dt || new Date().getTime();
        this.queenParentId = config && config.queenParentId || this.queenParentId || null;
        this.droneParentId = config && config.droneParentId || this.droneParentId || null;
        this.generation = config && config.generation || this.generation || 0;
        this.setJob(config && config.jid || this.jid || __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].IDLE, config && config.jobStep || this.jobStep || null);
        this.msSinceWork = config && config.msSinceWork || this.msSinceWork || 0;
        this.dead = (config && config.dead != null) ? config.dead : this.dead != null ? this.dead : false;
        this.nodeIds = config && config.nodeIds || this.nodeIds || [];
        this.isMoving = config && config.isMoving || false;
        this.harvesting = config && config.harvesting || false;
        this.baskets = null;
        if (this.baskets === null) {
            this.baskets = {};
            this.baskets[__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].NECTAR] = 0;
            this.baskets[__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].POLLEN] = 0;
            this.baskets[__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].WATER] = 0;
        }
        //this.nodes = this.nodes || [];
        this.nodeIndex = config && config.nodeIndex || this.nodeIndex || 0;
        this.beeMutationChance = config && config.beeMutationChance || this.beeMutationChance || 0.005;
        this.genome = new __WEBPACK_IMPORTED_MODULE_1_app_classes_genome_class__["a" /* Genome */](config && config.genome || null, this.hasPairs);
        this.traits = this._configService.getTraits(this.genome);
        this.abilities = this._configService.getAbilities(this.traits);
        this.name = this.beetype + this.id;
        this.workStatus = null;
    };
    BaseBee.prototype.getState = function () {
        return {
            id: this.id,
            beetype: this.beetype,
            pos: this.pos,
            tripStart: this.tripStart,
            tripEnd: this.tripEnd,
            tripElaspedTime: this.tripElaspedTime,
            tripTotalTime: this.tripTotalTime,
            waitingAtResource: this.waitingAtResource,
            dt: this.dt,
            queenParentId: this.queenParentId,
            droneParentId: this.droneParentId,
            generation: this.generation,
            jid: this.jid,
            jobStep: this.jobStep,
            msSinceWork: this.msSinceWork,
            nodeIndex: this.nodeIndex,
            beeMutationChance: this.beeMutationChance,
            dead: this.dead,
            nodeIds: this.nodeIds,
            /* not needed for save, uncomment for debugging */
            // traits: this.traits,            
            // abilities: this.abilities,
            genome: this.genome,
            isMoving: this.isMoving,
            harvesting: this.harvesting,
            baskets: this.baskets
        };
    };
    BaseBee.prototype.die = function () {
        this.dead = true;
    };
    BaseBee.prototype.getAbility = function (abilityId) {
        return this.abilities.find(function (a) { return a.abilityId === abilityId; });
    };
    BaseBee.prototype.mature = function (type) {
        throw new Error('Method not implemented.');
    };
    BaseBee.prototype.fertilizeEgg = function (bee) {
        throw new Error('Method not implemented.');
    };
    BaseBee.prototype.hatch = function (type) {
        throw new Error('Method not implemented.');
    };
    BaseBee.prototype.mate = function (bee) {
        throw new Error('Method not implemented.');
    };
    BaseBee.prototype.storageAmount = function (rid) {
        var amt;
        switch (rid) {
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].NECTAR:
                amt = this.getAbility(__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["d" /* AbilityID */].STR_NECTAR).value;
                break;
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].POLLEN:
                amt = this.getAbility(__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["d" /* AbilityID */].STR_POLLEN).value;
                break;
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].WATER:
                amt = this.getAbility(__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["d" /* AbilityID */].STR_WATER).value;
                break;
        }
        return amt - this.baskets[rid];
    };
    BaseBee.prototype.storageFull = function () {
        return this.storageAmount(__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].NECTAR) + this.storageAmount(__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].POLLEN) + this.storageAmount(__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].WATER) <= 0;
    };
    BaseBee.prototype.setJob = function (jid, jobStep) {
        if (this.jid === jid)
            return;
        var job = __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["a" /* JOB_TYPES */].find(function (j) { return j.jid === jid; });
        if (job.beetypes.indexOf(this.beetype) === -1) {
            return;
        }
        this.workStatus = null;
        this.jid = jid;
        this.job = job;
        this.msSinceWork = 0;
        this.jobStep = jobStep;
        this.nodes = [];
        this.nodeIds = [];
        this.nodeIndex = 0;
        this.isMoving = false;
    };
    BaseBee.prototype.addWaypointNode = function (hexagon) {
        if (this.jid !== __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].FORAGER)
            this.setJob(__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].FORAGER);
        if (this.nodeIds.indexOf(hexagon.id) === -1) {
            this.nodes.push(hexagon);
            this.nodeIds.push(hexagon.id);
        }
    };
    BaseBee.prototype.removeWaypointNode = function (hexagon) {
        this.nodes.splice(this.nodes.indexOf(hexagon), 1);
        this.nodeIds.splice(this.nodeIds.indexOf(hexagon.id), 1);
    };
    BaseBee.prototype.doSpawn = function (ms, hive) {
        throw new Error('Method not implemented.');
    };
    BaseBee.prototype.doProduce = function (ms, hive) {
        var rate = this.getAbility(this.jobStep.rate).value;
        var ya = this.getAbility(this.jobStep.yield);
        this.msSinceWork += ms;
        if (this.msSinceWork >= rate) {
            while (this.msSinceWork >= rate) {
                var spent = [];
                var success = false;
                for (var _i = 0, _a = this.jobStep.cost; _i < _a.length; _i++) {
                    var c = _a[_i];
                    var ca = this.getAbility(c);
                    success = (hive.changeResource(ca.c_rid, -1 * ca.value) >= 0);
                    if (success) {
                        spent.push({ rid: ca.c_rid, amount: ca.value });
                    }
                    else
                        break;
                }
                if (success) {
                    success = hive.changeResource(ya.rid, ya.value) > 0;
                }
                // we either didn't have enough resources, or we couldn't make the 
                // resource, refund anything that was spent
                if (!success) {
                    for (var _b = 0, spent_1 = spent; _b < spent_1.length; _b++) {
                        var s = spent_1[_b];
                        hive.changeResource(s.rid, s.amount);
                    }
                    this.msSinceWork = 0; //no need to keep working
                }
                else {
                    this.msSinceWork -= rate;
                }
            }
        }
        this.workStatus = { action: this.job.name, value: this.msSinceWork / 1000, max: rate / 1000, rid: ya.rid };
    };
    BaseBee.prototype.doTravel = function (ms, hive, map) {
        var mr = this.nodes[this.nodeIndex].mapResource;
        if (this.tripStart !== this.pos) {
            this.isMoving = true;
            var rate = this.getAbility(this.jobStep.rate).value;
            this.tripStart = this.pos;
            this.tripElaspedTime = 0;
            this.tripEnd = this.nodes[this.nodeIndex].id;
            this.tripTotalTime = map.grid.GetHexDistance(this.nodes[this.nodeIndex], map.grid.GetHexById(this.tripStart)) * rate;
        }
        this.tripElaspedTime += ms;
        if (this.tripElaspedTime >= this.tripTotalTime) {
            this.isMoving = false;
            this.jobStep = this.job.actions.find(function (a) { return a.action === __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["b" /* JobAction */].COLLECT; });
            this.msSinceWork = 0;
            this.tripStart = null;
            this.pos = this.nodes[this.nodeIndex].id;
            mr.queueHarvest(this);
        }
        var rid = mr.water > 0 ? __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].WATER : __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].POLLEN;
        this.workStatus = { action: "Travelling to " + this.tripEnd, value: this.tripElaspedTime / 1000, max: this.tripTotalTime / 1000, rid: rid };
    };
    BaseBee.prototype.doCollect = function (ms, hive, map) {
        if (this.waitingAtResource) {
            this.workStatus = { action: "Waiting at resource", value: 0, max: 0 };
            return;
        }
        var resourceNode = this.nodes[this.nodeIndex].mapResource;
        var rate = this.getAbility(this.jobStep.rate).value * resourceNode.harvestMultiplier;
        this.msSinceWork += ms;
        while (this.msSinceWork >= rate) {
            var collected = false;
            var rid = __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].NECTAR;
            if (resourceNode.getAvailable(rid) > 0 && this.storageAmount(rid) > 0) {
                this.baskets[rid] += resourceNode.collect(rid, 1);
                collected = true;
            }
            rid = __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].POLLEN;
            if (!collected && resourceNode.getAvailable(rid) > 0 && this.storageAmount(rid) > 0) {
                this.baskets[rid] += resourceNode.collect(rid, 1);
                collected = true;
            }
            rid = __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].WATER;
            if (!collected && resourceNode.getAvailable(rid) > 0 && this.storageAmount(rid) > 0) {
                this.baskets[rid] += resourceNode.collect(rid, 1);
                collected = true;
            }
            if (!collected) {
                this._logService.logWorkMessage(this.name + " done harvesting.");
                this.harvesting = false;
                this.nodes[this.nodeIndex].mapResource.doneHarvesting();
                this.msSinceWork -= rate;
                if (this.nodeIndex + 1 === this.nodes.length) {
                    this.nodeIndex = 0;
                    this.goHome(0, hive, map);
                }
                else if (this.storageFull()) {
                    this.goHome(0, hive, map);
                }
                else {
                    this.jobStep = this.job.actions.find(function (a) { return a.action === __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["b" /* JobAction */].TRAVEL; });
                    this.nodeIndex++;
                }
            }
            else {
                this.msSinceWork -= rate;
            }
        }
        this.workStatus = { action: "Collecting", value: this.msSinceWork / 1000, max: rate / 1000 };
    };
    BaseBee.prototype.doDeposit = function (ms, hive) {
        var rate = this.getAbility(this.jobStep.rate).value;
        this.msSinceWork += ms;
        if (this.msSinceWork >= rate) {
            var deposited = false;
            var rid = __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].NECTAR;
            if (this.baskets[rid] > 0) {
                if (hive.changeResource(rid, 1) >= 0) {
                    this.baskets[rid]--;
                    deposited = true;
                }
            }
            rid = __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].POLLEN;
            if (this.baskets[rid] > 0) {
                if (hive.changeResource(rid, 1) >= 0) {
                    this.baskets[rid]--;
                    deposited = true;
                }
            }
            rid = __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].WATER;
            if (this.baskets[rid] > 0) {
                if (hive.changeResource(rid, 1) >= 0) {
                    this.baskets[rid]--;
                    deposited = true;
                }
            }
            if (!deposited) {
                this.jobStep = this.job.actions.find(function (a) { return a.action === __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["b" /* JobAction */].TRAVEL; });
            }
            this.msSinceWork -= rate;
        }
        this.workStatus = { action: "Depositing", value: this.msSinceWork / 1000, max: rate / 1000 };
    };
    BaseBee.prototype.goHome = function (ms, hive, map) {
        if (this.tripStart !== this.pos) {
            this.jobStep = null;
            var rate = this.getAbility(__WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["d" /* AbilityID */].SPD_FLY).value;
            this.tripStart = this.pos;
            this.tripElaspedTime = 0;
            this.tripEnd = hive.pos;
            this.tripTotalTime = map.grid.GetHexDistance(map.grid.GetHexById(this.tripEnd), map.grid.GetHexById(this.tripStart)) * rate;
            this.isMoving = true;
        }
        this.tripElaspedTime += ms;
        if (this.tripElaspedTime >= this.tripTotalTime) {
            this.isMoving = false;
            //var jobType = jobTypes[this.jid];
            this.jobStep = this.job.actions[0];
            this.msSinceWork = 0;
            this.tripStart = null;
            this.pos = this.tripEnd;
            //var jobStepIndex = this.jobStepIndex;
            if (this.job.jid === __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].FORAGER) {
                this._logService.logWorkMessage(this.name + ' returned home.');
                this.jobStep = this.job.actions.find(function (a) { return a.action === __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["b" /* JobAction */].DEPOSIT; });
            }
        }
        if (this.job.jid === __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].IDLE)
            this.workStatus = { action: this.job.name, value: 0, max: 0 };
        else
            this.workStatus = { action: "Going Home", value: this.tripElaspedTime / 1000, max: this.tripTotalTime / 1000 };
    };
    BaseBee.prototype.doWork = function (ms, hive, map) {
        if (!this.jobStep) {
            this.goHome(ms, hive, map);
            return;
        }
        switch (this.jid) {
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].BREEDER:
                if (this.jobStep.action === __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["b" /* JobAction */].SPAWN)
                    this.doSpawn(ms, hive);
                break;
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].NURSE:
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].PRODUCER_FOOD:
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].PRODUCER_HONEY:
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].BUILDER:
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].UNDERTAKER:
                if (this.jobStep.action === __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["b" /* JobAction */].PRODUCE) {
                    this.doProduce(ms, hive);
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].FORAGER:
                if (this.jobStep.action === __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["b" /* JobAction */].TRAVEL) {
                    this.doTravel(ms, hive, map);
                }
                else if (this.jobStep.action === __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["b" /* JobAction */].COLLECT) {
                    this.doCollect(ms, hive, map);
                }
                else if (this.jobStep.action === __WEBPACK_IMPORTED_MODULE_2_app_config_jobTypes_config__["b" /* JobAction */].DEPOSIT) {
                    this.doDeposit(ms, hive);
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["b" /* JobID */].GUARD:
            default:
                this.msSinceWork = 0;
                break;
        }
    };
    return BaseBee;
}());

var Queen = (function (_super) {
    __extends(Queen, _super);
    function Queen(config) {
        var _this = _super.call(this, config) || this;
        _this.layEgg = function (newId) {
            var eggGenome = this.genome.getEggGenome();
            var egg = new Egg({
                id: newId,
                dt: new Date().getTime(),
                generation: this.generation + 1,
                genome: eggGenome,
                queenParentId: this.id,
                beeMutationChance: this.beeMutationChance,
                pos: this.pos
            });
            egg.update();
            return egg;
        };
        _this.beetype = BeeTypes.QUEEN;
        _this.hasPairs = true;
        _this.minDrones = 10;
        _this.droneGenomes = [];
        _this.droneIds = [];
        _this.update(config);
        return _this;
    }
    Queen.prototype.update = function (config) {
        if (config && config.droneGenomes) {
            for (var _i = 0, _a = config.droneGenomes; _i < _a.length; _i++) {
                var g = _a[_i];
                this.droneGenomes.push(new __WEBPACK_IMPORTED_MODULE_1_app_classes_genome_class__["a" /* Genome */](g, false));
            }
            this.droneIds = config.droneIds;
        }
        _super.prototype.update.call(this, config);
    };
    Queen.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.droneGenomes = this.droneGenomes;
        state.droneIds = this.droneIds;
        return state;
    };
    Queen.prototype.fertilizeEgg = function (bee) {
        if (bee.beetype !== BeeTypes.EGG)
            throw new Error("Can only fertilize eggs.");
        var d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_app_app_module__["c" /* randomIntFromInterval */])(0, this.droneGenomes.length - 1);
        var droneGenome = this.droneGenomes[d];
        var newGenome = bee.genome.fertilize(droneGenome);
        var child = new Larva({
            id: bee.id,
            dt: new Date().getTime(),
            generation: this.generation + 1,
            genome: newGenome,
            queenParentId: this.id,
            droneParentId: this.droneIds[d],
            beeMutationChance: this.beeMutationChance,
            pos: this.pos
        });
        return child;
    };
    Queen.prototype.canLayEggs = function (hive) {
        // temporary
        return hive.getNurseryCount() < hive.nurseryLimit && this.droneGenomes.length >= this.minDrones;
    };
    Queen.prototype.mate = function (drone) {
        if (drone.beetype !== BeeTypes.DRONE)
            throw new Error("Queen cannot mate with non-drone bees");
        this.droneGenomes.push(drone.genome);
        this.droneIds.push(drone.id);
        drone.die();
    };
    Queen.prototype.doSpawn = function (ms, hive) {
        var eggRate = this.getAbility(this.jobStep.rate).value;
        if (this.canLayEggs(hive)) {
            this.msSinceWork += ms;
            while (this.msSinceWork >= eggRate) {
                var egg = this.layEgg(hive.getNextId());
                hive.bees.push(egg);
                this.msSinceWork -= eggRate;
            }
        }
        this.workStatus = { action: "Laying Eggs", value: this.msSinceWork / 1000, max: eggRate / 1000, rid: __WEBPACK_IMPORTED_MODULE_5_app_config_types_config__["a" /* ResourceID */].ROYAL_JELLY };
    };
    return Queen;
}(BaseBee));

var Worker = (function (_super) {
    __extends(Worker, _super);
    function Worker(config) {
        var _this = _super.call(this, config) || this;
        _this.beetype = BeeTypes.WORKER;
        _this.hasPairs = true;
        _this.update(config);
        return _this;
    }
    Worker.prototype.update = function (config) {
        _super.prototype.update.call(this, config);
    };
    return Worker;
}(BaseBee));

var Drone = (function (_super) {
    __extends(Drone, _super);
    function Drone(config) {
        var _this = _super.call(this, config) || this;
        _this.beetype = BeeTypes.DRONE;
        _this.hasPairs = false;
        _this.update(config);
        return _this;
    }
    Drone.prototype.update = function (config) {
        _super.prototype.update.call(this, config);
    };
    return Drone;
}(BaseBee));

var Egg = (function (_super) {
    __extends(Egg, _super);
    function Egg(config) {
        var _this = _super.call(this, config) || this;
        _this.beetype = BeeTypes.EGG;
        _this.hasPairs = false;
        _this.update(config);
        return _this;
    }
    Egg.prototype.update = function (config) {
        _super.prototype.update.call(this, config);
    };
    Egg.prototype.hatch = function (type) {
        if (type === BeeTypes.DRONE) {
            return new Drone({
                id: this.id,
                generation: this.generation,
                genome: this.genome,
                beeMutationChance: this.beeMutationChance,
                pos: this.pos
            });
        }
    };
    return Egg;
}(BaseBee));

var Larva = (function (_super) {
    __extends(Larva, _super);
    function Larva(config) {
        var _this = _super.call(this, config) || this;
        _this.beetype = BeeTypes.LARVA;
        _this.hasPairs = true;
        _this.update(config);
        return _this;
    }
    Larva.prototype.update = function (config) {
        _super.prototype.update.call(this, config);
    };
    Larva.prototype.mature = function (type) {
        if (type === BeeTypes.WORKER) {
            return new Worker({
                id: this.id,
                genome: this.genome,
                generation: this.generation,
                beeMutationChance: this.beeMutationChance,
                pos: this.pos
            });
        }
        else if (type === BeeTypes.QUEEN) {
            return new Queen({
                id: this.id,
                genome: this.genome,
                generation: this.generation,
                beeMutationChance: this.beeMutationChance,
                pos: this.pos
            });
        }
    };
    return Larva;
}(BaseBee));

//# sourceMappingURL=bee.class.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Point; });
var Point = (function () {
    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }
    return Point;
}());

//# sourceMappingURL=point.class.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Resource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_RESOURCES; });

var Resource = (function () {
    function Resource(resourceType) {
        this.rid = resourceType.rid;
        this.name = resourceType.name;
        this.desc = resourceType.desc;
        this.jid = resourceType.jid;
        this.icon = resourceType.icon;
        this.owned = resourceType.owned || 0;
        this.max = resourceType.max || 0;
    }
    return Resource;
}());

var DEFAULT_RESOURCES = [
    {
        rid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].NECTAR,
        name: "Nectar",
        desc: "Used for creating honey.",
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].FORAGER,
        icon: "fa-tint"
    },
    {
        rid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].POLLEN,
        name: "Pollen",
        desc: "Used for food creation.",
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].FORAGER,
        icon: "icon-pollen"
    },
    {
        rid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].WATER,
        name: "Water",
        desc: "Used for food creation and breeding.",
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].FORAGER,
        icon: "icon-water"
    },
    {
        rid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].FOOD,
        name: "Food",
        desc: "Nurishment for the hive.",
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].PRODUCER_FOOD,
        icon: "fa-apple"
    },
    {
        rid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].HONEY,
        name: "Honey",
        desc: "Used for making royal jelly and food and in building.",
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].PRODUCER_HONEY,
        icon: "icon-honeypot"
    },
    {
        rid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].ROYAL_JELLY,
        name: "Royal Jelly",
        desc: "Used for breeding new queens.",
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].NURSE,
        icon: "icon-jar"
    },
    {
        rid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].WAX,
        name: "Wax",
        desc: "Used in honeycomb construction.",
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].BUILDER,
        icon: "icon-tools"
    },
    {
        rid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].DEADBEES,
        name: "Dead bees",
        desc: "Dead bees that take up space, convert them to food.",
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].UNDERTAKER,
        icon: "icon-tombstone",
        max: -1
    },
    {
        rid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["a" /* ResourceID */].DEFENSE,
        name: "Defense",
        desc: "Hive defensive ability.",
        jid: __WEBPACK_IMPORTED_MODULE_0_app_config_types_config__["b" /* JobID */].GUARD,
        icon: "icon-shield",
        max: -1
    }
];
//# sourceMappingURL=resourceTypes.config.js.map

/***/ })

},[384]);
//# sourceMappingURL=main.bundle.js.map