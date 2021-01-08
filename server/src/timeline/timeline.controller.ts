import { Body, Controller, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TimelineService } from './timeline.service';

@Controller('/api/timeline')
export class TimelineController {
    // 생성자
    constructor (
        private readonly timelineService: TimelineService,
    ) {}

    // email 값을 받아와 정보를 반환
    @Post('/profile/:email')
    async userTimeline (@Param('email') email: string, @Body('jwt') jwt: string) {
        // console.log("timeline api", email);
        const user = await this.timelineService.userTimeline(email);
        console.log(user[0]);
        return {
            login: jwt,
            timeline: user[0] || null,
        };
        // return {
        //     ...user,
        //     registeredAt: user.registeredAt.toDateString().slice(0,11),
        // }
    }

    // 게시글 등록
    // https://docs.nestjs.com/techniques/file-upload
    @Put('/write-post')
    @UseInterceptors(FilesInterceptor('localImgs', 7,  // 필드명, 최대한도
    )) // 파일 업로드 옵션
    // 일종의 미들웨어이므로, 업로드 역할을 수행하는 multer 선언이 따로 필요
    async writePost (@UploadedFiles() files, @Body('text') text: string) {
        console.log("포스트 작성", files, text);
        return 'write-post';
    }

    @Get('/create-post/:email')
    async a(@Param('email') email: string) {
        return await this.timelineService.createPost(email);
    }
}
