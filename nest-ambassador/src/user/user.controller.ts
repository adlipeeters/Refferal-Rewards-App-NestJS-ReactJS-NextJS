import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './user';
import { RedisService } from 'src/shared/redis.service';
import { Response } from 'express';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService, private redisService: RedisService) { }

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('admin/ambassadors')
    async ambassadors() {
        return this.userService.find({ is_ambassador: true });
    }

    @Get('ambassador/rankings')
    // async rankings(@Res() response : Response) {
    async rankings() {
        const ambassadors: User[] = await this.userService.find(
          {
            is_ambassador: true,
          },
          ['orders', 'orders.order_items'],
        );

        return ambassadors.map((ambassador) => {
          return { name: ambassador.name, revenue: ambassador.revenue };
        });
        // const client = this.redisService.getClient();
        // client.zrevrangebyscore('rankings', '+inf', '-inf', 'withscores', (err, result) => {
        //     response.send(result);
        // });
    }

}
