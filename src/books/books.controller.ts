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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { BookService } from './books.service';
import {
  FindAllBooksApi,
  FindOneBookByIdApi,
  CreateBookApi,
  UpdateBookApi,
  DeleteBookApi,
} from './books.swagger';

@Controller('book')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindAllBooksApi()
  async findAll(): Promise<Array<Book>> {
    return this.bookService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindOneBookByIdApi()
  async findOneById(@Param('id') bookId: string): Promise<Book> {
    const book = await this.bookService.findOneById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @CreateBookApi()
  async create(@Body() createBookDto: CreateBookDto): Promise<void> {
    const book = Book.fromObject(createBookDto);

    this.bookService.save(book);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UpdateBookApi()
  async update(
    @Param('id') bookId: string,
    @Body() updateTrackDto: UpdateBookDto,
  ): Promise<void> {
    const book = await this.bookService.findOneById(bookId);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    Object.assign(book, updateTrackDto);

    this.bookService.save(book);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @DeleteBookApi()
  async delete(@Param('id') bookId: string): Promise<void> {
    const wasBookDeleted = await this.bookService.delete(bookId);

    if (!wasBookDeleted) {
      throw new NotFoundException('Book not found');
    }
  }
}
