import React from "react";
import { Grid } from "@material-ui/core";

// material ui 의 grid container
const GridItem = ({ children, ...others }) => {
    return <Grid item { ...others }>{ children }</Grid>
}

export default GridItem;