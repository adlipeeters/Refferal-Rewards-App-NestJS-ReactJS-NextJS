import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class UpdatePasswordDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    password_confirm: string;

}