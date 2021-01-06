# 구성요소
- REACT / AXIOS / MATERIAL-UI / REACT-ICONS / REACT-SPRING
- npm i @material-ui/core --save
- npm i react-icons --save
- npm i react-router react-router-dom --save
- npm i react-spring --save

# react-spring
- 애니메이션용 모듈
- https://www.react-spring.io/docs/hooks/examples

# 주의할 점
- react-router-dom 의 redirect 는 switch 로 감싸야 오류없이 작동
  ( 감싸지 않으면, 다른 페이지도 전부 redirect 시킴 )
- css 의 fixed 와 absolute 차이는, 화면 전체 기준이냐 부모 기준이냐
  ( 다만, 자신의 부모 기준으로 절대위치를 잡을 경우, 부모의 position 은 relative 가 될 것 )
- animated 에서 box 가 층층이 생기는것을 막기위해선 position="absolute" 설정할 것