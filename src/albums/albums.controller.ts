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
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import {
  FindAllAlbumsApi,
  CreateAlbumApi,
  UpdateAlbumApi,
  DeleteAlbumApi,
  FindOneAlbumByIdApi,
} from 'src/albums/albums.swagger';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindAllAlbumsApi()
  async findAll(): Promise<Array<Album>> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindOneAlbumByIdApi()
  async findOneById(@Param('id') albumId: string): Promise<Album> {
    const album = await this.albumsService.findOneById(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @CreateAlbumApi()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<void> {
    const album = Album.fromObject(createAlbumDto);

    if (createAlbumDto.trackIds) {
      this.albumsService.setTracksToAlbum(album, createAlbumDto.trackIds);
    }

    this.albumsService.save(album);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UpdateAlbumApi()
  async update(
    @Param('id') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<void> {
    const album = await this.albumsService.findOneById(albumId);

    if (!album) {
      throw new NotFoundException('Track not found');
    }

    Object.assign(album, updateAlbumDto);

    if (updateAlbumDto.trackIds) {
      this.albumsService.setTracksToAlbum(album, updateAlbumDto.trackIds);
    }

    this.albumsService.save(album);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @DeleteAlbumApi()
  async delete(@Param('id') albumId: string): Promise<void> {
    const wasAlbumDeleted = await this.albumsService.delete(albumId);

    if (!wasAlbumDeleted) {
      throw new NotFoundException('Track not found');
    }
  }
}
