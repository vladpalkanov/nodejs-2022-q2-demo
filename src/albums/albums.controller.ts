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
} from 'src/albums/albums.swagger';
import { DeleteUserApi } from 'src/users/users.swagger';
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

  @Post()
  @UseGuards(JwtAuthGuard)
  @CreateAlbumApi()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<void> {
    const album = Album.fromObject(createAlbumDto);

    this.albumsService.create(album);
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

    const albumPatch = Album.fromObject(updateAlbumDto);

    this.albumsService.patch(albumId, albumPatch);
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
