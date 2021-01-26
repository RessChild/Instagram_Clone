import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, RelationCount } from "typeorm";
import { Comment } from "./comment.entity";
import { Follow } from "./follow.entity";
import { Post } from "./post.entity";

@Entity()
export class User extends BaseEntity {
    // 고유 랜덤 키
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 20, unique: true, nullable: false })
    email: string;
    @Column({ length: 10, /*unique: true, nullable: false*/ })
    username: string;
    @Column({ length: 15 })
    password: string;
    @Column()
    salt: string;

    // 프로필 이미지
    @Column()
    profile_image: string;

    // 가입일자
    @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    registeredAt: Date;

    // 관계 생성 ( 1:M )
    // 참조할 DB 객체정보, 내 정보를 저장할 상대편 변수명
    @OneToMany(type => Post, post => post.writer)
    posts: Post[]; // 사용자는 다수의 게시글 작성

    // 덧글과의 관계
    @OneToMany(type => Comment, comment => comment.writer)
    comments: Comment[];

    // 팔로우, 팔로잉
    @OneToMany(type => Follow, follow => follow.following)
    @JoinColumn({
        name: 'follower'
    })
    follower: Follow[]; // 나를 따르는 사람
    @OneToMany(type => Follow, follow => follow.follower)
    @JoinColumn({
        name: 'following',
    })
    following: Follow[]; // 내가 따르는 사람

    // 숫자정보
    @RelationCount((follow: Follow) => follow.follower)
    followerCount: number;
    @RelationCount((follow: Follow) => follow.following)
    followingCount: number;
}