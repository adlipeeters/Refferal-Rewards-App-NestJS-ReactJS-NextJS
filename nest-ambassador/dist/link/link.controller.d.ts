import { LinkService } from './link.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
export declare class LinkController {
    private readonly linkService;
    private authService;
    constructor(linkService: LinkService, authService: AuthService);
    all(id: number): Promise<any[]>;
    create(products: number[], request: Request): Promise<any>;
    stats(request: Request): Promise<{
        code: string;
        count: number;
        revenue: number;
    }[]>;
    link(code: string): Promise<any>;
}
