import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';

@Module({
    imports: [ // 사용 DB 선언
        TypeOrmModule.forFeature([ User, Post ]),
        MulterModule.register({ // 파일 업로드 모듈
            dest: './uploads', // 위치 ( 실행 위치와의 상대경로 )
        })
    ],
    controllers: [TimelineController],
    providers: [TimelineService]
})
export class TimelineModule {}
