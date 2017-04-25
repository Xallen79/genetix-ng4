import { Component, Injectable, OnInit } from '@angular/core';



enum LogType {
    GENERAL,
    BREED,
    ACHIEVEMENT,
    WORK
}
class LogMessage {
    type: LogType;
    timestamp: number;
    message: string;
    /**
     *
     */
    constructor(value: any) {
        this.type = value.type;
        this.timestamp = value.timestamp;
        this.message = value.message;

    }
}
@Injectable()
export class LogService {
    maxMessages: number = 500;
    messages: LogMessage[];
    enabled: boolean = true;
    /**
     *
     */
    constructor() {
        this.messages = [];
        this.clearLog("Welcome to Genetix!");
    }
    clearLog(initMessage?: string) {
        this.messages = [];
        if (initMessage != null) this.logGeneralMessage(initMessage);
    }
    logGeneralMessage(message) {
        if (this.enabled) {
            this.messages.push(new LogMessage({ type: LogType.GENERAL, timestamp: Date.now(), message: message }));
            if (this.messages.length > this.maxMessages)
                this.messages.splice(0, 1);
        }

    };
    logBreedMessage(message) {
        if (this.enabled) {
            this.messages.push({ type: LogType.BREED, timestamp: Date.now(), message: message });
            if (this.messages.length > this.maxMessages)
                this.messages.splice(0, 1);
        }
    };
    logAchievementMessage(message) {
        if (this.enabled) {
            this.messages.push({ type: LogType.ACHIEVEMENT, timestamp: Date.now(), message: message });
            if (this.messages.length > this.maxMessages)
                this.messages.splice(0, 1);
        }
    };
    logWorkMessage(message) {
        if (this.enabled) {
            this.messages.push({ type: LogType.WORK, timestamp: Date.now(), message: message });
            if (this.messages.length > this.maxMessages)
                this.messages.splice(0, 1);
        }
    };
}

@Component({
    selector: 'bloqhead-log',
    templateUrl: './log.component.html',
})
export class LogComponent implements OnInit {
    pauseScroll: boolean;
    constructor(public _logService: LogService) {
    }
    ngOnInit() {
        this.pauseScroll = false;
    }

    ngOnDestroy() {

    }

    getLogClass(type) {
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
}
