import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";




@Controller('user')
export class UserController{
    constructor (private readonly userService:UserService){}
    @Post('register')
    register(@Body() createUserDto:CreateUserDto){
        return this.userService.registerUser(createUserDto)
    }

    @Get("getAllTypesOfUser")
   async getAllTypesOfUser(){
        return  await this.userService.getAllTypesOfUser()
    }


    
}