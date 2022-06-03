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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

export function FindAllTracksApi() {
  return applyDecorators(
    ApiTags('Tracks'),
    ApiOperation({
      summary: 'Get all tracks',
      description: 'Gets all library tracks list',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successful operation',
      type: Track,
      isArray: true,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function FindOneTrackByIdApi() {
  return applyDecorators(
    ApiTags('Tracks'),
    ApiOperation({
      summary: 'Get one Track by id',
      description: 'Find one library Track by its id',
    }),
    ApiBearerAuth(),
    ApiNotFoundResponse({
      description: 'Track not found',
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: Track,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function CreateTrackApi() {
  return applyDecorators(
    ApiTags('Tracks'),
    ApiOperation({
      summary: 'Add new track',
      description: 'Add new track to library',
    }),
    ApiBearerAuth(),
    ApiBody({ type: CreateTrackDto }),
    ApiCreatedResponse({ description: 'The track has been created' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function UpdateTrackApi() {
  return applyDecorators(
    ApiTags('Tracks'),
    ApiOperation({
      summary: 'Update track information',
      description: 'Update library track information by UUID',
    }),
    ApiBearerAuth(),
    ApiBody({ type: UpdateTrackDto }),
    ApiOkResponse({ description: 'The track has been updated' }),
    ApiNotFoundResponse({ description: 'Track not found' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function DeleteTrackApi() {
  return applyDecorators(
    ApiTags('Tracks'),
    ApiOperation({
      summary: 'Delete track',
      description: 'Deletes track from library by ID',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The track has been deleted' }),
    ApiNotFoundResponse({ description: 'Track not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AddTrackToFavouritesApi() {
  return applyDecorators(
    ApiTags('Tracks', 'Favourites'),
    ApiOperation({
      summary: 'Add track to favourites',
      description: 'Add track to favourites',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The track has been added to favourites',
    }),
    ApiNotFoundResponse({ description: 'Track not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function RemoveTrackFromFavouritesApi() {
  return applyDecorators(
    ApiTags('Tracks', 'Favourites'),
    ApiOperation({
      summary: 'Remove track from favourites',
      description: 'Remove track from favourites',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The track has been removed from favourites',
    }),
    ApiNotFoundResponse({ description: 'Track not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
