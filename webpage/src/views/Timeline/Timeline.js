import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Box } from "@material-ui/core";
import Logo from "../../sources/instagram_logo.png";

import { IoPersonSharp, IoLogoInstagram } from "react-icons/io5";
import { CgPen, CgTag } from "react-icons/cg";

import GridContainer from "../../components/GridContainer/GridContainer";
import GridItem from "../../components/GridItem/GridItem";
import { TimelineInit, TimelineReduce } from "./reducer/TimelineReducer";

const maxWidth = "50rem";
const borderColor = "grey.500"

const Timeline = ({ history, location, match }) => {
    const source = axios.CancelToken.source();

    const { email } = match.params; // 주소로 넘어오는 정보 ( /:email )

    const [ state, dispatch ] = useReducer(TimelineReduce, TimelineInit);
    const { posts, isLoading } = state;

    useEffect(() => {
        axios.get(`/api/timeline/profile/${email}`, { cancelToken: source.token })
            .then( ({ data }) => { 
                console.log(data);
            })
            .catch( e => { if( !axios.isCancel(e) ) console.log(e); });

        return () => {
            source.cancel();
        }
    }, [])

    return (
        isLoading
        ? <div>로딩중...</div> 
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
                <Box id="timeline-header-user">
                    사용자이름
                </Box>
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
                        user_email
                    </Box>
                    <Box id="timeline-profile-count" marginBottom="1rem"
                        display="flex" alignItems="space-between">
                        <Box flex={1}>게시글 <Box display="inline" fontWeight="fontWeightBold">3300</Box></Box>
                        <Box flex={1}>팔로워 <Box display="inline" fontWeight="fontWeightBold">3300</Box></Box>
                        <Box flex={1}>팔로우 <Box display="inline" fontWeight="fontWeightBold">3300</Box></Box>
                    </Box>
                    <Box id="timeline-profile-introduce" fontSize="1rem">
                        <Box fontWeight="fontWeightBold">
                            nickname
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
                    {
                        posts.map((post) => {
                            return (
                                <GridItem xs={4}>
                                    <Box overflow="hidden" border={1} borderColor="#565656"
                                        width="30vw" maxWidth="15rem" height="30vw" maxHeight="15rem" margin="auto"
                                        display="flex" alignItems="center" justifyContent="center">
                                        <IoLogoInstagram size="5rem" />
                                    </Box>
                                </GridItem>
                            )
                        })
                    }
                </GridContainer>
            </Box>
        </Box>
        </Box>
    );
}

export default Timeline;