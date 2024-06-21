import { EntityHelper } from 'src/utils/entity-helper';
import { GenderTypes, Status } from 'src/utils/general.enums';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ name: 'firstName', nullable: true })
  firstName: string;

  @Index()
  @Column({ name: 'lastName', nullable: true })
  lastName: string;

  @Index()
  @Column({ name: 'username', nullable: false, unique: true })
  username: string;

  @Index()
  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Index()
  @Column({ name: 'phoneNumber', nullable: false, unique: true })
  phoneNumber: string;

  @Index()
  @Column({ name: 'password', nullable: false })
  password: string;

  @Index()
  @Column({ name: 'avatar', nullable: true })
  avatar?: string | null;

  @Column({ name: 'gender', nullable: true, enum: GenderTypes })
  gender?: GenderTypes | null;

  @Index()
  @Column({ type: 'bigint' })
  createdAt: number;

  @Index()
  @Column({ type: 'bigint' })
  updatedAt: number;

  @Column({
    name: 'status',
    nullable: true,
    enum: Status,
    default: Status.ACTIVE,
  })
  status?: Status | null;
}
