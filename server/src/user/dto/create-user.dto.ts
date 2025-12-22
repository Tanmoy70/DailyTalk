import { IsEmail, IsNotEmpty, MinLength } from "class-validator";



export class CreateUserDto{
    @IsEmail()
    @IsNotEmpty()
    user_email:string


    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    user_name: string;
}