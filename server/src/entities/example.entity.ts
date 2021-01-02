import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('table_name')
export class Example extends BaseEntity {
    // 자동생성되는 고유키
    @PrimaryGeneratedColumn()
    id: number;

    // 속성정보
    @Column()
    colum_name: string;
}