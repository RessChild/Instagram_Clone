import { Body, Controller, Get, Header, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TimelineService } from './timeline.service';
import { diskStorage } from "multer";

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
        return {
            login: jwt,
            timeline: user[0] || null,
        };
    }

    @Get('/post/:pid')
    async getPost(@Param('pid') pid: string) {
        // console.log("post detail");
        const result = await this.timelineService.getPost(pid);
        console.log(result);
        return result;
    }

    // 게시글 등록
    // https://docs.nestjs.com/techniques/file-upload
    @Put('/write-post')
    @UseInterceptors(FilesInterceptor('localImgs', 7, { // 필드명, 최대한도
        storage: diskStorage({ // 저장소 옵션
            destination: (req, file, cb) => { // 저장 위치
                cb(null, "./uploads")
            },
            filename: ( req, file, cb ) => { // 파일명 규칙
                cb( null, `${Date.now()}-${file.originalname}` );
            }
        })
    })) // 파일 업로드 옵션
    async writePost (@UploadedFiles() files, @Body() body) {
        // console.log("포스트 작성", files, body);

        const { email, jwt, text } = body;
        if( email !== jwt ) return null; // 작성자 정보가 다르면 실패
        return await this.timelineService.writePost(email, files.map(file => file.filename), text);
    }

    @Get('/html-img/:file_name')
    // @Header('Content-Type','application/octet-stream') // 이미지 형태를 전송하기 위해선 response 의 헤더를 수정해야 함
    // @Header('Content-Type','image/*') // 이미지 형태를 전송하기 위해선 response 의 헤더를 수정해야 함
    @Header('content-type', 'image/*; charset=base64')
    // @Header('X-Content-Type-Options', 'nosniff')
    async htmlImg (@Param('file_name') filename, @Res() res) {
        console.log(filename);

        const image = await this.timelineService.htmlImg( filename );
        // console.log('이미지 미리보기');
        return res.status(200).end(image);
    }

    @Get('/create-post/:email')
    async a(@Param('email') email: string) {
        return await this.timelineService.createPost(email);
    }
}
