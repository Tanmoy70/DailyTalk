import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SessionRoom } from "src/session-room/entities/session-room.entity";
import { SessionMembershipDetail } from "src/session-membership/entities/session-membership-details.entity";
import { Exclude } from "class-transformer";

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum FluencyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  NATIVE = 'Native',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  user_name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  user_email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gender: Gender;

  @Column({ type: 'varchar', length: 50, nullable: true })
  fluencyLevel: FluencyLevel;

  @Column({ type: 'boolean', default: true })
  isOnline: boolean;

  @Column({ type: 'boolean', default: false })
  isOffline: boolean;

  @Column({ type: 'boolean', default: false })
  onCall: boolean;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
  updated_at: Date;

  @OneToMany(() => SessionRoom, (sessionRoom) => sessionRoom.createdBy)
  sessionRooms: SessionRoom[];

  @OneToMany(() => SessionMembershipDetail, (membership) => membership.user)
  memberships: SessionMembershipDetail[];

  @Column({ type: 'varchar', nullable: true })
  socket_id: string | null;

}
