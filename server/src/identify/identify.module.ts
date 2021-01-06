import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IdentifyController } from './identify.controller';
import { IdentifyService } from './identify.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ User ])
    ],
    controllers: [IdentifyController],
    providers: [IdentifyService],
})
export class IdentifyModule {}
