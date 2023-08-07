import { Injectable } from '@nestjs/common';
import { Link } from './link';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/shared/abstract.service';

@Injectable()
export class LinkService extends AbstractService {
    constructor(@InjectRepository(Link) private readonly linkRepository: Repository<Link>) {
        super(linkRepository);
    }
}
