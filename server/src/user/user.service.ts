import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { plainToInstance } from "class-transformer";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async registerUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepo.findOne({ where: { user_email: dto.user_email } });
    if (existingUser) throw new ConflictException('User already registered');

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(dto.password, salt);

    const socketId = uuidv4();

    const newUser = this.userRepo.create({
      ...dto,
      password: hashedPwd,
      socket_id: socketId,
    });

    const savedUser = await this.userRepo.save(newUser);
    const savedUserWithoutPwd = plainToInstance(User, savedUser);

    return savedUserWithoutPwd;
  }

  async getAllTypesOfUser(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findById(userId: number): Promise<User | null> {
    return await this.userRepo.findOne({ where: { id: userId } });
  }

  async updateSocketId(userId: number, socketId: string | null): Promise<void> {
  await this.userRepo.update({ id: userId }, { socket_id: socketId });
}

}
