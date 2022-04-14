import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CardEntity } from 'src/card/card.entity';
import { CardResponseInterface } from 'src/card/type/cardResponseInterface';
import { ColumnEntity } from 'src/column/column.entity';
import { CreateCardDto } from 'src/card/dto/createCard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllCards(
    currentUserId: number,
    columnId: number,
    userId: number,
  ): Promise<any> {
    const column = await this.columnRepository.findOne(columnId);

    if (!column) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }

    const allCardsForColumn = await this.columnRepository
      .createQueryBuilder('column')
      .where('column.id = :columnId', { columnId })
      .leftJoinAndSelect('column.cards', 'cards')
      .getMany();

    return allCardsForColumn;
  }

  async createCard(
    currentUserId: number,
    columnId: number,
    createCardDto: CreateCardDto,
  ): Promise<CardEntity> {
    const column = await this.columnRepository.findOne(columnId);

    if (!column) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }

    const card = new CardEntity();
    Object.assign(card, createCardDto);

    card.column = column;

    return await this.cardRepository.save(card);
  }

  async findCardById(currentUserId: number, cardId: number): Promise<any> {
    const card = await this.cardRepository.findOne(cardId);

    if (!card) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }

    return card;
  }

  async deleteCard(currentUserId: number, cardId: number): Promise<string> {
    const card = await this.cardRepository.findOne(cardId);

    if (!card) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }

    if (currentUserId !== +card.column.author.id) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    await this.cardRepository.delete(cardId);
    return 'This card deleted successful';
  }

  async updateCard(
    currentUserId: number,
    cardId: number,
    updateCardDto: CreateCardDto,
  ): Promise<any> {
    const card = await this.cardRepository.findOne(cardId);

    if (!card) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }

    if (currentUserId !== card.column.author.id) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    Object.assign(card, updateCardDto);
    return await this.cardRepository.save(card);
  }

  buildCardResponse(card: CardEntity): CardResponseInterface {
    return { card };
  }
}
