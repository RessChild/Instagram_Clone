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
        
        const result = await this.followRepository.create({
                follower: follower_user,
                following: following_user,
            })
            .save();
        console.log(result);
        return result;
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
        
        // const result = await this.followRepository.delete({
        //     follower: follower_user.id,
        //     following: following. id,
        // })
    }
}