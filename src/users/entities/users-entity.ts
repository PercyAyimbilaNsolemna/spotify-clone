import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlists/entities/playlists-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  //Exclude the password from the response
  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  //A user can create many playlists
  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlist: Playlist[];
}
