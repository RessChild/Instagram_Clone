import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import IMG from "../../sources/instagram_logo.png";

const Comment = ({ comment }) => {
    const { writer, content, writedAt } = comment || {};
    const { email } = writer;
    // console.log(comment);
    return <Box display="flex" marginTop="1rem" marginBottom="1rem">
        <Box flex={3} display="flex" justifyContent="center" id="comment-profile">
            <img src={IMG} alt="user-profile"
                style={{ width: "2rem", height: "2rem", borderRadius: "1.2rem", border: "2px red solid" }}/>
        </Box>
        <Box flex={8} id="comment-content" display="flex" width="100%" whiteSpace="wrap" style={{ wordBreak: "break-all" }}>
            <Box display="contents" fontWeight="600" whiteSpace="nowrap">{ email }</Box>
            &nbsp;&nbsp;
            { content }
        </Box>
        {/* <Box fontSize="0.7rem">{ writedAt }</Box> */}
        <IconButton style={{ margin: "0.1rem" }}><AiOutlineHeart size="0.8rem"/></IconButton>
        </Box>
}

export default Comment;