import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrmModule } from './orm/orm.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    OrmModule,
    UsersModule,
    AuthModule,
    LoggerModule,
    TracksModule,
    AlbumsModule,
  ],
})
export class AppModule {}
