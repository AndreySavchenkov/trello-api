import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ColumnEntity } from 'src/column/column.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users-trello-api' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  username: string;

  @Column({ select: false })
  @ApiProperty()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ColumnEntity, (column) => column.author)
  columns: ColumnEntity[];
}
