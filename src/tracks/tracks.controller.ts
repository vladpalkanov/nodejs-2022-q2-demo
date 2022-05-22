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
} from './tracks.swagger';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindAllTracksApi()
  async findAll(): Promise<Array<Track>> {
    return this.tracksService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @CreateTrackApi()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<void> {
    const track = Track.fromObject(createTrackDto);

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
}
