import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {

    constructor(
        private readonly service: ExampleService,
    ) {}

    @Get()
    testReturn() {
        return this.service.testReturn();
    }

    @Get('/database')
    async testDatabase() {
        return await this.service.testDatabase();
    }
}
