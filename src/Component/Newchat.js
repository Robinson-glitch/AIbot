import { Typography } from "@mui/material";
import { Button, CircularProgress, Stack, TextField} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Component/Newchat.css"
import { Link } from "react-router-dom";
// import jsondata from "src\\aiData\\sampleData.json"


import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const NewchatUI=()=>{
const navigate= useNavigate();
   
    const [sampleAIdata, setsampleAIdata]=useState([]);
     const[input, setinputvalue]=useState("");
     const[answerkey, setAnswerKey]=useState([]);
     const[history,sethistory]=useState([]);

    useEffect(()=>{
     fetchJsondata();
     const stored=localStorage.getItem("chathistory");
     if(stored!=null){
 sethistory(JSON.parse(stored));
     }
     else{
        localStorage.setItem("chathistory",JSON.stringify([]));
     }
    },[])

  

    const handleAsk=(event)=>{
event.preventDefault();
    setTimeout(() => {
      const result = fetchAnswer(input);
   sethistory(prev=>{const updated=[...prev,...result];
    localStorage.setItem("chathistory",JSON.stringify(updated));
    return updated;
   });
    
    //   setAnswerKey(prev => [...prev, ...result]);
     setinputvalue("");
    }, 300);
    }

const fetchJsondata=async()=>{
    try{
   const response= await axios.get("/sampleData.json");
   setsampleAIdata(response.data);
    }
    catch(Error){
        console.log(Error)
    }
}

const fetchAnswer=(query)=>{
    //  if (!query || !sampleAIdata.length) return [{question: query, answer: "" }];

    const match = sampleAIdata.find((data) =>
      data.question.toLowerCase()===(query.toLowerCase())
    );

    if (match) {
      console.log("match found");
      return [{ question: match.question, answer: match.response }];
    } else {
      return [{ question: query, answer:"Sorry, Did not understand your query!" }];
    }
}

    const getInput=(event)=>{
setinputvalue(event.target.value);
    }

 

  

    const openNewchat=()=>{
        localStorage.removeItem("chathistory");
        sethistory([]);
    }

    return(
<Box className="Mainchatwindow">
<header>
<h1 style={{width:"85px",height:"32px",fontSize:"28px",fontStyle:"Bold",position:"absolute",left:"232px"}}>Bot AI</h1>
</header>
<Box sx={{display:"flex", alignItems:"flex-end",gap:"14px"}}>
<Box className="sidePanel">
<Box className="columnheader">
<Link to="/">
<Button onClick={openNewchat} sx={{width:"208px",height:"47px",backgroundColor: "#D7C7F4",fontFamily:"Ubuntu",fontWeight:"400",fontStyle:"Regular",fontSize:"20px",lineHeight:"100%",color:"#000000"}}className="Newchatheader">
    New Chat
</Button>
</Link>
<Link to="/history"  state={{ historydata: history }} style={{ textDecoration: "none" }}>
<Button className="PastConversations" sx={{backgroundColor:"#D7C7F4",width:"175px",height:"39px",pt:"11px",pb:"16px",borderRadius:"10px",fontFamily:"Ubuntu",fontWeight:"700",fontSize:"16px",letterSpacing:"0%",color:"#414146"}}>
    Past Conversations
</Button> 
</Link>

</Box>
</Box>
<form onSubmit={(e)=>handleAsk(e)}>
<Box sx={{display:"flex",alignItems:"flex-end",flexDirection:"column",gap:"10px"}}>
{history.length>0?history.map((answer,index)=>(
<Box>
<Box SX={{pb:"5px"}} className="Answermessagebox">
<span>Soul AI</span>
<p>{answer.answer}</p>
</Box>
<Box className="Questionmessagebox">
    <span>You</span>
 <p>{answer.question}</p>
</Box>
</Box>)):""}
<Box sx={{display:"flex"}}>
<input onChange={(e)=>getInput(e)} value={input} placeholder="Message Bot AI..." className="inputbox">
</input>
<button type="submit" className="Ask">Ask</button>
<button type="button" className="Save">Save</button>
</Box>
</Box>
</form>
</Box>
</Box>
    );

}

export default NewchatUI;