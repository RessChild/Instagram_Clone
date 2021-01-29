import { Box, IconButton } from "@material-ui/core";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import { IoPersonSharp } from "react-icons/io5";
import IMG from "../../sources/instagram_logo.png";

const PostContent = ({ writer, writedAt, content }) => {
    const { email, profile_image } = writer;

    return <Box display="flex" marginTop="1.2rem" marginBottom="1.2rem">
        <Box width="4rem" display="flex" justifyContent="center" id="comment-profile">
        {
            profile_image
            ? <img src={`/api/account/html-img/${profile_image}`} alt="user-profile"
                style={{ width: "2rem", height: "2rem", borderRadius: "1rem", border: "2px red solid" }}/>
            : <IoPersonSharp size="2rem" color="black" style={{ borderRadius: "2rem", border: "2px red solid" }}/>
        }
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
            </Box>
        </Box>
        </Box>
}

export default PostContent;