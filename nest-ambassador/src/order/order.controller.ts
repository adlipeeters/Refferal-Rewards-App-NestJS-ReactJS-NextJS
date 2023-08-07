import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { LinkService } from 'src/link/link.service';
import { Connection } from 'typeorm';
import { OrderItem } from './order-item';
import { Product } from 'src/product/product';
import { ProductService } from 'src/product/product.service';
import { Order } from './order';
import { Link } from 'src/link/link';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class OrderController {
  private stripe;

  constructor(
    private readonly orderService: OrderService,
    private linkService: LinkService,
    private connection: Connection,
    private productService: ProductService,
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET'), {
      apiVersion: '2022-11-15',
    });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('admin/orders')
  async all() {
    return this.orderService.find({}, ['order_items']);
  }

  @Post('checkout/orders')
  async create(@Body() body: CreateOrderDto) {
    const link: Link = await this.linkService.findOne({ code: body.code }, [
      'user',
    ]);

    if (!link) {
      throw new BadRequestException('Invalid link');
    }

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const o = new Order();
      o.user_id = link.user.id;
      o.ambassador_email = link.user.email;
      o.first_name = body.first_name;
      o.last_name = body.last_name;
      o.email = body.email;
      o.address = body.address;
      o.country = body.country;
      o.city = body.city;
      o.zip = body.zip;
      o.code = body.code;

      const order = await queryRunner.manager.save(o);

      const line_items = [];

      for (const p of body.products) {
        const product: Product = await this.productService.findOne({
          id: p.product_id,
        });

        const orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.product_title = product.title;
        orderItem.price = product.price;
        orderItem.quantity = p.quantity;
        orderItem.ambassador_revenue = 0.1 * product.price * p.quantity;
        orderItem.admin_revenue = 0.9 * product.price * p.quantity;

        await queryRunner.manager.save(orderItem);

        // line_items.push({
        //   name: product.title,
        //   description: product.description,
        //   images: [product.image],
        //   amount: 100 * product.price,
        //   currency: 'usd',
        //   quantity: p.quantity,
        // });
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              images: [product.image],
            },
            unit_amount: product.price * 100, // Stripe uses smallest currency units (cents in case of USD)
          },
          quantity: p.quantity,
        });
      }

      const source = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${this.configService.get(
          'CHECKOUT_URL',
        )}/success?source={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.configService.get('CHECKOUT_URL')}/error`,
      });

      order.transaction_id = source['id'];
      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      return source;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      //   return error;
      throw new BadRequestException('Error, Something went wrong!');
    } finally {
      await queryRunner.release();
    }
  }

  @Post('checkout/orders/confirm')
  async confirm(@Body('source') source: string) {
    const order: any = await this.orderService.findOne(
      {
        transaction_id: source,
      },
      ['order_items'],
    );

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderService.update(Number(order.id), { complete: true });

    await this.eventEmitter.emit('order.completed', order);

    return {
      message: 'success',
    };
  }
}
