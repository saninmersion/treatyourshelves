import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email: string;
    
    @IsNotEmpty()
    @IsOptional()
    password: string
}