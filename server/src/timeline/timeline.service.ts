import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimelineService {

    constructor (
        // 사용자 DB
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        // 게시글 DB
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {}

    userTimeline (email: string) {
        return User.find({ email: email });
    }

    generateDefault ()
    {
        return User.create({
            email: '1111',
            password: '1111',
            salt: '1234',
        }).save();
    }
}
