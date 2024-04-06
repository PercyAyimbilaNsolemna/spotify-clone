import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/Entities/songs.entity';

const devConfig = { port: 3000 };

const proConfig = { port: 4000 };
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'host',
      password: 'host',
      database: 'spotify_clone',
      entities: [Song],
      synchronize: true,
    }),
    SongsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log(`Database name: ${dataSource.driver.database}`);
  }
  configure(consumer: MiddlewareConsumer) {
    //Applies the middleware to the entire route
    consumer.apply(LoggerMiddleware).forRoutes('songs');
    //Applies the middleware to only the POST request in the songs route
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST });
    //Applies the middleware to the entire route or controller
    //consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
