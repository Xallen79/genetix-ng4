import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";


@Injectable()
export class DragService {
    data: any;
    dropTargetIds: Array<string>;
    onDragStart = new Subject<any>();
    onDragEnd = new Subject<any>();


}