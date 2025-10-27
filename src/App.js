import './App.css';
import Newchat from "./Component/Newchat"
import History from "./Component/History"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
   return (
    <Router>
      <Routes>
        <Route path="/" element={<Newchat />} />
        <Route path="/history" element={<History/>}/>
      </Routes>
    </Router>
  );
}

export default App;