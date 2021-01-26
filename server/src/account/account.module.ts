import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from "multer";
import { User } from 'src/entities/user.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    MulterModule.register({ // multer 옵션
      storage: diskStorage({ // 저장소 옵션
                destination: (req, file, cb) => { // 저장 위치
                    cb(null, "./profiles")
                },
                filename: ( req, file, cb ) => { // 파일명 규칙
                    cb( null, `${Date.now()}-${file.originalname}` );
                }
            })
    }),
    TypeOrmModule.forFeature([User]), // DB 옵션
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
