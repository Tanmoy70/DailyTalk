import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guards";
import { TokenBlacklistService } from "./token-blacklist.service";

@Controller('auth')
export class AuthController {
        
    constructor(private readonly authService: AuthService, private blacklistService: TokenBlacklistService) {}


    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.user_name, signInDto.password)
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    signOut(@Req() req: Request) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (token) {
            this.blacklistService.add(token)
        }

        return { message: 'Successfully logged out' };
    }
}