import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccountService } from './account.service';


// 계정정보 수정
@Controller('/api/account')
export class AccountController {
    constructor (
        private readonly accountService: AccountService,
    ) {}

    @Post('/')
    async getAccount (@Body('jwt') email: string) {
        const result = await this.accountService.getAccount(email);
        // console.log(email, result);
        return result;
    }

    @Post('/set-profile-image')
    // @UseInterceptors(FilesInterceptor('image', 1, { // 필드명, 최대한도
    //     storage: diskStorage({ // 저장소 옵션
    //         destination: (req, file, cb) => { // 저장 위치
    //             cb(null, "./profiles")
    //         },
    //         filename: ( req, file, cb ) => { // 파일명 규칙
    //             cb( null, `${Date.now()}-${file.originalname}` );
    //         }
    //     })
    // })) // 파일 업로드 옵션
    @UseInterceptors(FileInterceptor('image'))
    async setProfileImage (@UploadedFile() file, @Body('jwt') user: string) {
        // console.log(file, user);
        if( !file || !user ) return null;
        const result = await this.accountService.setProfileImage(file.filename, user);
        console.log(result);
        return { ...result, filename: file.filename }; // 결과 반환
    }

    // 프로필 정보 수정
    @Post('/set-profile')
    async setProfile (@Body('jwt') origin: string, @Body('name') username: string, @Body('email') email: string) {
        const result = await this.accountService.setProfile(origin, username, email);
        console.log(result);
        return result;
    }

    // 프로필 이미지
    @Get('/html-img/:img')
    async htmlImg (@Param('img') img: string, @Res() res) {
        const image = await this.accountService.htmlImg(img);
        return res.status(200).end(image);
    }

    // 비밀번호 수정
    @Post('/set-password')
    async setPassword (@Body() body) {
        const { jwt, password, nPassword } = body;
        const result = await this.accountService.setPassword(jwt, password, nPassword);
        return result;
    }
}
