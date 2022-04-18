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
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CardService } from 'src/card/card.service';
import { CreateCardDto } from 'src/card/dto/createCard.dto';
import { CardResponseInterface } from 'src/card/type/cardResponseInterface';
import { User } from 'src/user/decorators/user.decorator';
import { ColumnsResponseInterface } from 'src/column/types/columnsResponseInterface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { CardsResponseSwagger } from 'src/card/type/cardsResponseSwagger';
import { CardResponseSwagger } from 'src/card/type/cardResponseSwagger';

@ApiBearerAuth()
@ApiTags('Cards')
@Controller('/user/columns/:columnId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all cards for specified column',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all cards',
    type: CardsResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Column not found',
  })
  @UseGuards(AuthGuard)
  async findAllCards(
    @Param('columnId') columnId: number,
  ): Promise<ColumnsResponseInterface> {
    return await this.cardService.findAllCards(columnId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create card for specified column',
  })
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({
    status: 200,
    description: 'Create a card',
    type: CardResponseSwagger,
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
  async createCard(
    @User('id') currentUserId: number,
    @Param('columnId') columnId: number,
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardResponseInterface> {
    const card = await this.cardService.createCard(
      currentUserId,
      columnId,
      createCardDto,
    );
    return this.cardService.buildCardResponse(card);
  }

  @Get(':cardId')
  @ApiOperation({
    summary: 'Get card by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Get card by id',
    type: CardResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Card not found',
  })
  @UseGuards(AuthGuard)
  async findCardById(
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
  ): Promise<CardResponseInterface> {
    const card = await this.cardService.findCardById(cardId);
    return this.cardService.buildCardResponse(card);
  }

  @Delete(':cardId')
  @ApiOperation({
    summary: 'Delete card by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete card by id',
  })
  @ApiResponse({
    status: 404,
    description: 'Card not found',
  })
  @ApiResponse({
    status: 403,
    description: 'You are not author',
  })
  @UseGuards(AuthGuard)
  async deleteCard(
    @User('id') currentUserId: number,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
  ) {
    return await this.cardService.deleteCard(currentUserId, cardId);
  }

  @Put(':cardId')
  @ApiOperation({
    summary: 'Update card by id',
  })
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({
    status: 200,
    description: 'Update card by id',
    type: CardResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Card not found',
  })
  @ApiResponse({
    status: 403,
    description: 'You are not author',
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateCardById(
    @User('id') currentUserId: number,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
    @Body() updateCardDto: CreateCardDto,
  ): Promise<CardResponseInterface> {
    const card = await this.cardService.updateCard(
      currentUserId,
      cardId,
      updateCardDto,
    );
    return this.cardService.buildCardResponse(card);
  }
}
