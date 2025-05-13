// notification.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
//Create a WebSocket gateway (a communication tunnel). Allow any frontend (like React) to connect without blocking because of CORS.
@WebSocketGateway({ cors: true })
//This class is a WebSocket gateway, and I want to react when someone connects to it
export class NotificationGateway implements OnGatewayConnection {
  //Hey NestJS, give me direct access to the socket server so I can emit messages to specific users later
  @WebSocketServer()
  server: Server;
  //When someone connects to the WebSocket server, run this function. I’ll call the person who connects the client
  handleConnection(client: Socket) {
    //From the very first connection request, get the userId from the query string (React frontend sends it)
    const userId = client.handshake.query.userId as string;
    //If the userId exists, add this client into a private room named after the userId. This lets me send messages to only that user later
    if (userId) {
      client.join(userId);
      console.log(`Client connected and joined room: ${userId}`);
    }
  }
  //“Hey server, send this payload only to the WebSocket room for that specific userId. Call the event newNotification
  notifyUser(userId: string, payload: any) {
    this.server.to(userId).emit('newNotification', payload);
  }
}
