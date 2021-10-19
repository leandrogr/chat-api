import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-rooms.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async index() {
    return await this.roomsService.findAll();
  }

  @Post()
  async store(@Body() body: CreateRoomDto) {
    return await this.roomsService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.roomsService.findOrFail({ id });
  }
}
