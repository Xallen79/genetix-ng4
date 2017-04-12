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
        this.messages.push(new LogMessage({ type: LogType.GENERAL, timestamp: Date.now(), message: message }));
        if (this.messages.length > this.maxMessages)
            this.messages.splice(0, 1);
        //$rootScope.$emit('newMessageEvent', self.messages);
    };
    logBreedMessage(message) {
        this.messages.push({ type: LogType.BREED, timestamp: Date.now(), message: message });
        if (this.messages.length > this.maxMessages)
            this.messages.splice(0, 1);
        //$rootScope.$emit('newMessageEvent', self.messages);
    };
    logAchievementMessage(message) {
        this.messages.push({ type: LogType.ACHIEVEMENT, timestamp: Date.now(), message: message });
        if (this.messages.length > this.maxMessages)
            this.messages.splice(0, 1);
        //$rootScope.$emit('newMessageEvent', self.messages);
    };
    logWorkMessage(message) {
        this.messages.push({ type: LogType.WORK, timestamp: Date.now(), message: message });
        if (this.messages.length > this.maxMessages)
            this.messages.splice(0, 1);
        //$rootScope.$emit('newMessageEvent', self.messages);
    };

    // self.SubscribeNewMessageEvent = function(scope, callback) {
    //     var handler = $rootScope.$on('newMessageEvent', callback.bind(this));
    //     scope.$on('$destroy', handler);
    //     $rootScope.$emit('newMessageEvent', self.messages);
    // };
}

@Component({
    selector: 'bloqhead-log',
    templateUrl: './log.component.html',
})
export class LogComponent implements OnInit {
    pauseScroll: boolean;
    constructor(private _logService: LogService) {
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
