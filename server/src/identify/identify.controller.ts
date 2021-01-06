import { Body, Controller, Param, Post } from '@nestjs/common';
import { IdentifyService } from './identify.service';

@Controller('/api/identify')
export class IdentifyController {
    constructor (
        private readonly identifyService: IdentifyService
    ) {}

    @Post('/login')
    async loginRequest(@Body('email') email: string, @Body('password') password: string) {
        return await this.identifyService.loginRequest(email, password);
    }

    @Post('/register')
    async registerRequest() {
        return await this.identifyService.registerRequest();
    }

}
