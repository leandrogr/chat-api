import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  room_id: string;

  @IsNotEmpty()
  message: string;
}
