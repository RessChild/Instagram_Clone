# 구성요소
- NESTJS / TYPEORM / MYSQL
- npm i multer --save

# identify
- 로그인 / 회원가입

# timeline
- 특정 사용자의 정보 및 게시글 열람 기능

# 참고사이트
- https://yangeok.github.io/orm/2020/12/14/typeorm-decorators.html

# 주의사항
- nestjs 에서 response 의 헤더를 수정하거나 파일류를 전송해야 하는 경우,
  @Res() 타입을 선언하여 이를 return 하는 방식으로 해결이 가능
  ( res는 그저 객체의 일종이고, 실제 데이터 전송은 return 을 통해 이루어지므로, 이를 주의 )
- typeorm 에서 relation 의 결과를 '조건에 의한 정렬' 형태로 출력하길 원한다면,
  @Entity() 의 2번째 인자에 정렬 기준을 명시해주어야 함
- innerJoin 과 leftJoin 의 차이점 ( 중복정보만으로 테이블 구성 or 모든 정보로 테이블 구성 )
- typeorm 의 join 의 경우, 2가지 정보가 필요 ( alias: 루트를 부를 별명, join 정보 )
  하지만 구동에 있어서 별 차이는 없는 듯 함..
- typeorm 의 @JoinTable 은 table 을 새로 생성하니까 주의할 것
- remove: 객체로 삭제 / delete: id 혹은 상태값으로 삭제
- join 에서 다시 join 을 하려면, relation 에서 '.' 으로 호출
  ( ex. follower.follower )
- 1rem = 16px
- window.innerWidth 사용
- module 에서 MulterModule 을 통해 내부에서 사용할 multer 옵션을 공통으로 설정 가능
- Multer 에서 단일 파일을 받고자 하는 경우,
  FileInterceptor / UploadedFile 를 맞춰서 사용 해야함 (단일/복수 주의)
- typeorm 의 update 방식 
  1. save 를 통한 덮어쓰기 
  2. update 함수 활용 : https://libsora.so/posts/typeorm-entity-proxy-for-save/