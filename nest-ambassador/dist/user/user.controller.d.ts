import { UserService } from './user.service';
import { RedisService } from 'src/shared/redis.service';
export declare class UserController {
    private readonly userService;
    private redisService;
    constructor(userService: UserService, redisService: RedisService);
    ambassadors(): Promise<any[]>;
    rankings(): Promise<{
        name: string;
        revenue: number;
    }[]>;
}
