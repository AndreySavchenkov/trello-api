import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { CreateColumnDto } from 'src/column/dto/createColumn.dto';
import { ColumnResponseInterface } from 'src/column/types/columnResponseInterface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createColumn(
    currentUser: UserEntity,
    createArticleDto: CreateColumnDto,
  ): Promise<ColumnEntity> {
    const article = new ColumnEntity();
    Object.assign(article, createArticleDto);

    article.author = currentUser;

    return await this.columnRepository.save(article);
  }

  async findAll(currentUserId: number): Promise<any> {
    const allColumns = await this.columnRepository.find();

    const filteredColumns = allColumns.filter(
      (item) => item.author.id === currentUserId,
    );

    return filteredColumns;
  }

  async findById(columnId: number, currentUserId: number): Promise<any> {
    const column = await this.columnRepository.findOne(columnId);

    if (!column) {
      throw new HttpException('column not found', HttpStatus.NOT_FOUND);
    }

    if (currentUserId !== column.author.id) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    return column;
  }

  async deleteColumn(columnId: number, currentUserId: number): Promise<any> {
    const column = await this.columnRepository.findOne(columnId);

    if (!column) {
      throw new HttpException('column not found', HttpStatus.NOT_FOUND);
    }

    if (currentUserId !== column.author.id) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }
    await this.columnRepository.delete(columnId);

    return 'this column deleted successful';
  }

  async updateColumnById(
    currentUserId: number,
    columnId: number,
    updateColumnDto: CreateColumnDto,
  ): Promise<any> {
    const column = await this.columnRepository.findOne(columnId);

    if (!column) {
      throw new HttpException('column not found', HttpStatus.NOT_FOUND);
    }

    if (currentUserId !== column.author.id) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    Object.assign(column, updateColumnDto);
    return await this.columnRepository.save(column);
  }

  buildColumnResponse(column: ColumnEntity): ColumnResponseInterface {
    return { column };
  }
}
