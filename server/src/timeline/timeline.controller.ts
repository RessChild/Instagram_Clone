import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get('/create-post/:email')
    async a(@Param('email') email: string) {
        return await this.timelineService.createPost(email);
    }
}
