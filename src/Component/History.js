import { Typography } from "@mui/material";
import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Component/History.css"
import { useLocation } from "react-router-dom";

const History=({history})=>{
    const location = useLocation();
  const historydata= location.state.historydata;
  console.log("historydata",historydata);
    return(
<Box className="Mainchatwindow">
<div>Past Conversations</div>
{historydata.length!==0?historydata.map((data,index)=>(
<Box className="historyConvoBox" sx={{display:"flex",flexDirection:"column",gap:"42px"}}>
    <Box >
        <span>You</span>
       <div>{data.question}</div>
    </Box>
        <Box>
       <span>Soul AI</span>
       <div>{data.answer}</div>
       </Box>
</Box>
)):""};
</Box>
    )
}

export default History;