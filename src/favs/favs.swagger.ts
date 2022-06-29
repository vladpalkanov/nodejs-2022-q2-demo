import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Favs } from './entities/favs.entity';

export function FindAllFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: ' Get all Favs',
      description: 'Gets all Favs: tracks, books, movies',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successful operation',
      type: Favs,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AddMovieToFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Add Movie to Favs',
      description: 'Add Movie to Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Movie has been added to Favs',
    }),
    ApiNotFoundResponse({ description: 'Movie not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function RemoveMovieFromFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Remove Movie from Favs',
      description: 'Remove Movie from Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Movie has been removed from Favs',
    }),
    ApiNotFoundResponse({ description: 'Movie not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AddTrackToFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Add track to Favs',
      description: 'Add track to Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The track has been added to Favs',
    }),
    ApiNotFoundResponse({ description: 'Track not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function RemoveTrackFromFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Remove track from Favs',
      description: 'Remove track from Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The track has been removed from Favs',
    }),
    ApiNotFoundResponse({ description: 'Track not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AddBookToFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Add Book to Favs',
      description: 'Add Book to Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Book has been added to Favs',
    }),
    ApiNotFoundResponse({ description: 'Book not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function RemoveBookFromFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Remove Book from Favs',
      description: 'Remove Book from Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Book has been removed from Favs',
    }),
    ApiNotFoundResponse({ description: 'Book not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AddArtistToFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Add Artist to Favs',
      description: 'Add Artist to Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Artist has been added to Favs',
    }),
    ApiNotFoundResponse({ description: 'Artist not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function RemoveArtistFromFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Remove Artist from Favs',
      description: 'Remove Artist from Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Artist has been removed from Favs',
    }),
    ApiNotFoundResponse({ description: 'Artist not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AddAlbumToFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Add Album to Favs',
      description: 'Add Album to Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Album has been added to Favs',
    }),
    ApiNotFoundResponse({ description: 'Album not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function RemoveAlbumFromFavsApi() {
  return applyDecorators(
    ApiTags('Favs'),
    ApiOperation({
      summary: 'Remove Album from Favs',
      description: 'Remove Album from Favs',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The Album has been removed from Favs',
    }),
    ApiNotFoundResponse({ description: 'Album not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
