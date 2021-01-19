import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Box } from "@material-ui/core";

import { AiFillHeart } from "react-icons/ai";
import Logo from "../../sources/instagram_title.png";

import Loading from "../Loading/Loading";
import TimeCard from "../../components/TimeCard/TimeCard";
import { CHANGE_DATA, homeInit, homeReduce } from "./Reducer/HomeReducer";


// 메인 페이지 (홈)
const Home = () => {

    const source = axios.CancelToken.source();
    const [ state, dispatch ] = useReducer(homeReduce, homeInit);
    const { isLoading, user } = state;
    const { email, posts } = user;

    // 로그인 상태 체크
    const axiosUser = () => {
        // console.log("로그인 시도");
        if( !localStorage.getItem('access_token') ) return;
        // console.log("jwt 토큰 있음,", localStorage.getItem('access_token'));
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.post('/api/home/', { jwt: localStorage.getItem('access_token') }, { cancelToken: source.token })
            .then( ({ data }) => {
                console.log(data);
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

    useEffect(() => {
        axiosUser();
        return () => {
            source.cancel();
        }
    }, []);

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
                        <Box id="timeline-header-logo">
                            <img title="instagram-logo" src={Logo} style={{ height: "8rem", width: "auto" }} />
                        </Box>
                        <Box id="timeline-header-user">{ email }</Box>
                    </Box>
                </Box>
                <Box id="timeline-profile" marginTop="6rem">
                    <Box width="100vw" maxWidth="50rem" margin="auto" display="flex">
                        <Box flex={2}>
                            {
                                posts.map( post => <TimeCard post={post} /> )
                            }
                        </Box>
                        <Box flex={1}>개인 프로필정보</Box>
                    </Box>
                </Box>
            </Box>
            :
            <Box width="100vw" height="100vh" bgcolor="#f7f7f7"
                display="flex" alignItems="center" justifyContent="center">
                    <Box width="100vw" maxWidth="50rem" display="flex" justifyContent="space-between">
                        <Box width="50%">
                            클로닝 정보 페이지정도..?
                        </Box>
                        <Box width="40%" 
                            bgcolor="#ffffff" borderColor="#999999" border={1}>
                            <Box display="flex" alignItems="center" justifyContent="center"
                                height="5rem" overflow="hidden" >
                                <img src={Logo} style={{ maxWidth: "60%" }} />
                            </Box>
                            <Box>
                                로그인, 비밀번호 칸
                            </Box>
                        </Box>
                    </Box>
            </Box>
        }
        </>
    )
}

export default Home;