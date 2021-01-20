import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {
    
    constructor(
        @InjectRepository(User) // 유저 정보
        private readonly userRepository: Repository<User>,
        @InjectRepository(Post) // 게시글 정보
        private readonly postRepository: Repository<Post>,
        @InjectRepository(Follow) // 팔로우 정보
        private readonly followRepository: Repository<Follow>,
    ) {}

    // 팔로우 게시글 일괄 출력
    async getFollowPosts (email: string) {
        // 로그인 대상자의 id 출력
        const { id } = await this.userRepository.createQueryBuilder('user')
            .where("user.email = :email", { email: email })   
            .getOne();
        
        // 팔로우한 사람들 목록 출력
        const following = await this.followRepository.createQueryBuilder('follow')
            .where("follow.follower = :user", { user: id })
            .getMany();
        console.log(following);

        if( !following.length ) return [];
        const result = await this.postRepository.createQueryBuilder('post')
            .where('post.writer IN :writer', { writer: following.map(({ following }) => following ) })
            .leftJoinAndSelect('post.writer','user')
            .getMany();
        console.log(result);
        return result;
    }
}
