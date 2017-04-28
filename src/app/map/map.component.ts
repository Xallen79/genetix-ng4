import { Component, OnInit, AfterViewChecked, OnDestroy, HostListener, NgZone } from '@angular/core';
import { GameService } from 'app/game.service';
import { IGridConfig } from 'app/classes/hexmap/grid.class';
import { Subscription } from "rxjs/Subscription";
import { Point } from "app/classes/hexmap/point.class";

@Component({
  selector: 'bloqhead-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  private _imageList: string[] = [
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
  images: HTMLImageElement[];
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  mouseMoved: boolean;
  dontTranslate: boolean = false;
  needsResize: boolean = false;
  mapconfig: IGridConfig;
  hexsize_min: number = 20;
  hexsize_max: number = 160;
  gameLoopSub: Subscription;
  imagesLoaded: boolean = false;
  fps: number = 0;
  smoothing: number = 0.99;
  constructor(public _gameService: GameService, private ngZone: NgZone) {
    this.mapconfig = _gameService.map.grid.config;

  }

  ngOnInit() {
    this.loadImages(this._imageList)
      .then((images) => {

        var i = images.reduce(function (total, current) {
          return total[current.name] = current.image, total;
        }, {});

        this.images = i;
        this.imagesLoaded = true;

        this.setupCanvas();

        // document.getElementById('beeimg').appendChild(this.images['bee-2.svg']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  ngOnDestroy() {
    this.gameLoopSub.unsubscribe();
  }

  loadImage(imageName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let img: HTMLImageElement = new Image(100, 100);
      img.src = 'assets/images/map/' + imageName;
      resolve({ name: imageName, image: img });
    });
  }

  loadImages(imageNames: string[]): Promise<any[]> {
    let promises: Promise<any>[] = imageNames.map(this.loadImage);
    return Promise.all(promises);
  }

  setupCanvas() {
    this.canvas = <HTMLCanvasElement>document.getElementById('map');
    this.context = this.canvas.getContext('2d');
    this.gameLoopSub = this._gameService.animationEvent$.subscribe(elapsedMs => {
      this.ngZone.runOutsideAngular(() => {
        if (elapsedMs > 0) {
          var instantFps = 1 / (elapsedMs / 1000);
          if (this.fps === 0) this.fps = instantFps;
          this.fps = (this.fps * this.smoothing) + (instantFps * (1.0 - this.smoothing));
        }
        if (!this._gameService.map.beeImg)
          this._gameService.map.beeImg = this.images['bee.svg'];
        this.draw();
      });

    });

    this.setHexSize(this.mapconfig.hexConfig.HEIGHT);
  }

  @HostListener('mousewheel', ['$event'])
  mousewheel(event: MouseWheelEvent) {
    if (event.wheelDeltaY > 0)
      this.zoomIn();
    if (event.wheelDeltaY < 0)
      this.zoomOut();
    return false;
  }

  @HostListener('mousedown', ['$event'])
  mousedown(event: MouseEvent) {
    if ((<Element>event.target).id === 'map') {
      if (event.button === 0)
        this.mouseMoved = false;

      return false;
    }
  }

  @HostListener('mouseup', ['$event'])
  mouseup(event: MouseEvent) {
    if (event.button === 0 && !this.mouseMoved && (<Element>event.target).id === 'map')
      this._gameService.map.mapClicked(event.offsetX, event.offsetY);
    return false;
  }



  @HostListener('mousemove', ['$event'])
  mousemove(event: MouseEvent) {
    if ((<Element>event.target).id === 'map') {
      if (event.buttons === 1 && (Math.abs(event.movementX) > 0.1 || Math.abs(event.movementY) > 0.1)) {
        this.mouseMoved = true;
        this.moveCanvasBy(event.movementX, event.movementY);
      }
      return false;
    }

  }

  zoomIn() {
    if (this.mapconfig.hexConfig.HEIGHT < this.hexsize_max)
      this.setHexSize(this.mapconfig.hexConfig.HEIGHT * 1.1);
  };
  zoomOut() {
    if (this.mapconfig.hexConfig.HEIGHT > this.hexsize_min)
      this.setHexSize(this.mapconfig.hexConfig.HEIGHT / 1.1);
  };
  resetZoom() {
    // this should probably be coded to center the map
    this.setHexSize(50);
    this.moveCanvas(0, 0);
    this.dontTranslate = true;
  };


  moveCanvas(x, y) {
    this.canvas.style.left = x + 'px';
    this.canvas.style.top = y + 'px';
    this._gameService.map.mapMoved(x, y);
  };

  moveCanvasBy(x, y) {
    var l = parseFloat(this.canvas.style.left) + x;
    var t = parseFloat(this.canvas.style.top) + y;
    this.moveCanvas(l, t);
  };


  setHexSize(size) {
    this.mapconfig = this._gameService.map.grid.setHexSizeByHeight(size);
    this._gameService.map.redraw = true;
    this.needsResize = true;
  };

  draw() {
    if (typeof this.canvas === 'undefined' || typeof this.context === 'undefined')
      return;

    if (this.needsResize) {
      this.needsResize = false;
      this.resizeCanvas();
    }

    this._gameService.map.drawMap(this.context);
  }

  resizeCanvas() {

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
  }

  dragEnter(event) {
    this._gameService.map.setRangeGraph(event.dragData);
  }

  dragLeave(event) {
    this._gameService.map.setRangeGraph(null);
  }

  dropped(event) {

    var hex = this._gameService.map.grid.GetHexAt(new Point(event.nativeEvent.offsetX, event.nativeEvent.offsetY));
    if (hex && (hex.inRange || hex.inRoute) && hex.mapResource)
      this._gameService.map.getBeeById(event.dragData).addWaypointNode(hex);

    this._gameService.map.setRangeGraph(null);
  }
}
