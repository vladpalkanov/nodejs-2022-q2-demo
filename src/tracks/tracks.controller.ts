import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { WithUser } from 'src/auth/decorators/with-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FavouritesService } from 'src/favourites/favourites.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TracksService } from './tracks.service';
import {
  CreateTrackApi,
  DeleteTrackApi,
  FindAllTracksApi,
  UpdateTrackApi,
  FindOneTrackByIdApi,
  AddTrackToFavoritesApi,
  RemoveTrackFromFavoritesApi,
} from './tracks.swagger';

@Controller('tracks')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly favouritesService: FavouritesService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindAllTracksApi()
  async findAll(): Promise<Array<Track>> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindOneTrackByIdApi()
  async findOneById(@Param('id') trackId: string): Promise<Track> {
    const track = await this.tracksService.findOneById(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @CreateTrackApi()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<void> {
    const track = Track.fromObject(createTrackDto);

    track.album = Album.fromObject({ id: createTrackDto.albumId });

    this.tracksService.create(track);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UpdateTrackApi()
  async update(
    @Param('id') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<void> {
    const track = await this.tracksService.findOneById(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const trackPatch = Track.fromObject(updateTrackDto);

    if (trackPatch.album !== undefined) {
      trackPatch.album = Album.fromObject({ id: updateTrackDto.albumId });
    }

    this.tracksService.patch(trackId, trackPatch);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @DeleteTrackApi()
  async delete(@Param('id') trackId: string): Promise<void> {
    const wasTrackDeleted = await this.tracksService.delete(trackId);

    if (!wasTrackDeleted) {
      throw new NotFoundException('Track not found');
    }
  }

  @Post('/:id/favs')
  @UseGuards(JwtAuthGuard)
  @AddTrackToFavoritesApi()
  async addTrackToFavorites(
    @Param('id') trackId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const track = await this.tracksService.findOneById(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.favouritesService.addTrackToFavourites(userId, track);
  }

  @Delete('/:id/favs')
  @UseGuards(JwtAuthGuard)
  @RemoveTrackFromFavoritesApi()
  async removeTrackFromFavorites(
    @Param('id') trackId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const track = await this.tracksService.findOneById(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.favouritesService.removeTrackFromFavourites(userId, track);
  }
}
