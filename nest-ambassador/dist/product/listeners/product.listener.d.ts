import { Cache } from 'cache-manager';
export declare class ProductListener {
    private cacheManager;
    constructor(cacheManager: Cache);
    handleProductUpdatEvent(): Promise<void>;
}
