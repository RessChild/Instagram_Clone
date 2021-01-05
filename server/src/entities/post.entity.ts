import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    pid: string;

    // 각 게시글이 갖는 이미지 모음 ( 1번 이미지가 대표 ) 
    @Column({ type: "simple-array" })
    picture: string[];

    @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    writedAt: Date;

    // 관계 맺기
    @ManyToOne(type => User, user => user.posts)
    writer: User; // 각 게시글의 작성자는 유일
}