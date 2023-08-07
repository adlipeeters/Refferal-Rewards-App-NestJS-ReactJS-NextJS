import { AbstractService } from 'src/shared/abstract.service';
import { User } from 'src/user/user';
import { Repository } from 'typeorm';
export declare class UserService extends AbstractService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
}
