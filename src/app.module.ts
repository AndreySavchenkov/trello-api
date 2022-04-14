import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfing from 'src/orm.config';
import { AuthMiddleware } from 'src/user/middlewares/auth-middleware.service';
import { ColumnModule } from 'src/column/column.module';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfing),
    UserModule,
    ColumnModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
