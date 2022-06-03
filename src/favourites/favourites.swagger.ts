import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Favourites } from './entities/favourites.entity';

export function FindAllBooksApi() {
  return applyDecorators(
    ApiTags('Favourites'),
    ApiOperation({
      summary: ' Get all favourites',
      description: 'Gets all favourites: tracks, books, movies',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successful operation',
      type: Favourites,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
