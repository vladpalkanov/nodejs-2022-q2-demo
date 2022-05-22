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
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

export function FindAllAlbumsApi() {
  return applyDecorators(
    ApiTags('Albums'),
    ApiOperation({
      summary: 'Get all albums',
      description: 'Gets all library albums list',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successful operation',
      type: Album,
      isArray: true,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function CreateAlbumApi() {
  return applyDecorators(
    ApiTags('Albums'),
    ApiOperation({
      summary: 'Add new album',
      description: 'Add new album to library',
    }),
    ApiBearerAuth(),
    ApiBody({ type: CreateAlbumDto }),
    ApiCreatedResponse({ description: 'The album has been created' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function UpdateAlbumApi() {
  return applyDecorators(
    ApiTags('Albums'),
    ApiOperation({
      summary: 'Update album information',
      description: 'Update library album information by UUID',
    }),
    ApiBearerAuth(),
    ApiBody({ type: UpdateAlbumDto }),
    ApiOkResponse({ description: 'The album has been updated' }),
    ApiNotFoundResponse({ description: 'Album not found' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function DeleteAlbumApi() {
  return applyDecorators(
    ApiTags('Albums'),
    ApiOperation({
      summary: 'Delete album',
      description: 'Deletes album from library by ID',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The album has been deleted' }),
    ApiNotFoundResponse({ description: 'Track not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
