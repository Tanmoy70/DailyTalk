import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"




export class CreateSessionRoomDto{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsString()
    @IsNotEmpty()
    logo:string;

  @IsNumber()
  @IsOptional()
  createdBy?: number;
}