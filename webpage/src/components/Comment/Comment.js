import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import IMG from "../../sources/instagram_logo.png";

const Comment = ({ comment }) => {
    console.log(comment);
    const { writer, content, writedAt } = comment || {};
    const { email } = writer;
    // console.log(comment);
    return <Box display="flex" marginTop="1.2rem" marginBottom="1.2rem">
        <Box flex={3} display="flex" justifyContent="center" id="comment-profile">
            <img src={IMG} alt="user-profile"
                style={{ width: "2rem", height: "2rem", borderRadius: "1rem", border: "2px red solid" }}/>
        </Box>
        <Box id="comment-content" flex={8} width="100%" overflow="hidden">
            <Box display="flex" width="100%" whiteSpace="wrap" style={{ wordBreak: "break-all" }}>
                <Box display="contents" fontWeight="600" whiteSpace="nowrap">{ email }</Box>
                &nbsp;&nbsp;
                { content }
            </Box>

            <Box display="flex" justifyContent="space-between"
                marginTop="0.5rem" fontSize="0.7rem" color="#999999">
                <Box>
                    { writedAt.slice(0,10) }
                </Box>
                <Box>좋아요</Box>
                <Box>답글</Box>
            </Box>
        </Box>
        <IconButton style={{ margin: "0.1rem" }}><AiOutlineHeart size="0.8rem"/></IconButton>
        </Box>
}

export default Comment;