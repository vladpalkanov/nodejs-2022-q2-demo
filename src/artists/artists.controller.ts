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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import {
  FindAllArtistsApi,
  CreateArtistApi,
  UpdateArtistApi,
  DeleteArtistApi,
  FindOneArtistByIdApi,
} from './artists.swagger';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindAllArtistsApi()
  async findAll(): Promise<Array<Artist>> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindOneArtistByIdApi()
  async findOneById(@Param('id') artistId: string): Promise<Artist> {
    const album = await this.artistsService.findOneById(artistId);

    if (!album) {
      throw new NotFoundException('Artist not found');
    }

    return album;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @CreateArtistApi()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<void> {
    const artist = Artist.fromObject(createArtistDto);

    this.artistsService.save(artist);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UpdateArtistApi()
  async update(
    @Param('id') albumId: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<void> {
    const album = await this.artistsService.findOneById(albumId);

    if (!album) {
      throw new NotFoundException('Artist not found');
    }

    Object.assign(album, updateArtistDto);

    this.artistsService.save(album);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @DeleteArtistApi()
  async delete(@Param('id') artistId: string): Promise<void> {
    const wasAlbumDeleted = await this.artistsService.delete(artistId);

    if (!wasAlbumDeleted) {
      throw new NotFoundException('Track not found');
    }
  }
}
