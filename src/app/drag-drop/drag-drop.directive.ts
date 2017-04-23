import { Directive, Injectable, ElementRef, Output, EventEmitter, Input, OnInit, OnDestroy, HostListener, NgZone } from '@angular/core';
import { AppInjector, uuid } from "app/app.module";
import { DragService } from "app/drag-drop/drag-service.service";
import { Subscription } from "rxjs/Subscription";



@Directive({
    selector: '[bloqheadDraggable]',
    host: {
        '[draggable]': 'true'
    }
})
export class BloqHeadDraggableDirective implements OnInit {

    @Input() dropTargetIds: Array<string>;
    @Input() data?: any;
    @Input() dragClass: string;

    @Output() onDragStart: EventEmitter<any> = new EventEmitter();
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

    private element: HTMLElement;
    private dragService;

    constructor(refEl: ElementRef) {
        this.element = <HTMLElement>refEl.nativeElement;
        this.dragService = AppInjector.get(DragService);
    }


    ngOnInit(): void {
        if (!this.data) this.data = uuid.new();
    }

    @HostListener('dragstart', ['$event'])
    dragStart(e) {
        var oe = e.orignalEvent || e;

        if (oe.dataTransfer)
            oe.dataTransfer.setData('text/plain', this.data);

        this.element.classList.add(this.dragClass || 'lvl-moving');

        this.dragService.dragData = this.data;
        this.dragService.dropTargetIds = this.dropTargetIds;

        oe.stopPropagation();
        this.onDragStart.emit(oe);
        this.dragService.onDragStart.next();


    }

    @HostListener('dragend', ['$event'])
    dragEnd(e) {
        this.element.classList.remove(this.dragClass || 'lvl-moving');
        var oe = e.originalEvent || e;
        this.dragService.onDragEnd.next();
        this.onDragEnd.emit(oe);
        oe.stopPropagation();
        oe.preventDefault();
    }
}


@Directive({
    selector: '[bloqheadDropTarget]'
})
export class BloqHeadDropTargetDirective implements OnInit, OnDestroy {

    @Input() overClass: string;
    @Input() targetClass: string;
    @Input() dropTargetId: string;
    @Input() enabled: boolean = true;

    @Output() onDragOver: EventEmitter<any> = new EventEmitter();
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();
    @Output() onDrop: EventEmitter<any> = new EventEmitter();

    dragStartEvent: Subscription;
    dragEndEvent: Subscription;

    private element: HTMLElement;
    private dragService;

    constructor(refEl: ElementRef, private ngZone: NgZone) {
        this.element = <HTMLElement>refEl.nativeElement;
        this.dragService = AppInjector.get(DragService);
    }

    ngOnInit(): void {
        this.overClass = this.overClass || 'lvl-over';
        this.targetClass = this.targetClass || 'lvl-target';
        this.dragStartEvent = this.dragService.onDragStart.subscribe(() => {
            if (this.allowDrop()) {
                this.element.classList.add(this.targetClass);
            }
        });
        this.dragEndEvent = this.dragService.onDragEnd.subscribe(() => {
            this.element.classList.remove(this.overClass, this.targetClass);
        });

        this.ngZone.runOutsideAngular(() => {
            this.element.addEventListener('dragover', (e) => {
                this.dragOver(e);
            });
        });
    }
    ngOnDestroy(): void {
        this.dragStartEvent.unsubscribe();
        this.dragEndEvent.unsubscribe();
    }

    //@HostListener('dragover', ['$event'])
    dragOver(e) {

        var oe = e.originalEvent || e;
        if (this.allowDrop()) {
            oe.preventDefault();
            if (oe.dataTransfer) oe.dataTransfer.dropEffect = 'move';
            this.onDragOver.emit(oe);
            return false;
        }


    }
    @HostListener('dragenter', ['$event'])
    dragEnter(e) {

        if (this.allowDrop()) {
            this.element.classList.add(this.overClass);
        }
        var oe = e.originalEvent || e;
        oe.preventDefault();
        oe.stopPropagation();
        this.onDragEnter.emit({ nativeEvent: oe, dragData: this.dragService.dragData });

    }
    @HostListener('dragleave', ['$event'])
    dragLeave(e) {

        var oe = e.originalEvent || e;
        this.element.classList.remove(this.overClass);
        oe.preventDefault();
        this.onDragLeave.emit({ nativeEvent: oe, dragData: this.dragService.dragData });
    }
    @HostListener('drop', ['$event'])
    drop(e) {
        var oe = e.originalEvent || e;
        oe.preventDefault();
        oe.stopPropagation();
        this.dragService.onDragEnd.next();
        var relativePos = {
            x: oe.clientX - this.element.offsetLeft,
            y: oe.clientY - this.element.offsetTop
        };
        this.onDrop.emit({ nativeEvent: oe, dragData: this.dragService.dragData, relativePos: relativePos });
    }

    allowDrop(): boolean {
        return this.enabled && this.dragService.dropTargetIds.indexOf(this.dropTargetId) !== -1;
    }

}
