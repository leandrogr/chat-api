import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async index() {
    return await this.messagesService.findAll();
  }

  @Post()
  async store(@Body() body: CreateMessageDto) {
    return await this.messagesService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.messagesService.findOrFail({ id });
  }
}
