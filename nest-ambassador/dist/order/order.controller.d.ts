import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { LinkService } from 'src/link/link.service';
import { Connection } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class OrderController {
    private readonly orderService;
    private linkService;
    private connection;
    private productService;
    private configService;
    private eventEmitter;
    private stripe;
    constructor(orderService: OrderService, linkService: LinkService, connection: Connection, productService: ProductService, configService: ConfigService, eventEmitter: EventEmitter2);
    all(): Promise<any[]>;
    create(body: CreateOrderDto): Promise<any>;
    confirm(source: string): Promise<{
        message: string;
    }>;
}
