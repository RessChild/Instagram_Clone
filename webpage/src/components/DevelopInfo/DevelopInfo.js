import { Box } from "@material-ui/core";
import React from "react";

const Developinfo = () => {
    return <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <h3 style={{ marginBottom: "2rem" }}>- Instagram Clone 프로젝트 -</h3>
        <Box width="90%"><h4 style={{ display: "inline" }}>제작자: </h4>최 현수</Box>
        <Box width="90%"><h4 style={{ display: "inline" }}>Email: </h4>wpqldmlrna@naver.com</Box>
        <Box>&nbsp;</Box>
        <Box width="90%"><h4 style={{ display: "inline" }}>사용언어: </h4>React / NestJs / TypeORM</Box>
        <Box>&nbsp;</Box>
        <Box></Box>
    </Box>
}

export default Developinfo;