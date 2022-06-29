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
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

export function FindAllBooksApi() {
  return applyDecorators(
    ApiTags('Books'),
    ApiOperation({
      summary: 'Get all Books',
      description: 'Gets all library Books list',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successful operation',
      type: Book,
      isArray: true,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function FindOneBookByIdApi() {
  return applyDecorators(
    ApiTags('Books'),
    ApiOperation({
      summary: 'Get one Book by id',
      description: 'Find one library Book by its id',
    }),
    ApiBearerAuth(),
    ApiNotFoundResponse({
      description: 'Book not found',
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: Book,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function CreateBookApi() {
  return applyDecorators(
    ApiTags('Books'),
    ApiOperation({
      summary: 'Add new Book',
      description: 'Add new Book to library',
    }),
    ApiBearerAuth(),
    ApiBody({ type: CreateBookDto }),
    ApiCreatedResponse({ description: 'The Book has been created' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function UpdateBookApi() {
  return applyDecorators(
    ApiTags('Books'),
    ApiOperation({
      summary: 'Update Book information',
      description: 'Update library Book information by UUID',
    }),
    ApiBearerAuth(),
    ApiBody({ type: UpdateBookDto }),
    ApiOkResponse({ description: 'The Book has been updated' }),
    ApiNotFoundResponse({ description: 'Book not found' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function DeleteBookApi() {
  return applyDecorators(
    ApiTags('Books'),
    ApiOperation({
      summary: 'Delete Book',
      description: 'Deletes Book from library by ID',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The Book has been deleted' }),
    ApiNotFoundResponse({ description: 'Book not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
