import { User } from 'src/users/entities/users-entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  //Adds the user as foreign key to the user entity
  //Ensures that each artist has only one user profile
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
