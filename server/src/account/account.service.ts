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
    async setProfileImage (filename: string, email: string) {
        // 파일 삭제 함수가 들어가야 함 ==> fs.unlink 라는 함수 활용
        const profile = await this.userRepository.findOne({ email: email }, { select: ['profile_image'] });
        const result = await this.userRepository.update({ email: email }, { profile_image: filename });
        if( profile.profile_image ) await fs.promises.unlink(path.join(__dirname, `../../profiles/${profile.profile_image}`))
        return result;
    }

    // 프로필 수정
    async setProfile (origin: string, username: string, email: string) {
        const user = await this.userRepository.findOne({ email: origin });
        const result = await this.userRepository.save({
                ...user,
                email: email,
                username: username,
            });
        return result;
    }
    
    // 프로필 사진 호출
    async htmlImg (img: string) {
        const file = await fs.promises.readFile( path.join(__dirname, `/../../profiles/${img}` ) );
        return file;
    }

    // 비밀번호 수정
    async setPassword (email: string, password: string, nPassword: string) {
        const user = await this.userRepository.findOne({ email: email }); // 사용자 검색
        if( user.password !== password ) return 404; // 비밀번호가 다르면 수정 실패
        const result = this.userRepository.save({ ...user, password: nPassword });
        return !!result ? 200 : 501; // 수정해서 저장
    }
}
