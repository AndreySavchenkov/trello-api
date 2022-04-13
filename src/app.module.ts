import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfing from 'src/orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfing), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
