import React from "react";
import { Box } from "@material-ui/core";
import Logo from "../../sources/instagram_logo.png"

const Loading = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
            <img src={Logo} alt="loading_img" style={{ width:  "10rem", height: "10rem" }} />
        </Box>
    );
}

export default Loading;