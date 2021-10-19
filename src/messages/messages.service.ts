import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-messages.dto';
import { MessagesEntity } from './messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,
  ) {}

  async findAll() {
    return await this.messagesRepository.find({
      select: ['id', 'room_id', 'user_id', 'message', 'createdAt'],
    });
  }

  async findOrFail(
    conditions: FindConditions<MessagesEntity>,
    options?: FindOneOptions<MessagesEntity>,
  ) {
    try {
      return await this.messagesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateMessageDto) {
    const room = await this.messagesRepository.create(data);
    return await this.messagesRepository.save(room);
  }
}
