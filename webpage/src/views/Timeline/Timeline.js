import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Box, Dialog } from "@material-ui/core";
import Logo from "../../sources/instagram_title.png";

import { IoPersonSharp, IoLogoInstagram } from "react-icons/io5";
import { CgPen, CgTag } from "react-icons/cg";
import { MdAddAPhoto } from "react-icons/md";

import GridContainer from "../../components/GridContainer/GridContainer";
import GridItem from "../../components/GridItem/GridItem";
import { CHANGE_DATA, TimelineInit, TimelineReduce } from "./reducer/TimelineReducer";

import Loading from "../Loading/Loading";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";

const maxWidth = "50rem";
const borderColor = "grey.500"

const Timeline = ({ history, location, match }) => {
    const source = axios.CancelToken.source();

    const { email } = match.params; // 주소로 넘어오는 정보 ( /:email )
    const [ state, dispatch ] = useReducer(TimelineReduce, TimelineInit);
    const { login, username, posts, isLoading } = state;

    const axiosTimeline = () => {
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.post(`/api/timeline/profile/${email}`, { jwt: localStorage.getItem('access_token') }, { cancelToken: source.token })
            .then( ({ data: { login, timeline } }) => {
                if( !timeline ) return console.log(`can't find user`);

                console.log(login, timeline);
                // 데이터 세팅
                dispatch({ type: CHANGE_DATA,
                    data: {
                        isLoading: false,
                        login: login || '',
                        ...timeline,
                    }
                })
            })
            .catch( e => { if( !axios.isCancel(e) ) console.log(e); });
    }

    useEffect(() => {
        axiosTimeline();
        return () => {
            source.cancel();
        }
    }, [])

    // 다이얼로그 창
    const [ dialog, setDialog ] = useState('');
    const onCloseDialog = () => setDialog(''); // 창 닫기
    const onCloseDialogWithReload = () => {
        axiosTimeline(); // 리스트 갱신
        setDialog(''); // 창 닫기
    }

    // 포스트 상세보기
    const onClickPost = ({ currentTarget: { id }}) => {
        setDialog(id);
    }

    // 새 포스트 등록 기능
    const onClickWritePost = ({ currentTarget: { id }}) => {
        setDialog(id);
    };

    return (
        isLoading
        ? <Loading /> 
        :
        <Box bgcolor="#f7f7f7" height="100vh" overflow="auto">
        <Box id="timeline-header" bgcolor="#ffffff"
            position="fixed" top="0" height="4rem" width="100vw" 
            borderBottom={1} borderColor={borderColor}>
            <Box display="flex" width="100vw" maxWidth={maxWidth} margin="auto" height="4rem"
                alignItems="center" justifyContent="space-between">
                <Box id="timeline-header-logo">
                    <img title="instagram-logo" src={Logo} style={{ height: "8rem", width: "auto" }} />
                </Box>
                <Box id="timeline-header-user">{ login }</Box>
            </Box>
        </Box>
        <Box id="timeline-profile" marginTop="4rem">
            <Box width="100vw" maxWidth={maxWidth} margin="auto" borderBottom={1} borderColor={borderColor} 
                display="flex" padding="2rem">
                <Box id="timeline-profile-img" flex={1} display="flex" justifyContent="center">
                    <Box border={3} borderColor="#ffa4a4" bgcolor="white"
                        width="10rem" height="10rem" borderRadius="5rem" overflow="hidden" 
                        display="flex" justifyContent="center" alignItems="center">
                        <IoPersonSharp size="6rem" color="black"/>
                    </Box>
                </Box>
                <Box id="timeline-profile-info" flex={2} >
                    <Box id="timeline-profile-email" marginBottom="1rem"
                        fontSize="1.7rem" fontWeight="fontWeightLight">
                        { email }
                    </Box>
                    <Box id="timeline-profile-count" marginBottom="1rem"
                        display="flex" alignItems="space-between">
                        <Box flex={1}>게시글 <Box display="inline" fontWeight="fontWeightBold">3300</Box></Box>
                        <Box flex={1}>팔로워 <Box display="inline" fontWeight="fontWeightBold">3300</Box></Box>
                        <Box flex={1}>팔로우 <Box display="inline" fontWeight="fontWeightBold">3300</Box></Box>
                    </Box>
                    <Box id="timeline-profile-introduce" fontSize="1rem">
                        <Box fontWeight="fontWeightBold">
                            { username }
                        </Box>
                        <Box>
                            자기소개
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box id="timeline-content">
            <Box width="100vw" maxWidth={maxWidth} margin="auto">
                <Box id="timeline-content-tab" marginBottom="10px"
                    display="flex" justifyContent="center" alignItems="center"
                    fontSize="0.9rem" fontWeight="700">
                    <Box width="100px" height="3rem" textAlign="center" lineHeight="3rem">
                        <CgPen size="0.9rem"/>&nbsp;&nbsp;게시물
                    </Box>
                    <Box width="100px" height="3rem" textAlign="center" lineHeight="3rem">
                        <CgTag size="0.9rem"/>&nbsp;&nbsp;태그됨
                    </Box>
                </Box>
                <GridContainer spacing={4} justify="flex-start">
                    { login === email &&
                        <GridItem xs={4} key={'post-create'}>
                            <Box overflow="hidden" border={1} borderColor="#565656" 
                                id="post-create" style={{ cursor: "pointer" }} onClick={onClickWritePost}
                                width="30vw" maxWidth="15rem" height="30vw" maxHeight="15rem" margin="auto"
                                display="flex" alignItems="center" justifyContent="center">
                                <MdAddAPhoto size="5rem" />
                            </Box>
                        </GridItem>
                    }
                    {
                        posts.map(({ pid, picture }, idx) => {
                            return (
                                <GridItem xs={4} key={`post-${idx}`}>
                                    <Box overflow="hidden" border={1} borderColor="#565656"
                                        width="30vw" maxWidth="15rem" height="30vw" maxHeight="15rem" margin="auto"
                                        display="flex" alignItems="center" justifyContent="center" 
                                        onClick={onClickPost} id={pid}>
                                        {/* <IoLogoInstagram size="5rem" /> */}
                                        <img src={`/api/timeline/html-img/${picture[0]}`} style={{ maxWidth: "100%", maxHeight: "100%"}} alt={`게시글 대표 이미지-${idx}`} />
                                    </Box>
                                </GridItem>
                            )
                        })
                    }
                </GridContainer>
            </Box>
        </Box>
        <Dialog maxWidth="md" open={!!dialog && dialog !== "post-create"} onClose={onCloseDialog}>
            <Post pid={dialog} onClose={onCloseDialog} />
        </Dialog>
        <Dialog maxWidth="md" open={dialog === "post-create"} onClose={onCloseDialog}>
            <NewPost email={email} onClose={onCloseDialogWithReload} />
        </Dialog>
        </Box>
    );
}

export default Timeline;