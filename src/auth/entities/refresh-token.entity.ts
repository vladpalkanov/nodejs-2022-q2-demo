import { plainToInstance } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  static fromObject(object: Partial<RefreshToken>): RefreshToken {
    return plainToInstance<RefreshToken, Partial<RefreshToken>>(
      RefreshToken,
      object,
    );
  }

  @PrimaryColumn()
  userId: string;

  @Column()
  expires: Date;
}
