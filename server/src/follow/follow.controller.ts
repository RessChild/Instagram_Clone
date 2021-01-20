import { Body, Controller, Post } from '@nestjs/common';
import { FollowService } from './follow.service';

// 팔로우 관련 기능 (온,오프)
@Controller('/api/follow')
export class FollowController {
    constructor(
        private readonly followService: FollowService
    ) {};

    @Post()
    async follow (@Body('jwt') user: string, @Body('following') following: string, @Body('type') type :Boolean) {
        let result;

        if( type ) result = await this.followService.follow(user, following);
        else result = await this.followService.unfollow(user, following);

        return result;
    };
}
