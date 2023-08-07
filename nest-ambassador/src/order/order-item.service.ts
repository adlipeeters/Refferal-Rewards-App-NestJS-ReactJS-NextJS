import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './order-item';

@Injectable()
export class OrderItemService extends AbstractService {
    constructor(@InjectRepository(OrderItem) private readonly orderRepository: Repository<OrderItem>) {
        super(orderRepository);
    }
}
