import { Module } from '@nestjs/common';
import { AudioCallService } from './audio-call.service';
import { SignallingModule } from 'src/signaling/signaling.module';
import {AudioCallController} from './audio-call.controller'
import { UserModule } from 'src/user/user.module';
// audio call module
@Module({
  imports: [SignallingModule,UserModule],
  controllers: [AudioCallController],
  providers: [AudioCallService],
})
export class AudioCallModule {}
