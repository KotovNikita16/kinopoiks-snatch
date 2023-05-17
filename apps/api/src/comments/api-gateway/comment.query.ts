import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('/reviews')
export class CommentQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getCommentById/:id')
  async getCommentById(@Param('id') comment_id: string) {
    if (isNaN(Number(comment_id))) {
      throw new HttpException(
        'ID должен состоять из цифр',
        HttpStatus.BAD_REQUEST
      );
    } else {
      const comment = await this.amqpConnection.request({
        exchange: 'GetCommentsExchange',
        routingKey: 'get-by-id-comment',
        payload: comment_id,
      });
      return comment;
    }
  }
}
