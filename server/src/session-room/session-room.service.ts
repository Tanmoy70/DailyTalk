import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SessionRoom } from "./entities/session-room.entity";
import { Repository } from "typeorm";
import { SessionMembershipDetail } from "src/session-membership/entities/session-membership-details.entity";
import { User } from "src/user/entities/user.entity";


@Injectable()
export class SessionRoomService {
  constructor(
    @InjectRepository(SessionRoom) private roomRepo: Repository<SessionRoom>,
    @InjectRepository(SessionMembershipDetail) private membershipRepo: Repository<SessionMembershipDetail>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  async createRoom(name: string, description: string, logo: string, createdBy: number) {
    const existing = await this.roomRepo.findOne({ where: { name } })

    if (existing) {
      throw new BadRequestException("Room is already exist")
    }

    const user = await this.userRepo.findOne({ where: { id: createdBy } })

    if (!user) {
      throw new NotFoundException("User not found");

    }

    const room = this.roomRepo.create({
      name,
      description,
      logo,
      created_by: createdBy,
    })

    await this.roomRepo.save(room)
    return { message: "Room created successfully", room };
  }



  async getListOfRooms() {
      const rooms = await this.roomRepo.find({
      relations: ["createdBy"],
      order: { created_at: "DESC" },
    });
    return rooms;
  }

  async joinRoom() {

  }
}