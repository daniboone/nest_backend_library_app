import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({cache: true})],    
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('HOST'),
      port: +configService.get<number>('PORT'),
      username: configService.get('USERNAME'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,      
    }),
    inject: [ConfigService],
  }),
  UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}