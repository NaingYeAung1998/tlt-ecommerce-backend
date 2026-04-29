import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PrintService {
    @WebSocketServer()
    server: Server;

    sendPrintJobToClient(receiptData: any) {
        this.server.emit('print-receipt', receiptData);
    }
}