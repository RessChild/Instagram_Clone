import React from "react";
import axios from "axios";
import { Box } from "@material-ui/core";
import Logo from "../../sources/instagram_logo.png";

const maxWidth = "65rem";
const borderColor="#000000"

const Timeline = () => {
    return (
        <Box bgcolor="#f7f7f7">
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
                <Box id="timeline-profile-img" flex={1}>
                    프로필 이미지
                </Box>
                <Box id="timeline-profile-info" flex={2}>
                    프로필 정보 ( 닉네임, 게시글, 팔로워 ,팔로우 , 한줄소개)
                </Box>
            </Box>
        </Box>
        <Box id="timeline-content">
            <Box width="100vw" maxWidth={maxWidth} margin="auto">
                게시글 리스트
            </Box>
        </Box>
        </Box>
    );
}

export default Timeline;