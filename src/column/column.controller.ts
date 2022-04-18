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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ColumnsResponseSwagger } from 'src/column/types/columnsResponseSwagger';
import { ColumnResponseSwagger } from 'src/column/types/columnResponseSwagger';

@ApiBearerAuth()
@ApiTags('Columns')
@Controller('/user/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all columns for specified user',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all columns',
    type: ColumnsResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Columns not found',
  })
  @UseGuards(AuthGuard)
  async findAllColumns(
    @User('id') currentUserId: number,
  ): Promise<ColumnsResponseInterface> {
    return await this.columnService.findAllColumns(currentUserId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create column for specified user',
  })
  @ApiBody({ type: CreateColumnDto })
  @ApiResponse({
    status: 200,
    description: 'Create a column',
    type: ColumnResponseSwagger,
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createColumn(
    @User() currentUser: UserEntity,
    @Body() createArticleDto: CreateColumnDto,
  ): Promise<ColumnResponseInterface> {
    const column = await this.columnService.createColumn(
      currentUser,
      createArticleDto,
    );
    return this.columnService.buildColumnResponse(column);
  }

  @Get(':columnId')
  @ApiOperation({
    summary: 'Get column by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Get column by id',
    type: ColumnResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Column not found',
  })
  @UseGuards(AuthGuard)
  async findColumnById(
    @Param('columnId') columnId: number,
  ): Promise<ColumnResponseInterface> {
    const article = await this.columnService.findColumn(columnId);
    return this.columnService.buildColumnResponse(article);
  }

  @Delete(':columnId')
  @ApiOperation({
    summary: 'Delete column by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete column by id',
  })
  @ApiResponse({
    status: 404,
    description: 'Column not found',
  })
  @ApiResponse({
    status: 403,
    description: 'You are not author',
  })
  @UseGuards(AuthGuard)
  async deleteColumn(
    @User('id') currentUserId: number,
    @Param('columnId') columnId: number,
  ): Promise<string> {
    return await this.columnService.deleteColumn(columnId, currentUserId);
  }

  @Put(':columnId')
  @ApiOperation({
    summary: 'Update column by id',
  })
  @ApiBody({ type: CreateColumnDto })
  @ApiResponse({
    status: 200,
    description: 'Update column by id',
    type: ColumnResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Column not found',
  })
  @ApiResponse({
    status: 403,
    description: 'You are not author',
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateColumnById(
    @User('id') currentUserId: number,
    @Param('columnId') columnId: number,
    @Body() updateColumnDto: CreateColumnDto,
  ): Promise<ColumnResponseInterface> {
    const column = await this.columnService.updateColumn(
      currentUserId,
      columnId,
      updateColumnDto,
    );
    return this.columnService.buildColumnResponse(column);
  }
}
