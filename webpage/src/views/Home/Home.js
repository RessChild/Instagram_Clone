import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Box, Button, CircularProgress } from "@material-ui/core";

import { AiFillHeart } from "react-icons/ai";
import Logo from "../../sources/instagram_title.png";

import Loading from "../Loading/Loading";
import TimeCard from "../../components/TimeCard/TimeCard";
import DevelopInfo from "../../components/DevelopInfo/DevelopInfo";
import { CHANGE_DATA, CHANGE_DATA_STRUCT, homeInit, homeReduce } from "./Reducer/HomeReducer";

import IMG from "../../sources/instagram_logo.png";
import { Link } from "react-router-dom";

// 메인 페이지 (홈)
const Home = ({ history }) => {

    const source = axios.CancelToken.source();
    const [ state, dispatch ] = useReducer(homeReduce, homeInit);
    const { isLoading, identify, error, user } = state;
    const { email, posts } = user;

    // 로그인 상태 체크
    const axiosUser = () => {
        console.log(localStorage.getItem('access_token'), email);
        if( !localStorage.getItem('access_token') ) return;
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.post('/api/home/', { jwt: localStorage.getItem('access_token') }, { cancelToken: source.token })
            .then( ({ data }) => {
                console.log(data);
                if( !data ) localStorage.removeItem('access_token');
                dispatch({ type: CHANGE_DATA, data: { 
                    user: data,
                    isLoading: false 
                }});
            })
            .catch( e => {
                if(axios.isCancel(e)) return;
                alert(e);
                dispatch({ type: CHANGE_DATA, data: { isLoading: false }});
            })
    }

    // 로그아웃 버튼
    const onClickLogOut = () => {
        localStorage.removeItem('access_token'); // 저장정보 삭제
        history.go(0);
    }

    // 로그인 요청
    const onClickSubmit = () => {
        dispatch({ type: CHANGE_DATA_STRUCT, target: "identify", data: { isLoading: true }});
        axios.post('/api/identify/login', identify, { cancelToken: source.token })
            .then( ({ data }) => {
                console.log(data);

                // 로그인 실패
                if( !data ) {
                    return dispatch({ type: CHANGE_DATA, data: {
                        error: 401,
                        identify: { ...identify, isLoading: false },
                    }})
                }
                // 로컬저장소에 정보 저장 ( 실제론 jwt 정보가 저장되어야 함 )
                localStorage.setItem('access_token', identify.email);
                // history.go(0);
                dispatch({ type: CHANGE_DATA_STRUCT, target: "identify", data: { email: '', password: '', isLoading: false }});
                axiosUser();
                // return history.push(`/timeline/${email}`);
            })
            .catch( e => {
                if( axios.isCancel(e) ) return; // 취소인 경우 무시
                if( e.config && e.config.url ) { // 네트워크 오류 검사
                    dispatch({ type: CHANGE_DATA, data: {
                        error: 500,
                        identify: { ...identify, isLoading: false },
                    }})
                }
                else {
                    dispatch({ type: CHANGE_DATA, data: {
                        error: e.response && e.response.status,
                        identify: { ...identify, isLoading: false },
                    }})
                }
            })
    }

    // 입력값
    const onChangeInput = ({ currentTarget: { id, value }}) => {
        const [ target, name ] = id.split('-');
        dispatch({ type: CHANGE_DATA_STRUCT, target: target, data: { [name]: value }});
    }

    // 에러 타입 확인
    const errorType = () => {
        switch (error) {
            case 401:
                return "잘못된 비밀번호입니다. 다시 확인하세요.";        
            case 500:
                return "Instagram에 연결할 수 없습니다. 인터넷에 연결되어 있는지 확인한 후 다시 시도해보세요.";
            default:
                return "알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.";
                // throw new Error("cant find error type");
        }
    }

    useEffect(() => {
        axiosUser();
        return () => {
            source.cancel();
        }
    }, []);

    // 로고 클릭
    const onClickLogo = () => history.push('/');

    return (
        isLoading
        ? <Loading />
        : 
        <>
        {
            email
            ? 
            <Box bgcolor="#f7f7f7" height="100vh" overflow="auto">
                <Box id="timeline-header" bgcolor="#ffffff" zIndex="10"
                    position="fixed" top="0" height="4rem" width="100vw" 
                    borderBottom={1} borderColor="#999999">
                    <Box display="flex" width="100vw" maxWidth="50rem" margin="auto" height="4rem"
                        alignItems="center" justifyContent="space-between">
                        <Box id="timeline-header-logo" display="flex" alignItems="center" onClick={onClickLogo} style={{ cursor: "pointer" }}>
                            <img title="instagram-logo" src={Logo} style={{ height: "8rem", width: "auto" }} />
                        </Box>
                        <Box id="timeline-header-user">
                            <Link to={`/timeline/${email}`} style={{ color: "black", textDecoration: "none", marginRight: "1rem" }}>{ email }</Link>
                            <Button size="small" variant="outlined" color="secondary" onClick={onClickLogOut}>로그아웃</Button>
                        </Box>
                    </Box>
                </Box>
                <Box id="timeline-profile" marginTop="6rem">
                    <Box width="100vw" maxWidth="50rem" margin="auto" display="flex">
                        <Box flex={2}>
                            {
                                posts.length > 0 
                                ? posts.map( (post, idx) => <TimeCard key={`post-${idx}`} post={post} /> )
                                : <Box width="100%" bgcolor="white" borderColor="#aaaaaa" border={1} height="10rem">새로 작성된 게시글 없음</Box>
                            }
                        </Box>
                        {/* <Box flex={1}></Box> */}
                        <Box flex={1} //position="fixed" right={window.innerWidth < 800 ? 0 : (window.innerWidth - 800)/2} 
                            padding="1.8rem" display="flex" flexDirection="column">
                            { /* 여기 고정위치로 수정할것 */ }
                            <Box id="my-profile" display="flex" alignItems="center">
                                <Box marginRight="1rem" display="flex" alignItems="center">
                                    <img src={IMG} alt="my-profile-image"
                                        style={{ width: "3rem", height: "3rem", borderRadius: "1.5rem", border: "1px #999999 solid" }}/>
                                </Box>
                                <Box flex={1}>
                                    <Box fontWeight="600">{ email }</Box>
                                    <Box fontSize="0.8rem" color="#777777">사용자 이름 넣을 공간</Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            :
            <Box width="100vw" height="100vh" bgcolor="#f7f7f7"
                display="flex" alignItems="center" justifyContent="center">
                    <Box width="100vw" maxWidth="50rem" display="flex" justifyContent="space-between">
                        <Box width="50%" display="flex" alignItems="center">
                            <DevelopInfo />
                        </Box>
                        <Box width="35%" padding="2rem"
                            bgcolor="#ffffff" borderColor="#999999" border={1}>
                            <Box display="flex" alignItems="center" justifyContent="center" marginBottom="1rem"
                                height="5rem" overflow="hidden" >
                                <img src={Logo} style={{ maxWidth: "70%" }} />
                            </Box>
                            <Box width="100%">
                                <input placeholder="전화번호, 사용자 이름 또는 이메일" value={identify.email} id="identify-email" onChange={onChangeInput}
                                    style={{ width: "98%", height: "2.1rem", background: "#eeeeee", borderColor: "#aaaaaa", borderRadius: "3px", marginBottom: "0.5rem" }}/>
                                <input placeholder="비밀번호" type="password" value={identify.password} id="identify-password" onChange={onChangeInput}
                                    style={{ width: "98%", height: "2.1rem", background: "#eeeeee", borderColor: "#aaaaaa", borderRadius: "3px", marginBottom: "1rem" }}/>
                                <Button onClick={onClickSubmit} fullWidth variant="contained" color="primary" style={{ height: "2.2rem" }}>
                                    { !isLoading ? "로그인" : <CircularProgress size="1.3rem" color="inherit" /> }
                                </Button>
                            </Box>
                            <Box width="100%" marginTop="1rem" textAlign="center" whiteSpace="wrap" color="red">{ error && errorType() }</Box>
                            <Box marginTop="3rem" fontSize="0.8rem" textAlign="center">계정이 없으신가요? <Link to="/register" style={{ textDecoration: "none", color: "blue", fontWeight: "600" }}>회원가입</Link></Box>
                        </Box>
                    </Box>
            </Box>
        }
        </>
    )
}

export default Home;