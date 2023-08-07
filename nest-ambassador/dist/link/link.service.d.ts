import { Link } from './link';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/shared/abstract.service';
export declare class LinkService extends AbstractService {
    private readonly linkRepository;
    constructor(linkRepository: Repository<Link>);
}
