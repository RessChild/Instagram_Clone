import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Comment extends BaseEntity {
    // 자동 증가 아이디
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 작성 내용
    @Column({ length: 250 })
    content: '';

    // 관계맺기
    @ManyToOne( type => Post, post => post.comments )
    post: Post;
}