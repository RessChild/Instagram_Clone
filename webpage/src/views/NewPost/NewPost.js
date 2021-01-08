import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, IconButton } from "@material-ui/core";
import { useTransition, animated } from "react-spring";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsPlusSquareFill } from "react-icons/bs";

import IMG from "../../sources/instagram_logo.png";

// react-spring 참고 링크
// https://www.react-spring.io/docs/hooks/examples

// 신규 포스트 등록 화면
const NewPost = () => {

    const source = axios.CancelToken.source();

    const [ page, setPage ] = useState(0); // 현재 페이지 번호
    const [ localImgs, setLocalImgs ] = useState([]); // 로컬 파일 정보
    const [ images, setImages ] = useState([]); // 이미지 리스트

    // 좌,우 버튼 클릭 함수
    const onClickLeft = () => setPage(state => state - 1, []);
    const onClickRight = () => setPage(state => state + 1, []);

    // 애니메이션 옵션
    // 사용할 인덱스, ??, 애니메이션 스타일
    const transitions = useTransition(page, p => p, { 
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' }, // 좌측
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' }, // 중앙
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }, // 우측
    });

    useEffect(() => {
        return () => {
            source.cancel();
        }
    }, [])

    // 로컬 파일 등록
    const onChangeAddImg = ({ currentTarget: { files: { length, ...fileList } }}) => {
        let arr = [];
        for(const idx in fileList){
            // console.log(fileList[idx]);
            arr.push( fileList[idx] );
        }
        setLocalImgs(state => state.concat(arr), []);
        setImages(state => state.concat(arr.map( file => URL.createObjectURL(file)) ), []);
    }

    // 게시글 등록 버튼
    const onClickSubmit = () => {
        if(!images.length) return alert("최소 1개 이상의 사진 등록이 필요합니다.");

        // console.log(localImgs);
        const formData = new FormData();        
        for(const img of localImgs) {
            // console.log(idx);
            formData.append("localImgs", img);
        }
        formData.append("text", "test-text");

        axios.put("/api/timeline/write-post", formData, { cancelToken: source.token })
            .then(({ data }) => {
                console.log(data);
            })
            .catch( e => {
                if(!axios.isCancel(e)) return alert(e);
                console.log(e);
            });
    }

    // / minHeight="50vh" maxHeight="80vh"
    return (
        <Box width="100vw" maxWidth="50rem" height="auto" display="flex">
            <Box id="img-space" flex={5} position="relative" minHeight="50vh" maxHeight="80vh">
                { // 실제 화면을 띄우는 위치. animation 객체를 사용
                    transitions.map(({ item, props, key }) => {
                        return <animated.div key={key} props={props} /* style={{ position: "absolute", width: "100%", height: "100%" }}*/>
                            <Box position="absolute" width="100%" height="100%" bgcolor="white" overflow="hidden"
                                display="flex" alignItems="center" justifyContent="center">
                                { images[item] 
                                    ? <img src={images[item]} alt={`등록 이미지-${item}`} 
                                        style={{ display: "block", minWidth:"50%", minHeight: "50%", maxHeight: "100%", objectFit: "cover" }} /> 
                                    : <>
                                        <label htmlFor="img-space-add" style={{ cursor: "pointer" }}><BsPlusSquareFill size="5rem" /></label>
                                        <input onChange={onChangeAddImg} type="file" multiple accept=".jpg, .png, .jpeg" id="img-space-add" style={{ display: "none" }} />
                                    </>
                                }
                            </Box>
                        </animated.div>;
                    })
                }
                    {/* <img src={IMG} /> */}
                { // 좌측에 추가 이미지가 있을 때만 활성화
                    images.length && 0 < page &&
                    <IconButton id="img-btn-left" onClick={onClickLeft}
                        style={{ position: "absolute", left: "5px", top: "50%", transform: "translateY(-50%)", background: "#aaaaaa", color: "#ffffff", opacity: "0.5" }}>
                        <MdKeyboardArrowLeft color="inherit" />
                    </IconButton>
                }
                { // 우측에 추가 이미지가 있을 때만 활성화
                    page < images.length &&
                    <IconButton id="img-btn-right" onClick={onClickRight}
                        style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", background: "#aaaaaa", color: "#ffffff", opacity: "0.5" }}>
                        <MdKeyboardArrowRight color="inherit"/>
                    </IconButton>
                }
            </Box>
            <Box id="text-space" flex={3} borderLeft={1} borderColor="#aaaaaa" display="flex" flexDirection="column">
                <Box>작성자정보</Box>
                <Box>내용내여ㅛㅇ</Box>
                <Button id="btn-submit" onClick={onClickSubmit}>게시글 등록</Button>
            </Box>
        </Box>
    )
}

export default NewPost;