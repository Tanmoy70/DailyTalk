import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { SessionMembershipDetail } from "src/session-membership/entities/session-membership-details.entity";

@Entity({ name: 'session_rooms' }) 
export class SessionRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  logo: string;

  @Column({ type: 'timestamp', default: () => 'NOW()' }) 
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
  updated_at: Date;

  @Column({ type: 'int' })
  created_by: number;

  @ManyToOne(() => User, (user) => user.sessionRooms)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToMany(() => SessionMembershipDetail, (membership) => membership.sessionRoom)
  memberships: SessionMembershipDetail[];
}
