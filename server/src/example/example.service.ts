import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from 'src/entities/example.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExampleService {

    constructor(
        // DB 접근용 repository 객체
        @InjectRepository(Example) // Example 에 의존적임을 선언하는 데코레이터
        private readonly exampleRepository: Repository<Example>,
    ) {}

    testReturn() { return 'hello, this is example service'; }
    testDatabase() { return this.exampleRepository.find(); }
}
