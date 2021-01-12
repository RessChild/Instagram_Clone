import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Box, IconButton } from "@material-ui/core";
import { useTransition, animated } from "react-spring";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsPlusSquareFill } from "react-icons/bs";
import { CHANGE_DATA, PostInit, PostReduce } from "./reducer/PostReducer";

// react-spring 참고 링크
// https://www.react-spring.io/docs/hooks/examples

// 신규 포스트 등록 화면
const Post = ({ pid }) => {

    const source = axios.CancelToken.source();

    const [ state, dispatch ] = useReducer(PostReduce, PostInit);
    const { isLoading, page, post } = state;
    const { picture, content } = post;

    // const [ page, setPage ] = useState(0); // 현재 페이지 번호
    // const [ images, setImages ] = useState([]); // 이미지 리스트

    // 좌,우 버튼 클릭 함수
    const onClickLeft = () => dispatch({ type: CHANGE_DATA, data: { page: page - 1 }});
    const onClickRight = () => dispatch({ type: CHANGE_DATA, data: { page: page + 1 }});

    // 애니메이션 옵션
    // 사용할 인덱스, ??, 애니메이션 스타일
    const transitions = useTransition(page, p => p, { 
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' }, // 좌측
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' }, // 중앙
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }, // 우측
    });


    const axiosPost = () => {
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.get(`/api/timeline/post/${pid}`, { cancelToken: source.token })
            .then(({ data }) => {
                console.log(data);
                dispatch({ type: CHANGE_DATA,
                    data: { 
                        isLoading: false,
                        post: data,
                    }
                })
            })
            .catch(e => {
                if(axios.isCancel(e)) return;
                alert(e);
            })
    }

    useEffect(() => {
        axiosPost();
        return () => {
            source.cancel();
        }
    }, []);

    // useEffect(() => {
    //     console.log(post);
    // }, [post]);

    return (
        isLoading
        ? <>로딩중...</>
        :
        <Box width="100vw" maxWidth="50rem" display="flex">
            <Box id="img-space" flex={5} position="relative" minHeight="50vh" maxHeight="80vh">
                { // 실제 화면을 띄우는 위치. animation 객체를 사용
                    transitions.map(({ item, props, key }) => {
                        return <animated.div key={key} props={props} /* style={{ position: "absolute", width: "100%", height: "100%" }}*/>
                            <Box position="absolute" width="100%" height="100%" bgcolor="white"
                                display="flex" alignItems="center" justifyContent="center">
                                { picture[item] 
                                    ? <img src={`/api/timeline/html-img/${picture[item]}`} alt={`등록 이미지 - ${item}`} style={{ minWidth: "50%", maxWidth: "100%", minHeight: "50%", maxHeight: "100%" }} /> 
                                    : <BsPlusSquareFill size="5rem" /> }
                            </Box>
                        </animated.div>;
                    })
                }
                    {/* <img src={IMG} /> */}
                { // 좌측에 추가 이미지가 있을 때만 활성화
                    picture.length && 0 < page &&
                    <IconButton id="img-btn-left" onClick={onClickLeft}
                        style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)" }}>
                        <MdKeyboardArrowLeft />
                    </IconButton>
                }
                { // 우측에 추가 이미지가 있을 때만 활성화
                    page < picture.length &&
                    <IconButton id="img-btn-right" onClick={onClickRight}
                        style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)" }}>
                        <MdKeyboardArrowRight />
                    </IconButton>
                }
            </Box>
            <Box id="text-space" flex={3} borderLeft={1} borderColor="#aaaaaa" display="flex" flexDirection="column">
                <Box>작성자정보</Box>
                <Box>내용내여ㅛㅇ</Box>
            </Box>
        </Box>
    )
}

export default Post;