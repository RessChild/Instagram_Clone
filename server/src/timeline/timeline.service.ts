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
        // return User.findOne({ where: [{ email: email }], 
        //         select: ["email", "registeredAt"],
        //         relations: ["posts"],
        //         // join: {
        //         //     alias: "posts",
        //         // }
        //     });
        // return User.findOne({

        //[ExceptionsHandler] ER_BAD_FIELD_ERROR: Unknown column 'distinctAlias.User_id' in 'field list'

        return User.find({ 
                where: [{ email: email }],
                select: ["email", "username", "registeredAt"],
                relations: ["posts"],
            });
    }

    async generateDefault (email: string)
    {
        const user = await User.create({
                email: email,
                username: email,
                password: email,
                salt: '1234',
            }).save();
        return Post.create({
                writer: user,
                picture: ['a', 'b', 'c'],
            }).save();
    }

}
