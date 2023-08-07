import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { Order } from '../order';
import { RedisService } from 'src/shared/redis.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OrderListener {
  constructor(
    private redisService: RedisService,
    private mailerService: MailerService,
  ) {}
  @OnEvent('order.completed')
  async handleOrderCompletedEvent(order: Order) {
    // const client = this.redisService.getClient();
    // client.zincrby('rankings', order.ambassador_revenue, order.user.name);

    await this.mailerService.sendMail({
      to: 'admin@admin.com',
      subject: 'An order has been completed',
      html: `Order #${order.id} with a total of $ ${order.total} has been completed!`,
    });

    await this.mailerService.sendMail({
      to: order.ambassador_email,
      subject: 'An order has been completed',
      html: `You earned $ ${order.ambassador_revenue} from the link #${order.code}`,
    });
  }
}
