import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    // 팔로우 게시글 일괄 출력
    getFollowPosts (user: string) {
        return this.userRepository.createQueryBuilder('user')
            // .select("id email posts")
            .where('user.email = :email', { email: user })
            .leftJoinAndSelect("user.posts", "post")
            // .orderBy("user.posts.writedAt","DESC")
            .getOne();
    }
}
