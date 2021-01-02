import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from 'src/entities/example.entity';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Example,
    ])
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
