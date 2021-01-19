import { Body, Controller, Post } from '@nestjs/common';
import { HomeService } from './home.service';

// 메인 홈 정보 ( 팔로워 게시글 )
@Controller('/api/home')
export class HomeController {
    // 모든 팔로워 게시글 출력

    constructor(
        private readonly homeService: HomeService
    ) {}

    @Post()
    async getFollowPosts (@Body('jwt') user: string) { // 사용자 정보
        const { password, salt, ...others } = await this.homeService.getFollowPosts(user);
        console.log("home:", user, others);
        
        return {
            ...others,
            posts: others.posts.sort((a: any,b: any) => b.writedAt - a.writedAt),
        }
    }
}
