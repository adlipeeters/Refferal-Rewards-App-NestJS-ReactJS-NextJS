import { Order } from '../order';
import { RedisService } from 'src/shared/redis.service';
import { MailerService } from '@nestjs-modules/mailer';
export declare class OrderListener {
    private redisService;
    private mailerService;
    constructor(redisService: RedisService, mailerService: MailerService);
    handleOrderCompletedEvent(order: Order): Promise<void>;
}
