import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Array<Movie>> {
    return this.movieRepository.find();
  }

  findOneById(id: string): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }

  async save(movie: Movie): Promise<void> {
    await this.movieRepository.save(movie);
  }

  async delete(movieId: string): Promise<boolean> {
    const result = await this.movieRepository.delete(movieId);

    return result.affected > 0;
  }
}
