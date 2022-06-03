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
import { WithUser } from 'src/auth/decorators/with-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FavouritesService } from 'src/favourites/favourites.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import {
  FindAllMoviesApi,
  FindOneMovieByIdApi,
  CreateMovieApi,
  UpdateMovieApi,
  DeleteMovieApi,
  AddMovieToFavoritesApi,
  RemoveMovieFromFavoritesApi,
} from './movies.swagger';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly favouritesService: FavouritesService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindAllMoviesApi()
  async findAll(): Promise<Array<Movie>> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindOneMovieByIdApi()
  async findOneById(@Param('id') movieId: string): Promise<Movie> {
    const movie = await this.moviesService.findOneById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @CreateMovieApi()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<void> {
    const movie = Movie.fromObject(createMovieDto);

    this.moviesService.save(movie);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UpdateMovieApi()
  async update(
    @Param('id') movieId: string,
    @Body() updateTrackDto: UpdateMovieDto,
  ): Promise<void> {
    const movie = await this.moviesService.findOneById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    Object.assign(movie, updateTrackDto);

    this.moviesService.save(movie);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @DeleteMovieApi()
  async delete(@Param('id') movieId: string): Promise<void> {
    const wasMovieDeleted = await this.moviesService.delete(movieId);

    if (!wasMovieDeleted) {
      throw new NotFoundException('Movie not found');
    }
  }

  @Post('/:id/favs')
  @UseGuards(JwtAuthGuard)
  @AddMovieToFavoritesApi()
  async addTrackToFavorites(
    @Param('id') movieId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const movie = await this.moviesService.findOneById(movieId);

    if (!movie) {
      throw new NotFoundException('Track not found');
    }

    await this.favouritesService.addMovieToFavouritesForUser(movie, userId);
  }

  @Delete('/:id/favs')
  @UseGuards(JwtAuthGuard)
  @RemoveMovieFromFavoritesApi()
  async removeTrackFromFavorites(
    @Param('id') movieId: string,
    @WithUser('userId') userId: string,
  ): Promise<void> {
    const movie = await this.moviesService.findOneById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.favouritesService.removeMovieToFavouritesForUser(movie, userId);
  }
}
