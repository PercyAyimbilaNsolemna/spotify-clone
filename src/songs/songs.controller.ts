import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './entities/songs.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistsJwtGuard } from 'src/auth/artists-jwt-guard';

@Controller('songs')
export class SongsController {
  //Injects the songs servcice to the songs controller
  constructor(
    private readonly songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(
      `The connection string is ${this.connection.CONNECTION_STRING}`,
    );
  }
  //Get request to find all the songs
  @Get()
  findAllSongs(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Song>> {
    return this.songsService.paginate({ page, limit });
  }

  //Get request to find a song
  @Get(':id')
  findOneSong(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    //console.log(`The data type of the id is ${typeof id}`);
    return this.songsService.findOneSong(id);
  }

  @UseGuards(ArtistsJwtGuard)
  //Post method to upload a song
  @Post()
  createSong(
    @Body() createSongDTO: CreateSongDTO,
    @Request() request,
  ): Promise<Song> {
    console.log('User:', request.user);
    return this.songsService.createSong(createSongDTO);
  }

  //Patch method to update a song
  @Patch(':id')
  updateSong(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.updateSong(id, updateSongDTO);
  }

  //Delete method to delete song
  @Delete(':id')
  deleteSong(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.songsService.removeSong(id);
  }
}
