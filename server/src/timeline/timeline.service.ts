import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import * as path from "path"; // 경로
import * as fs from "fs"; // 파일 입출력
import { Comment } from 'src/entities/comment.entity';

@Injectable()
export class TimelineService {
    constructor (
        // 사용자 DB
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        // 게시글 DB
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        // 덧글 DB
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ) {}

    // 타임라인 출력
    userTimeline (email: string) {
        return User.find({
                where: [{ email: email }],
                select: ["email", "username", "registeredAt"],
                relations: ["posts", "follower", "follower.follower"],
            });
    }

    // 게시글 정보
    getPost(pid: string) {
        return Post
            // .createQueryBuilder("post")
            // .where("post.id = :id", { id: pid });
            .findOne(pid, {
            select: ["content", "picture", "pid", "writedAt"],
            // relations: ["writer", "comments"],
            join: {
                alias: "post", // 루트에 붙일 별명
                leftJoinAndSelect: { // join 정보
                    writer: "post.writer",
                    comments: "post.comments"
                },
            }
        });
    }

    // 덧글 정보 ( 내용, 작성자 )
    async getComments ( cid: number[] ) {
        // 정보가 없으면 예외처리
        if( !cid.length ) return [];
        const comments = await this.commentRepository
            .createQueryBuilder("comment")
            .where("comment.id IN (:arr)", { arr: cid })
            // join 할 참조변수, 대상 table
            .innerJoinAndSelect("comment.writer", "user")
            .orderBy("comment.writedAt")
            .getMany();
        // console.log(comments);
        return comments;
        // .find({ id: In(cid) })
    }

    // 덧글 작성
    async addComment ( pid: string, email: string, content: string ) {
        const user = await this.userRepository.findOne({ email: email });
        const post = await this.postRepository.findOne(pid);
        const result = await this.commentRepository.create({
            writer: user,
            post: post,
            content: content,
        }).save();
        // console.log("add new comment in here");
        return result;
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

    async follow (email: string) {
        console.log(email);
        const user = await this.userRepository.createQueryBuilder('user')
            .where("user.email = :email", { email: email })
            .innerJoinAndSelect('user.following', 'user')
            // .innerJoinAndSelect('user.follower', 'user')
            .getOne()
        console.log(user)
        return user;
    }
}
