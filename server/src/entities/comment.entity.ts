import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment extends BaseEntity {
    // 자동 증가 아이디
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 작성 내용
    @Column({ length: 250 })
    content: string;

    // 작성시간
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    writedAt: Date

    // 관계맺기
    @ManyToOne( type => Post, post => post.comments )
    post: Post; // 등록된 게시글
    @ManyToOne( type => User, user => user.comments )
    @JoinColumn({ // 저장되는 db 명칭 결정
        name: "user_id"
    })
    writer: User; // 덧글 작성자
}