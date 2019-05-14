import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { OnModuleInit, Inject } from '@nestjs/common';
import { UserService } from '../../../common/interface/api.interface';
import { ClentServe } from '../serve/client.serve';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(3001, { namespace: 'daka' })
export class EventsGateway implements OnModuleInit {
    TYPE_ENUM = {
        ONE: 0,
        ALL: 1
    }
    @WebSocketServer() server;
    private userService: UserService;
    constructor(@Inject(ClentServe) private readonly clentServe: ClentServe) {
    }

    onModuleInit() {
        this.userService = this.clentServe.client.getService<UserService>(
            "UserService"
        );
    }

    @SubscribeMessage('join')
    async onRoomJoin(client, data) {
        const event = 'join';
        try {
            const roomName = this.getRoomName(data.type, data.name);
            client.join(roomName);
            await this.userService.joinRoom({
                userId: data.res.userId,
                room: roomName
            }).toPromise();
            return Observable.create(observer =>
                observer.next({
                    event, data: {
                        code: 0
                    }
                })
            );
        } catch (error) {
            console.log(error)
            return Observable.create(observer =>
                observer.next({
                    event, data: {
                        code: 1,
                        error: error
                    }
                })
            );
        }
    }


    @SubscribeMessage('leave')
    onRoomLeave(client, data: any): void {
        client.leave(this.getRoomName(data.type, data.name));
    }

    @SubscribeMessage('message')
    async onMessage(client, data) {
        const event = 'message';
        try {
            const roomName = this.getRoomName(data.type, data.name);
            client.broadcast.to(roomName).emit('receiveMsg', data.res);
            await this.userService.sendMessage({
                room: roomName,
                type: data.type,
                userId: data.res.userId,
                text: data.res.text
            }).toPromise();
            return Observable.create(observer =>
                observer.next({
                    event, data: {
                        code: 0
                    }
                })
            );
        } catch (error) {
            return Observable.create(observer =>
                observer.next({
                    event, data: {
                        code: 1,
                        error: error
                    }
                })
            );
        }
    }

    getRoomName(type: number, name: string) {
        switch (type) {
            case this.TYPE_ENUM.ONE:
                return `${type}-${name}`;
            case this.TYPE_ENUM.ALL:
                return `${type}-${name}`;
            default:
                return '';
        }
    }

}
