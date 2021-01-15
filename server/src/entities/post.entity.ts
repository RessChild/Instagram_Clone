import { BaseEntity, Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity("post", { orderBy: { writedAt: "DESC" }}) // 생성할 이름, 추가 옵션 (정렬)
export class Post extends BaseEntity {
    // @PrimaryColumn('varchar', { length: <max shortId length>, default: () => `'${shortid.generate()}'` })
    @PrimaryGeneratedColumn()
    pid: string;

    // 각 게시글이 갖는 이미지 모음 ( 1번 이미지가 대표 ) 
    @Column({ type: "simple-array" })
    picture: string[];
    @Column({ length: 200, default: '' })
    content: string;

    @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    writedAt: Date;

    // 관계 맺기
    // 작성자
    @ManyToOne(type => User, user => user.posts, { nullable: false, onDelete: 'CASCADE' })
    writer: User; // 각 게시글의 작성자는 유일
    
    // 덧글
    @OneToMany( type => Comment, comment => comment.post)
    // @JoinTable({
    //     name: "comments",
    //     joinColumn: {
    //         name: "id",
    //         referencedColumnName: "id",
    //     }
    // })
    comments: Comment[];
}