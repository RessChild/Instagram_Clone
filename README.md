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
    - typeorm 에서 join 의 일부 column 만 선택하고싶은데, 정보가 너무 없음
      ( Error: Relation with property path email in entity was not found. )
6. 2021/01/13
    - typeorm 헤메는 중.. 이걸 써야하나..
    - join table 에 대한 상세조정이 안되서 typeorm 은 실전에서 쓰는건 보류해야할 듯.
7. 2021/01/14
    - 덧글 기능 제작 중.
    - join 대상의 내부 참조를 다시 join 하는 방법을 찾을 것
8. 2021/01/15
    - 덧글 등록 + 출력기능
    - join 관련한 해결책 구성
    - 줄바꿈 기능 고려해볼 것 ( display: content 로 처리완료 )
9. 2021/01/18
    - 메인 페이지 구축하기
    - 팔로우 관련 기능 추가 필요
10. 2021/01/19
    - 팔로우 기능도 크게 2가지로 만드는 듯
        1. 직접 user entity 끼리 연결짓기 (many to many)
        2. follow 라는 객체를 통해서 연결하기 ( 2개의 one to many )
    - Cannot read property 'tablePath' of undefined
        : manyToMany 로 하려니까 현재 발생하는 오류
    - 그래서 객체를 중간에 두는 형태로 우선 제작하려고 함
11. 2021/01/21
    - 사용자 timeline 게시판 갱신
    - 팔로우 유저 게시글만 보이도록 기능 개선
    - 팔로우 제거 기능도 추가해야하고, 팔로우 여부 체크하는 것도 수정 필요
        : 팔로우 여부는 따로 기능을 찾아봐야하나..
    - 메인 페이지 좌측 리스트를 고정값으로 수정할 것
12. 2021/01/22
    - 팔로우 / 언팔로우 기능 구현
    - 우측 프로필을 스크롤 고정으로 쓰려고 했으나, relative 를 안쓰는 방식을 찾아야 함
        : window.innerWidth 랑 rem 을 px 단위로 바꿔서 계산하도록 처리
          근데, 동적으로 처리되는게 아니고 한번 값이 고정되면 그 위치를 사수함.. 개선 필요
          => 우선은 원상복구시킴
    - 로그아웃 버튼 만들기, 회원가입 기능 만들기