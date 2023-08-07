import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/shared/abstract.service';
import { Order } from './order';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService extends AbstractService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {
        super(orderRepository);
    }

}
