import { Song } from 'src/songs/entities/songs.entity';
import { User } from 'src/users/entities/users-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //Each playlist will have multiple songs
  //One to Many relationship
  @OneToMany(() => Song, (song) => song.playlist)
  songs: Song[];

  //Each user can have multiple playlists
  //One to Many relationship
  @OneToMany(() => User, (user) => user.playlist)
  user: User;
}
