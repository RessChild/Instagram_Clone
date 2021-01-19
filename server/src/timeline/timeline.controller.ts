import { Body, Controller, Get, Header, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TimelineService } from './timeline.service';
import { diskStorage } from "multer";
import { writer } from 'repl';

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
            timeline: user[0]
                // 등록 순서로 정렬하여 반환
                ? { ...user[0], posts: user[0].posts.sort((a: any,b: any) => b.writedAt - a.writedAt ) } 
                : null,
        };
    }

    @Get('/post/:pid')
    async getPost(@Param('pid') pid: string) {
        const result = await this.timelineService.getPost(pid);
        const comments = await this.timelineService.getComments(result.comments.map( comment => comment.id ));

        return {
            ...result,
            writer: { // 필요한 정보만 필터링
                id: result.writer.id,
                email: result.writer.email,
            },
            comments: comments.map( ({ writer, ...others }) => {
                // 덧글작성자 정보 필터링
                const { password, salt, ...infos } = writer;
                return {
                    ...others,
                    writer: infos,
                }
            })
        };
    }

    // 덧글 작성
    @Post('/add-comment/:pid')
    async addComment(@Param('pid') pid: string, @Body() body) {
        const { jwt, content } = body; // 정보 추출
        console.log(jwt, content);
        return this.timelineService.addComment(pid, jwt, content);
        // return 'i will add new commnet';
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

    // 이미지 미리보기
    @Get('/html-img/:file_name')
    @Header('content-type', 'image/*; charset=base64') // 이미지 형태를 전송하기 위해선 response 의 헤더를 수정해야 함
    async htmlImg (@Param('file_name') filename, @Res() res) {
        console.log(filename);

        const image = await this.timelineService.htmlImg( filename );
        // console.log('이미지 미리보기');
        return res.status(200).end(image);
    }

    @Get('/follow/:email')
    async a(@Param('email') email: string) {
        return await this.timelineService.follow(email);
    }
}
