import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './utils/files/file.module';
import { ProfileModule } from './profile/profile.module';
import { CaslModule } from './casl/casl.module';
import { UserGroupModule } from './user-group/user-group.module';
import { UserGroupRightsModule } from './user-group-rights/user-group-rights.module';
import { ResourceModule } from './resource/resource.module';
import { CreateModule } from './create/create.module';
import { ReadModule } from './read/read.module';
import { UpdateModule } from './update/update.module';
import { DeleteModule } from './delete/delete.module';
import { BookModule } from './book/book.module';
import { LoanedBookModule } from './loaned-book/loaned-book.module';
import { LoanStatusModule } from './loan-status/loan-status.module';
import { VolumeInfoModule } from './volume-info/volume-info.module';
import { AuthorsModule } from './authors/authors.module';
import { IndustryIdentifiersModule } from './industry-identifiers/industry-identifiers.module';
import { CategoriesModule } from './categories/categories.module';
import { ImageLinksModule } from './image-links/image-links.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({cache: true})],    
    useFactory: (configService: ConfigService) => ({
      type: "postgres",
      host: configService.get('HOST'),
      port: +configService.get<number>('PORT'),
      username: configService.get('USERNAME'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: [__dirname + '/migration/**/*.ts', __dirname + '/migration/**/*.js'],
      cli: {
        "migrationsDir": "src/migration"
      },
      keepConnectionAlive: true,
      autoLoadEntities: true      
    }),
    inject: [ConfigService],
  }),
  UsersModule,
  FileModule,
  ProfileModule,
  AuthModule,
  CaslModule,
  UserGroupModule,
  UserGroupRightsModule,
  ResourceModule,
  CreateModule,
  ReadModule,
  UpdateModule,
  DeleteModule,
  BookModule,
  LoanedBookModule,
  LoanStatusModule,
  VolumeInfoModule,
  AuthorsModule,
  IndustryIdentifiersModule,
  CategoriesModule,
  ImageLinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}