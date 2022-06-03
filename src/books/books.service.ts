import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Array<Book>> {
    return this.bookRepository.find();
  }

  findOneById(id: string): Promise<Book> {
    return this.bookRepository.findOneBy({ id });
  }

  async save(movie: Book): Promise<void> {
    await this.bookRepository.save(movie);
  }

  async delete(bookId: string): Promise<boolean> {
    const result = await this.bookRepository.delete(bookId);

    return result.affected > 0;
  }
}
