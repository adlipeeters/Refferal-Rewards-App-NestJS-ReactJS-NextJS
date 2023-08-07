import { Repository } from 'typeorm';
export declare class AbstractService {
    protected readonly repository: Repository<any>;
    protected constructor(repository: Repository<any>);
    save(options: any): Promise<any>;
    findOne(options?: {}, relations?: any[]): Promise<any>;
    update(id: number, options: any): Promise<import("typeorm").UpdateResult>;
    find(options?: {}, relations?: any[]): Promise<any[]>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
