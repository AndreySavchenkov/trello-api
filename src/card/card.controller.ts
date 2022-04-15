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

@Controller('/users/:userId/columns/:columnId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAllCards(
    @User('id') currentUserId: number,
    @Param('columnId') columnId: number,
    @Param('userId') userId: number,
  ): Promise<ColumnsResponseInterface> {
    return await this.cardService.findAllCards(currentUserId, columnId, userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createCard(
    @User('id') currentUserId: number,
    @Param('columnId') columnId: number,
    @Body('card') createCardDto: CreateCardDto,
  ): Promise<CardResponseInterface> {
    const card = await this.cardService.createCard(
      currentUserId,
      columnId,
      createCardDto,
    );
    return this.cardService.buildCardResponse(card);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findCardById(
    @User('id') currentUserId: number,
    @Param('id') cardId: number,
  ): Promise<CardResponseInterface> {
    const card = await this.cardService.findCardById(currentUserId, cardId);
    return this.cardService.buildCardResponse(card);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteCard(
    @User('id') currentUserId: number,
    @Param('id') cardId: number,
  ) {
    return await this.cardService.deleteCard(currentUserId, cardId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateCardById(
    @User('id') currentUserId: number,
    @Param('id') cardId: number,
    @Body('card') updateCardDto: CreateCardDto,
  ): Promise<CardResponseInterface> {
    const card = await this.cardService.updateCard(
      currentUserId,
      cardId,
      updateCardDto,
    );
    return this.cardService.buildCardResponse(card);
  }
}
