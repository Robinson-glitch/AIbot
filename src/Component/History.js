import "../Component/History.css"

const History=()=>{

 const historydata =JSON.parse(localStorage.getItem("chathistory")) ||
  [];

  console.log("historudata",historydata);
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