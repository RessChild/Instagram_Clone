import { Box } from "@material-ui/core";
import React from "react"
import GridContainer from "../GridContainer/GridContainer";
import GridItem from "../GridItem/GridItem";

// 화면 구성용 카드
const TimeCard = ({ }) => {
    return (
        <Box width="35rem" margin="1.7rem" padding="1rem" bgcolor="#888888" borderRadius="1rem">
            <Box id="card-header" display="flex" alignItems="center" justifyContent="flex-start">
                <Box flex="2">
                    <Box width="4rem" height="4rem" bgcolor="#ffffff">사진</Box>
                </Box>
                <Box flex="8">
                    <Box>작성자</Box>
                    <Box>작성일자</Box>
                </Box>
            </Box>
            <Box id="card-content" display="flex">
                <Box flex="2" />
                <Box flex="9">작성 내용</Box>
            </Box>
        </Box>
    )
}

export default TimeCard;