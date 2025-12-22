import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SessionRoom } from "src/session-room/entities/session-room.entity";
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'session_membership_details' }) 
export class SessionMembershipDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  room_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => SessionRoom, (sessionRoom) => sessionRoom.memberships)
  @JoinColumn({ name: 'room_id' })
  sessionRoom: SessionRoom;

  @ManyToOne(() => User, (user) => user.memberships)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'NOW()' }) 
  joined_at: Date;

  @Column({ type: 'varchar', length: 1, default: 'Y' }) 
  is_active: string;
}
