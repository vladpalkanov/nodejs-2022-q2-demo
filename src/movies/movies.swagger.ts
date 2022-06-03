import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

export function FindAllMoviesApi() {
  return applyDecorators(
    ApiTags('Movies'),
    ApiOperation({
      summary: 'Get all movies',
      description: 'Gets all library movies list',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successful operation',
      type: Movie,
      isArray: true,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function FindOneMovieByIdApi() {
  return applyDecorators(
    ApiTags('Movies'),
    ApiOperation({
      summary: 'Get one Movie by id',
      description: 'Find one library Movie by its id',
    }),
    ApiBearerAuth(),
    ApiNotFoundResponse({
      description: 'Movie not found',
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: Movie,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function CreateMovieApi() {
  return applyDecorators(
    ApiTags('Movies'),
    ApiOperation({
      summary: 'Add new Movie',
      description: 'Add new Movie to library',
    }),
    ApiBearerAuth(),
    ApiBody({ type: CreateMovieDto }),
    ApiCreatedResponse({ description: 'The Movie has been created' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function UpdateMovieApi() {
  return applyDecorators(
    ApiTags('Movies'),
    ApiOperation({
      summary: 'Update Movie information',
      description: 'Update library Movie information by UUID',
    }),
    ApiBearerAuth(),
    ApiBody({ type: UpdateMovieDto }),
    ApiOkResponse({ description: 'The Movie has been updated' }),
    ApiNotFoundResponse({ description: 'Movie not found' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function DeleteMovieApi() {
  return applyDecorators(
    ApiTags('Movies'),
    ApiOperation({
      summary: 'Delete Movie',
      description: 'Deletes Movie from library by ID',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The Movie has been deleted' }),
    ApiNotFoundResponse({ description: 'Movie not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AddMovieToFavouritesApi() {
  return applyDecorators(
    ApiTags('Movies', 'Favourites'),
    ApiOperation({
      summary: 'Add Movie to favourites',
      description: 'Add Movie to favourites',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Movie has been added to favourites',
    }),
    ApiNotFoundResponse({ description: 'Movie not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function RemoveMovieFromFavouritesApi() {
  return applyDecorators(
    ApiTags('Movies', 'Favourites'),
    ApiOperation({
      summary: 'Remove Movie from favourites',
      description: 'Remove Movie from favourites',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Movie has been removed from favourites',
    }),
    ApiNotFoundResponse({ description: 'Movie not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
