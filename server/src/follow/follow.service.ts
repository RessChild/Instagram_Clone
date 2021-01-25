import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/entities/follow.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Follow)
        private readonly followRepository: Repository<Follow>,
    ) {}

    async follow (follower: string, following: string) {
        // 팔로워
        const follower_user = await this.userRepository.createQueryBuilder('user')
            .where('user.email = :email', { email: follower })
            .getOne();
        
        // 팔로잉
        const following_user = await this.userRepository.createQueryBuilder('user')
            .where('user.email = :email', { email: following })
            .getOne();
        
        
        const follow = await this.followRepository.findOne(null, {
            where: {
                follower: follower_user,
                following: following_user,
            }});

        if( follow ) return follow; // 이미 존재한다면 그냥 냅둠
        return await this.followRepository.create({ // 없었으면 만들어서 반환
                follower: follower_user,
                following: following_user,
            })
            .save();
    }

    async unfollow (follower: string, following: string) {
        // 팔로워
        const follower_user = await this.userRepository.createQueryBuilder('user')
            .where('user.email = :email', { email: follower })
            .getOne();
        
        // 팔로잉
        const following_user = await this.userRepository.createQueryBuilder('user')
            .where('user.email = :email', { email: following })
            .getOne();
        
        // 팔로우 제거
        const result = await this.followRepository.delete({
            follower: follower_user,
            following: following_user,
        });
        return result;
    }
}