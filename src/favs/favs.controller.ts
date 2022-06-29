import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { WithUser } from 'src/auth/decorators/with-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BookService } from 'src/books/books.service';
import { MoviesService } from 'src/movies/movies.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Favs } from './entities/favs.entity';
import { FavsService } from './favs.service';
import {
  AddAlbumToFavsApi,
  AddArtistToFavsApi,
  AddBookToFavsApi,
  AddMovieToFavsApi,
  AddTrackToFavsApi,
  FindAllFavsApi,
  RemoveAlbumFromFavsApi,
  RemoveArtistFromFavsApi,
  RemoveBookFromFavsApi,
  RemoveMovieFromFavsApi,
  RemoveTrackFromFavsApi,
} from './favs.swagger';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly moviesService: MoviesService,
    private readonly tracksService: TracksService,
    private readonly booksService: BookService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindAllFavsApi()
  async findAll(@WithUser('userId') userId: string): Promise<Favs> {
    return this.favsService.findByUserId(userId);
  }

  @Post('/movie/:id')
  @UseGuards(JwtAuthGuard)
  @AddMovieToFavsApi()
  async addMovieToFavs(
    @Param('id') movieId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const movie = await this.moviesService.findOneById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.favsService.addMovieToFavsForUser(movie, userId);
  }

  @Delete('/track/:id')
  @UseGuards(JwtAuthGuard)
  @RemoveMovieFromFavsApi()
  async removeMovieFromFavs(
    @Param('id') movieId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const movie = await this.moviesService.findOneById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.favsService.removeMovieToFavsForUser(movie, userId);
  }

  @Post('/track/:id')
  @UseGuards(JwtAuthGuard)
  @AddTrackToFavsApi()
  async addTrackToFavs(
    @Param('id') trackId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const track = await this.tracksService.findOneById(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.favsService.addTrackToFavsForUser(track, userId);
  }

  @Delete('/track/:id')
  @UseGuards(JwtAuthGuard)
  @RemoveTrackFromFavsApi()
  async removeTrackFromFavs(
    @Param('id') trackId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const track = await this.tracksService.findOneById(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.favsService.removeTrackToFavsForUser(track, userId);
  }

  @Post('/book/:id')
  @UseGuards(JwtAuthGuard)
  @AddBookToFavsApi()
  async addBookToFavs(
    @Param('id') bookId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const book = await this.booksService.findOneById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.favsService.addBookToFavsForUser(book, userId);
  }

  @Delete('/book/:id')
  @UseGuards(JwtAuthGuard)
  @RemoveBookFromFavsApi()
  async removeBookFromFavs(
    @Param('id') bookId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const book = await this.booksService.findOneById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.favsService.removeBookToFavsForUser(book, userId);
  }

  @Post('/album/:id')
  @UseGuards(JwtAuthGuard)
  @AddAlbumToFavsApi()
  async addAlbumToFavs(
    @Param('id') albumId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const album = await this.albumsService.findOneById(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.favsService.addAlbumToFavsForUser(album, userId);
  }

  @Delete('/album/:id')
  @UseGuards(JwtAuthGuard)
  @RemoveAlbumFromFavsApi()
  async removeAlbumFromFavs(
    @Param('id') albumId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const album = await this.albumsService.findOneById(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.favsService.removeAlbumToFavsForUser(album, userId);
  }

  @Post('/album/:id')
  @UseGuards(JwtAuthGuard)
  @AddArtistToFavsApi()
  async addArtistToFavs(
    @Param('id') artistId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const artist = await this.artistsService.findOneById(artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.favsService.addArtistToFavsForUser(artist, userId);
  }

  @Delete('/artist/:id')
  @UseGuards(JwtAuthGuard)
  @RemoveArtistFromFavsApi()
  async removeArtistFromFavs(
    @Param('id') artistId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const artist = await this.artistsService.findOneById(artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.favsService.removeArtistToFavsForUser(artist, userId);
  }
}
