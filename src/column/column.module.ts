import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { ColumnEntity } from 'src/column/column.entity';
import { ColumnController } from 'src/column/column.controller';
import { ColumnService } from 'src/column/column.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, UserEntity])],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
