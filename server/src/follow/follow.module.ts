import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';
import { User } from 'src/entities/user.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow])
  ],
  controllers: [FollowController],
  providers: [FollowService]
})
export class FollowModule {}
