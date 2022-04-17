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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardsResponseSwagger } from 'src/card/type/cardsResponseSwagger';
import { CardResponseSwagger } from 'src/card/type/cardResponseSwagger';

@ApiTags('Cards')
@Controller('/users/columns/:columnId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
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
  @ApiResponse({
    status: 200,
    description: 'Create a card',
    type: CardResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Card not found',
  })
  @UseGuards(AuthGuard)
  async findCardById(
    @Param('cardId') cardId: number,
  ): Promise<CardResponseInterface> {
    const card = await this.cardService.findCardById(cardId);
    return this.cardService.buildCardResponse(card);
  }

  @Delete(':cardId')
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
    @Param('cardId') cardId: number,
  ) {
    return await this.cardService.deleteCard(currentUserId, cardId);
  }

  @Put(':cardId')
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({
    status: 200,
    description: 'Update column by id',
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
  async updateCardById(
    @User('id') currentUserId: number,
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
