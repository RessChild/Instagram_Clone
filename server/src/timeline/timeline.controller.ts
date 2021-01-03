import { Controller, Get, Param } from '@nestjs/common';
import { TimelineService } from './timeline.service';

@Controller('/api/timeline')
export class TimelineController {
    // 생성자
    constructor (
        private readonly timelineService: TimelineService,
    ) {}

    // email 값을 받아와 정보를 반환
    @Get('/profile/:email')
    async userTimeline (@Param('email') email: string) {
        console.log("timeline api", email);
        return await this.timelineService.userTimeline(email);
    }
}
