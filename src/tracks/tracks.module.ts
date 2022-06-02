import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Track } from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesModule } from 'src/favourites/favourites.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), FavouritesModule],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
