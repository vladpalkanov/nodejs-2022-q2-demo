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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

export function FindAllArtistsApi() {
  return applyDecorators(
    ApiTags('Artists'),
    ApiOperation({
      summary: 'Get all Artists',
      description: 'Gets all library Artists list',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successful operation',
      type: Artist,
      isArray: true,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function FindOneArtistByIdApi() {
  return applyDecorators(
    ApiTags('Artists'),
    ApiOperation({
      summary: 'Get one Artist by id',
      description: 'Find one library Artist by its id',
    }),
    ApiBearerAuth(),
    ApiNotFoundResponse({
      description: 'Artist not found',
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: Artist,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function CreateArtistApi() {
  return applyDecorators(
    ApiTags('Artists'),
    ApiOperation({
      summary: 'Add new Artist',
      description: 'Add new Artist to library',
    }),
    ApiBearerAuth(),
    ApiBody({ type: CreateArtistDto }),
    ApiCreatedResponse({ description: 'The Artist has been created' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function UpdateArtistApi() {
  return applyDecorators(
    ApiTags('Artists'),
    ApiOperation({
      summary: 'Update Artist information',
      description: 'Update library Artist information by UUID',
    }),
    ApiBearerAuth(),
    ApiBody({ type: UpdateArtistDto }),
    ApiOkResponse({ description: 'The Artist has been updated' }),
    ApiNotFoundResponse({ description: 'Artist not found' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function DeleteArtistApi() {
  return applyDecorators(
    ApiTags('Artists'),
    ApiOperation({
      summary: 'Delete Artist',
      description: 'Deletes Artist from library by ID',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The Artist has been deleted' }),
    ApiNotFoundResponse({ description: 'Track not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
