import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';

interface CallData {
  from: string;
  to: string;
  sdp?: any;
  candidate?: any;
}

@WebSocketGateway({ cors: true })
export class SignalingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly userService: UserService) { }


  onlineUsers: { [socketId: string]: string } = {};
  activeCalls: { [socketId: string]: string } = {};

  handleConnection(client: Socket) {
    console.log(`User connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    const userId = this.onlineUsers[client.id];
    console.log(`User disconnected: ${userId} (${client.id})`);

    if (userId) {

      await this.userService.updateSocketId(Number(userId), null);
    }

    delete this.onlineUsers[client.id];
    delete this.activeCalls[client.id];
  }


  @SubscribeMessage('register-user')
  async registerUser(
    @MessageBody() body: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = body.userId;
    const realSocketId = client.id;


    await this.userService.updateSocketId(Number(userId), realSocketId);

    this.onlineUsers[realSocketId] = userId;

    console.log(`User registered: ${userId} (${realSocketId})`);


    client.emit('registration-successful', {
      status: 'OK',
      userId,
      socketId: realSocketId,
      message: `Successfully registered user ${userId}`,
    });
  }


  @SubscribeMessage('offer')
  sendOffer(@MessageBody() data: CallData) {
    const targetSocket = Object.keys(this.onlineUsers).find(
      (key) => this.onlineUsers[key] === data.to,
    );
    if (targetSocket) {
      this.server.to(targetSocket).emit('offer', { from: data.from, sdp: data.sdp });
    }
  }


  @SubscribeMessage('answer')
  sendAnswer(@MessageBody() data: CallData) {
    const targetSocket = Object.keys(this.onlineUsers).find(
      (key) => this.onlineUsers[key] === data.to,
    );
    if (targetSocket) {
      this.server.to(targetSocket).emit('answer', { from: data.from, sdp: data.sdp });
    }
  }


  @SubscribeMessage('ice-candidate')
  sendCandidate(@MessageBody() data: CallData) {
    const targetSocket = Object.keys(this.onlineUsers).find(
      (key) => this.onlineUsers[key] === data.to,
    );
    if (targetSocket) {
      this.server
        .to(targetSocket)
        .emit('ice-candidate', { from: data.from, candidate: data.candidate });
    }
  }


  @SubscribeMessage('end-call')
  endCall(@MessageBody() body: { roomId: string }, @ConnectedSocket() client: Socket) {
    const roomId = body.roomId;
    console.log(`Call ended in room: ${roomId}`);


    this.server.to(roomId).emit('call-ended', { roomId, message: "Call has been end" });


    for (const [socketId, rId] of Object.entries(this.activeCalls)) {
      if (rId === roomId) delete this.activeCalls[socketId];
    }

    client.leave(roomId);
  }

// for testing purpose
  @SubscribeMessage('get-users')
  getOnlineUsers() {
    console.log(this.onlineUsers);
  }

}
