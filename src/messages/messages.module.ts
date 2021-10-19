import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesEntity } from './messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity])],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
