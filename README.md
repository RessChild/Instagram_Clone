# 기본 세팅
    - front: REACT / AXIOS / REACT-ICONS / REACT-SPRING / MULTER
        1. npx create-react-app webpage
        2. npm i http-proxy-middleware --save
        3. npm i axios --save
        4. npm i multer --save
    - back: NESTJS / TYPESCRIPT / TYPEORM (mysql)
        1. npm i nestjs -g
        2. nest new project_name ( 내부에 생성되는 .git 폴더 제거 )
        4. npm i @nestjs/typeorm typeorm --save
        5. npm i @nestjs/jwt passport-jwt --save
        6. npm i @types/passport-jwt --save-dev
        7. npm i dotenv --save
        8. npm i mysql --save
        
# 실행 방법
    * 실행 전에 각 폴더에서 "npm i" 실행 
    - front : npm start
    - back  : npm start / npm run start:dev

# webpage ( Front )
- setupProxy 는 src 내부에 존재해야 함
- .env 파일 작성할 것

# server ( Back )
- .env 파일 작성할 것
- 사용할 DATABASE 를 먼저 생성한 후 실행 필요
- 모듈 생성 절차
    1. nest g service 모듈명
    2. nest g controller 모듈명
    3. nest g module 모듈명
- TYPEORM 연동 절차
    1. entity 객체 생성 ( TABLE 정보를 선언 )
    2. 사용할 모듈에 TYPEORM 모듈 정보를 import

# NestJS
- nestjs 는 크게 3종류의 파일로 하나의 모듈이 구성됨
    1. module: 구성하는 파일을 묶는 정보용 파일
    2. controller: 주소, 방식에 따라 설정한 작업을 할당. 사용자에게 결과반환 (router)
    3. service: 실제 세부 작업이 이루어지는 파일. controller 에게 값을 반환

# branch 생성
- git branch snsClone
- git checkcout snsClone

# 진행 상황
1. 2021/01/03
    - 화면 구성 기본 폼까진 구축
    - DB 연동 진행 중 ( user, post )
2. 2021/01/06
    - 기본 로그인 / 화면전환 구성
    - 인스타그램은 웹 내에서 게시글 등록이 없으므로 임의로 해당 기능 구현 진행
      ( 모바일에선, 사진을 다수 선택하면 좌측 스크롤로 좌르륵 등장 + 추가버튼 존재 )
3. 2021/01/08
    - 사진 업로드 및 게시글 생성까진 완료
    - 다만, 대표이미지를 불러오는 과정에서 헤더설정이 진행 안되는 중
4. 2021/01/11
    - 이미지 미리보기 문제 해결
      @res() '객체'를 설정하여 return 하는 방식을 써야함
      ( 즉, return res 형태를 취하고 있음. )
5. 2021/01/12
    - typeorm 에서 relation 의 출력 순서를 바꾸려고 시도중 
      ( 아마, id 순으로 정렬되는 것 같은데, 현 시점에선 랜덤값이라 순서가 지멋대로 )