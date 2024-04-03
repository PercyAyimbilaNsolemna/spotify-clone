import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/common/middleware/logger/logger.middleware';

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
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
