import { Injectable } from '@nestjs/common';
import { Product } from './product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/shared/abstract.service';

@Injectable()
export class ProductService extends AbstractService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {
        super(productRepository);
    }
}
