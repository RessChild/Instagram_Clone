import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import * as path from "path";
import * as fs from "fs"; // 파일 입출력

// 계정정보 수정
@Injectable()
export class AccountService {
    constructor (
        @InjectRepository(User) // 사용자 DB
        private readonly userRepository: Repository<User>,
    ) {}

    // 기본 정보
    getAccount (email: string) {
        return this.userRepository.findOne({ email: email }, { select: ["email", "username", "profile_image"] });
    }

    // 프로필 사진 변경
    setProfileImage (filename: string, email: string) {
        // 파일 삭제 함수가 들어가야 함 ==> fs.unlink 라는 함수 활용
        return this.userRepository.update({ email: email }, { profile_image: filename });
    }
    
    // 프로필 사진 호출
    async htmlImg (img: string) {
        const file = await fs.promises.readFile( path.join(__dirname, `/../../profiles/${img}` ) );
        return file;
    }
}
