import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { CreateColumnDto } from 'src/column/dto/createColumn.dto';
import { ColumnResponseInterface } from 'src/column/types/columnResponseInterface';
import { ColumnsResponseInterface } from 'src/column/types/columnsResponseInterface';
import { ColumnService } from 'src/column/column.service';

@Controller('/users/:id/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @User('id') currentUserId: number,
  ): Promise<ColumnsResponseInterface> {
    return await this.columnService.findAll(currentUserId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('column') createArticleDto: CreateColumnDto,
  ): Promise<ColumnResponseInterface> {
    const column = await this.columnService.createColumn(
      currentUser,
      createArticleDto,
    );
    return this.columnService.buildColumnResponse(column);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(
    @User('id') currentUserId: number,
    @Param('id') columnId: number,
  ): Promise<ColumnResponseInterface> {
    const article = await this.columnService.findById(columnId, currentUserId);
    return this.columnService.buildColumnResponse(article);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteColumn(
    @User('id') currentUserId: number,
    @Param('id') columnId: number,
  ) {
    return await this.columnService.deleteColumn(columnId, currentUserId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateColumnById(
    @User('id') currentUserId: number,
    @Param('id') columnId: number,
    @Body('column') updateColumnDto: CreateColumnDto,
  ): Promise<ColumnResponseInterface> {
    const column = await this.columnService.updateColumnById(
      currentUserId,
      columnId,
      updateColumnDto,
    );
    return this.columnService.buildColumnResponse(column);
  }
}
