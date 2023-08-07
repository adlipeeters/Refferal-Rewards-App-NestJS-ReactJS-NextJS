import { ProductService } from './product.service';
import { ProductDto } from './dtos/product-create.dto';
import { Cache } from 'cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request } from 'express';
import { Product } from './product';
export declare class ProductController {
    private readonly productService;
    private cacheManager;
    private eventEmitter;
    constructor(productService: ProductService, cacheManager: Cache, eventEmitter: EventEmitter2);
    all(): Promise<any[]>;
    create(body: ProductDto): Promise<any>;
    get(id: number): Promise<any>;
    update(id: number, body: ProductDto): Promise<any>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    frontend(): Promise<any[]>;
    backend(request: Request): Promise<{
        data: Product[];
        total: number;
        page: number;
        last_page: number;
    }>;
}
