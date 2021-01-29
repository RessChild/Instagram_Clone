import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Box, Button, IconButton, Input, InputAdornment, Link, TextField } from "@material-ui/core";
import { useTransition, animated } from "react-spring";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleOutline, IoPaperPlaneOutline, IoPersonSharp } from "react-icons/io5";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

import { CHANGE_DATA, PostInit, PostReduce } from "./reducer/PostReducer";
import IMG from "../../sources/instagram_logo.png";
import Comment from "../../components/Comment/Comment";
import PostContent from "../../components/PostContent/PostContent";
import Loading from "../../views/Loading/Loading";

// react-spring 참고 링크
// https://www.react-spring.io/docs/hooks/examples

// 신규 포스트 등록 화면
const Post = ({ pid }) => {

    const source = axios.CancelToken.source();

    const [ state, dispatch ] = useReducer(PostReduce, PostInit);
    const { isLoading, page, post } = state;
    const { picture, content, writer, writedAt, comments } = post;
    // 버튼 사용 가능 여부
    const [ disabled, setDisabled ] = useState({
        newComment: true,
    })
    // 기능 활성화 여부 ( 좋아요, 북태그 )
    const [ actived, setActived ] = useState({
        like: false,
        bookmark: false,
    })
    // 새 덧글
    const [ newComment, setNewComment ] = useState('');

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

    // 상단 버튼
    const onClickProfileMenu = () => {
        alert("버튼버튼")
    }

    // 하단 버튼 ( 좋아요, 북마크 )
    const onClickIcon = ({ currentTarget: { id }}) => {
        console.log(id);
        setActived({ ...actived, [id]: !actived[id] });
    }
    // 게시글 입력
    const onChangeAddCommnet = ({ target: { name, value }}) => {
        setDisabled({ [name]: !value.trim() });
        setNewComment(value);
    }
    
    // 덧글 입력
    const onClickAddComment = () => {
        if(disabled.newComment) return alert("등록 불가능");
        axios.post(`/api/timeline/add-comment/${pid}`, { jwt: localStorage.getItem('access_token'), content: newComment }, { cancelToken: source.token })
            .then( ({ data }) => {
                console.log(data);
                setNewComment(''); // 글 비우기
                axiosPost(); // 리로딩
            })
            .catch( e => {
                if(axios.isCancel(e)) return;
                alert(e);
            })
    }

    return (
        <Box width="100vw" maxWidth="50rem" display="flex">
            {
                isLoading
                ? <Box width="100%" height="60vh" display="flex" alignItems="center" justifyContent="center">
                    <img src={IMG} alt="로딩 이미지" style={{ maxHeight: "40%", maxWidth: "40%" }} />
                    </Box>
                : <>
                    <Box id="img-space" flex={5} position="relative" minHeight="60vh" maxHeight="80vh">
                    { // 실제 화면을 띄우는 위치. animation 객체를 사용
                        transitions.map(({ item, props, key }) => {
                            return <animated.div key={key} props={props} /* style={{ position: "absolute", width: "100%", height: "100%" }}*/>
                                <Box position="absolute" width="100%" height="100%" bgcolor="white"
                                    display="flex" alignItems="center" justifyContent="center">
                                    { picture[item] && <img src={`/api/timeline/html-img/${picture[item]}`} alt={`등록 이미지 - ${item}`} style={{ minWidth: "50%", maxWidth: "100%", minHeight: "50%", maxHeight: "100%" }} /> }
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
                        page < picture.length - 1 &&
                        <IconButton id="img-btn-right" onClick={onClickRight}
                            style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)" }}>
                            <MdKeyboardArrowRight />
                        </IconButton>
                    }
                </Box>
                <Box id="text-space" flex={3} borderLeft={1} display="flex" flexDirection="column" borderColor="#aaaaaa"
                    overflow="auto" maxHeight="60vh" position="relative">
                    <Box borderBottom={1} height="4rem" display="flex" alignItems="center" justifyContent="center"
                        position="absolute" top="0" width="100%">
                        <Box width="4rem" display="flex" justifyContent="center">
                        {
                            writer.profile_image
                            ? <img src={`/api/account/html-img/${writer.profile_image}`} alt="user-profile"
                                style={{ width: "2rem", height: "2rem", borderRadius: "1rem", border: "2px red solid" }}/>
                            : <IoPersonSharp size="2rem" color="black" style={{ borderRadius: "2rem", border: "2px red solid" }}/>
                        }
                        </Box>
                        <Box flex={8} fontWeight="600">
                            { writer.email }
                        </Box>
                        <IconButton onClick={onClickProfileMenu}>
                            <BsThreeDots />
                        </IconButton>
                    </Box>
                    <Box marginTop="4rem" marginBottom="10rem" overflow="auto">
                        <PostContent writer={writer} writedAt={writedAt} content={content}/>
                        { comments.map( comment => <Comment comment={comment} /> ) }
                    </Box>
                    <Box position="absolute" bottom="0" width="100%">
                        <Box height="5.5rem" borderTop={1} padding="0.5rem">
                            <Box display="flex" justifyContent="space-between">
                                <Box display="flex" width="40%" alignItems="center" justifyContent="space-between">
                                    { actived.like 
                                        ? <AiFillHeart id="like" size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} />
                                        : <AiOutlineHeart id="like" size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} />
                                    }
                                    <IoChatbubbleOutline size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} />
                                    <IoPaperPlaneOutline size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }}  />
                                </Box>
                                <Box>
                                    { actived.bookmark 
                                        ? <BsBookmarkFill id="bookmark" size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} /> 
                                        : <BsBookmark id="bookmark" size="2rem" onClick={onClickIcon} style={{ cursor: "pointer" }} />
                                    }
                                </Box>
                            </Box>
                            <Box>정보</Box>
                            <Box fontSize="0.7rem" color="grey">날짜</Box>
                        </Box>
                        <Box height="3.5rem" borderTop={1} display-="flex" flexDirection="column">
                            <Input style={{ width: "100%", height: "100%", padding: "0 4%" }}
                                name="newComment" value={newComment} onChange={onChangeAddCommnet}
                                disableUnderline={true} placeholder="댓글 달기..."
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Button disabled={disabled.newComment} onClick={onClickAddComment}
                                        style={{ color: disabled.newComment ? "#99ccff" : "blue", fontWeight: "600" }}>게시</Button>
                                    </InputAdornment>
                                } />
                        </Box>
                    </Box>
                </Box>
                </>
            }
        </Box>
    )
}

export default Post;