import { RegisterDto } from './dtos/register.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UpdatePasswordDto, UpdateUserDto } from './dtos/update.dto';
export declare class AuthController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(request: Request, body: RegisterDto): Promise<any>;
    login(body: LoginDto, req: Request, response: Response): Promise<{
        message: string;
    }>;
    user(request: Request): Promise<any>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    updateInfo(request: Request, body: UpdateUserDto): Promise<any>;
    updatePassword(request: Request, body: UpdatePasswordDto): Promise<any>;
}
