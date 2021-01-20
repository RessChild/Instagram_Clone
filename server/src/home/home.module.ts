import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Post, Follow ])
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
