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

export function FindOneAlbumByIdApi() {
  return applyDecorators(
    ApiTags('Albums'),
    ApiOperation({
      summary: 'Get one album by id',
      description: 'Find one library album by its id',
    }),
    ApiBearerAuth(),
    ApiNotFoundResponse({
      description: 'Album not found',
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: Album,
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

export function AddTrackToAlbumApi() {
  return applyDecorators(
    ApiTags('Albums', 'Tracks'),
    ApiOperation({
      summary: 'Add track to album',
      description: 'Add track to album by UUID',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The track has been added to album' }),
    ApiNotFoundResponse({ description: 'Track not found | Album not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function RemoveTrackFromAlbumApi() {
  return applyDecorators(
    ApiTags('Albums', 'Tracks'),
    ApiOperation({
      summary: 'Remove track from album',
      description: 'Remove track from album by UUID',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The track has been removed from album',
    }),
    ApiNotFoundResponse({ description: 'Track not found | Album not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
