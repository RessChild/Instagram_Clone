import { userInfo } from "os";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('follow')
export class Follow extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    fid: string;

    // 팔로잉, 팔로워 관계
    @ManyToOne(() => User, user => user.following)
    following: User;
    @ManyToOne(() => User, user => user.follower)
    follower: User;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: string;
}