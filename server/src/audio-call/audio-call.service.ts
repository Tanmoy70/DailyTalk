import { Injectable } from '@nestjs/common';
import { SignalingGateway } from 'src/signaling/signaling.gateway';
import { randomUUID } from 'crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AudioCallService {
  constructor(
    private readonly signalingGateway: SignalingGateway,
    private readonly userService: UserService,
  ) {}

  async startCall(userId: number) {

    const user = await this.userService.findById(userId);
    if (!user) return { message: 'User not found' };

    const socketId = user.socket_id;
    if (!socketId) return { message: 'No socketId found for user' };


    const availableSockets = Object.keys(this.signalingGateway.onlineUsers)
      .filter(id => id !== socketId && !this.signalingGateway.activeCalls[id]);

    if (availableSockets.length === 0) {
      return { message: 'No online users available' };
    }


    const partnerSocketId = availableSockets[Math.floor(Math.random() * availableSockets.length)];
    const partnerId = this.signalingGateway.onlineUsers[partnerSocketId];

  
    const roomId = randomUUID();
    this.signalingGateway.activeCalls[socketId] = roomId;
    this.signalingGateway.activeCalls[partnerSocketId] = roomId;

    const userASocket = this.signalingGateway.server.sockets.sockets.get(socketId);
    const userBSocket = this.signalingGateway.server.sockets.sockets.get(partnerSocketId);

    if (userASocket) userASocket.join(roomId);
    if (userBSocket) userBSocket.join(roomId);


    this.signalingGateway.server.to(partnerSocketId).emit('partner-found', {
      roomId,
      partnerId: user.id,
    });

    this.signalingGateway.server.to(socketId).emit('partner-found', {
      roomId,
      partnerId,
    });

    return { message: 'Partner found', roomId };
  }

  endCallByRoomId(roomId: string) {
  if (!roomId) return;

  this.signalingGateway.server.to(roomId).emit('call-ended', { roomId });

  Object.keys(this.signalingGateway.activeCalls).forEach(sid => {
    if (this.signalingGateway.activeCalls[sid] === roomId) {
      delete this.signalingGateway.activeCalls[sid];
      const socket = this.signalingGateway.server.sockets.sockets.get(sid);
      if (socket) socket.leave(roomId);
    }
  });
}

}
