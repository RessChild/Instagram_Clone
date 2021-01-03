import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';

@Module({
    imports: [ // 사용 DB 선언
        TypeOrmModule.forFeature([ User, Post ])
    ],
    controllers: [TimelineController],
    providers: [TimelineService]
})
export class TimelineModule {}
