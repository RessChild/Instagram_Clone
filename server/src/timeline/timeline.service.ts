import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import * as path from "path"; // 경로
import * as fs from "fs"; // 파일 입출력

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

    // 타임라인 출력
    userTimeline (email: string) {
        return User.find({
                where: [{ email: email }],
                select: ["email", "username", "registeredAt"],
                relations: ["posts"],
            });
    }

    getPost(pid: string) {
        return Post
            // .createQueryBuilder("post")
            // .where("post.id = :id", { id: pid });
            .findOne(pid, {
            select: ["content", "picture", "pid", "writedAt"],
            relations: ["writer"],
            // join: {
            //     alias: "writer",
            //     leftJoinAndSelect: {
            //         email: "user.email",
            //     }
            // }
        });
    }

    // 게시글 작성
    async writePost (email: string, filenames: string[], content) { 
        const user = await User.findOne(null, {
            where: [{ email: email }]
        });
        const result = await Post.create({
            writer: user,
            picture: filenames,
            // content: ,
        }).save();
        return result;
    }

    // 이미지 미리보기
    async htmlImg (filename: string) {
        const file = await fs.promises.readFile( path.join(__dirname, `/../../uploads/${filename}` ) );
        const filename_split = filename.split('.');
        const type = filename_split[filename_split.length - 1];

        return file;
        // return `data:image/*;base64,${Buffer.from(file).toString('base64')}`;
        // return file.toString('base64');
        // return Buffer.from(file).toString('base64');
        // return `data:image/${type};base64, ${file.toString('base64')}`;
    }

    async createPost (email: string) {
        const user = await User.findOne(null, {
            where: [{ email: email }]
        })
        // console.log(user);
        const result = await Post.create({
                writer: user,
                picture: ['test', 'pictures'],
            }).save();
        // console.log("post result:", result);
        return result;
    }
}
