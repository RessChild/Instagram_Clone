import React from "react";
import { Grid } from "@material-ui/core";

// material ui 의 grid container
const GridContainer = ({ children, ...others }) => {
    return <Grid container { ...others }>{ children }</Grid>
}

export default GridContainer;