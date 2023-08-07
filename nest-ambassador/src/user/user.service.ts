import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/shared/abstract.service';
import { User } from 'src/user/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends AbstractService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(userRepository);
    }

    // async save(options) {
    //     return this.userRepository.save(options);
    // }

    // async findByEmail(email: string) {
    //     return this.userRepository.findOne({
    //         where: { email }
    //     });
    // }

    // async findById(id: number) {
    //     return this.userRepository.findOne({
    //         where: { id }
    //     });
    // }


    // async update(id: number, options) {
    //     return this.userRepository.update(id, options);
    // }

    // async find(options) {
    //     return this.userRepository.find({
    //         where: options
    //     });
    // }

}
