import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: [`.env`] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Category],
      synchronize: false,
      logging: false,
    }),
    AuthModule,
    UserModule,
    CategoryModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
