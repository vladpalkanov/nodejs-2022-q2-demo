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

export function DeleteUserApi() {
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
