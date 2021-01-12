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
