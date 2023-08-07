import { Product } from './product';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/shared/abstract.service';
export declare class ProductService extends AbstractService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
}
