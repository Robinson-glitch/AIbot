import { Typography } from "@mui/material";
import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Component/History.css"
import { useLocation } from "react-router-dom";

const History=()=>{
    const location = useLocation();
 const historydata =
  location.state?.historydata ||
  JSON.parse(localStorage.getItem("chathistory")) ||
  [];
    return(
<div className="Mainchatwindow">
<div>Past Conversations</div>
{historydata.length!==0?historydata.map((data,index)=>(
<div key={index}>   
       <div>{data.question}</div>
       <div>{data.answer}</div>
</div>
)):""}
</div>
    )
}

export default History;