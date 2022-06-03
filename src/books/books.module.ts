import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { BookService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), FavouritesModule],
  providers: [BookService],
  controllers: [BooksController],
})
export class BooksModule {}
