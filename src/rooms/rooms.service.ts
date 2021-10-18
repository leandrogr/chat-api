import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-rooms.dto';
import { RoomsEntity } from './rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsEntity)
    private readonly roomsRepository: Repository<RoomsEntity>,
  ) {}

  async findAll() {
    return await this.roomsRepository.find({
      select: ['id', 'name'],
    });
  }

  async findOrFail(
    conditions: FindConditions<RoomsEntity>,
    options?: FindOneOptions<RoomsEntity>,
  ) {
    try {
      return await this.roomsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateRoomDto) {
    const room = await this.roomsRepository.create(data);
    return await this.roomsRepository.save(room);
  }
}
