import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Trello on heroku o_O O_O O_o !!!';
  }
}
