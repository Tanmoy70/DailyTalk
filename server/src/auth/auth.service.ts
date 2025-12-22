import { Injectable, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signIn(username: string, plainPassword: string): Promise<any> {
        const user = await this.userRepo.findOne({
            where: { user_name: username }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const hasMatched = bcrypt.compareSync(plainPassword, user?.password);

        if (!hasMatched) {
            throw new UnauthorizedException();
        }

        // JWT authentication
        const { password, ...userDetails } = user
        const payload = { sub: userDetails.id, username: userDetails.user_name, email: userDetails.user_email }

        return {
            success: true,
            message: 'user logged in successfully...',
            accessToken: await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                expiresIn: Number(this.configService.get<string>('ACCESS_TOKEN_EXPIRE'))
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
                expiresIn: Number(this.configService.get<string>('REFRESH_TOKEN_EXPIRE'))
            })
        }
    }

    
}