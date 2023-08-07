import { AbstractService } from 'src/shared/abstract.service';
import { Order } from './order';
import { Repository } from 'typeorm';
export declare class OrderService extends AbstractService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
}
