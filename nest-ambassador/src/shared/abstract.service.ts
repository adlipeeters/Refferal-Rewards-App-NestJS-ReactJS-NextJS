import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user';
import { Repository } from 'typeorm';

@Injectable()
export class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async save(options) {
    return this.repository.save(options);
  }

  async findOne(options = {}, relations = []) {
    return this.repository.findOne({
      relations: relations,
      where: options,
    });
  }

  async update(id: number, options) {
    return this.repository.update(id, options);
  }

  async find(options = {}, relations = []) {
    return this.repository.find({
      relations: relations,
      where: options,
    });
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
