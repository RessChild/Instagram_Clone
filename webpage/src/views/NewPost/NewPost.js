import React, { useState } from "react";
import axios from "axios";
import { Box, IconButton } from "@material-ui/core";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import IMG from "../../sources/instagram_logo.png";

// 신규 포스트 등록 화면
const NewPost = () => {

    const [ page, setPage ] = useState(0); // 현재 페이지 번호

    return (
        <Box width="100vw" maxWidth="50rem" display="flex">
            <Box id="img-space" flex={3} position="relative" maxHeight="70vh">
                <IconButton style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)" }}><MdKeyboardArrowLeft /></IconButton>
                    <img src={IMG} />
                <IconButton style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)" }}><MdKeyboardArrowRight /></IconButton>
            </Box>
            <Box id="text-space" flex={1}>
                ㅇㅅㅇ 내용내용
            </Box>
        </Box>
    )
}

export default NewPost;