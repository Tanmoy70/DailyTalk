import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionRoom } from 'src/session-room/entities/session-room.entity';
import { SessionRoomController } from './session-room.controller';
import { SessionRoomService } from './session-room.service';
import { SessionMembershipDetail } from 'src/session-membership/entities/session-membership-details.entity';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([SessionRoom,SessionMembershipDetail,User])],
  controllers: [SessionRoomController],
  providers: [SessionRoomService],
})
export class SessionRoomModule {}
