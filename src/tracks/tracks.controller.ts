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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
} from './tracks.swagger';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

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

    this.tracksService.setAlbumToTrack(track, createTrackDto.albumId);

    this.tracksService.setArtistToTrack(track, createTrackDto.artistId);

    this.tracksService.save(track);
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

    Object.assign(track, updateTrackDto);

    if (updateTrackDto.albumId) {
      this.tracksService.setAlbumToTrack(track, updateTrackDto.albumId);
    }

    if (updateTrackDto.artistId) {
      this.tracksService.setArtistToTrack(track, updateTrackDto.artistId);
    }

    this.tracksService.save(track);
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
}
