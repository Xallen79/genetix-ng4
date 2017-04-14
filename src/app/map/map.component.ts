import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { GameService } from 'app/game.service';
import { IGridConfig } from 'app/classes/hexmap/grid.class';
import { Subscription } from "rxjs/Subscription";

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
  stopClick: boolean = false;
  dontTranslate: boolean = false;
  needsResize: boolean = false;
  mapconfig: IGridConfig;
  hexsize_min: number = 20;
  hexsize_max: number = 160;
  gameLoopSub: Subscription;
  imagesLoaded: boolean = false;
  fps: number = 0;
  smoothing: number = 0.99;
  constructor(public _gameService: GameService) {
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

    // add mouse events
    this.canvas.parentElement.addEventListener('mousewheel', (event) => { this.mousewheel(event) }, false);
    this.canvas.parentElement.addEventListener('mousedown', (event) => { this.mousedown(event); }, false);
    document.addEventListener('mouseup', (event) => { this.mouseup(event); }, false);
    this.canvas.addEventListener('click', (event) => { this.click(event); }, false);

    this.gameLoopSub = this._gameService.animationEvent$.subscribe(elapsedMs => {
      console.log(elapsedMs);
      if (elapsedMs > 0) {
        var instantFps = 1 / (elapsedMs / 1000);
        if (this.fps === 0) this.fps = instantFps;
        this.fps = (this.fps * this.smoothing) + (instantFps * (1.0 - this.smoothing));
      }
      this.draw();
    });

    this.setHexSize(this.mapconfig.hexConfig.HEIGHT);
  }

  // mouse events
  mousewheel(event) {
    if (event.wheelDeltaY > 0)
      this.zoomIn();
    if (event.wheelDeltaY < 0)
      this.zoomOut();
    return false;
  }

  mousedown(event) {
    document.addEventListener('mousemove', this.bound_mousemove, false);
  }
  mouseup(event) {
    document.removeEventListener('mousemove', this.bound_mousemove, false);
    setTimeout(() => {
      this.stopClick = false;
    });
  }

  click(event) {
    if (!this.stopClick)
      this._gameService.map.mapClicked(event.offsetX, event.offsetY);

    return false;
  };
  mousemove(event) {
    this.moveCanvasBy(event.movementX, event.movementY);
    if (event.movementX !== 0 || event.movementY !== 0)
      this.stopClick = true;
  };
  bound_mousemove = evt => this.mousemove(evt);// necessary for removeEventListener to work

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
}
