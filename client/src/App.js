import './App.css';
import {Router} from "@reach/router";
import Header from "./components/Header";
import CreatPoll from "./components/CreatPoll";
import AllPolls from "./components/AllPolls";
import ShowPoll from "./components/ShowPoll";
import PollDetails from "./components/PollDetails";

function App() {
  return (
    <div className="App">
        <Header/>
        <Router>
            <AllPolls path={"/"}/>
            <CreatPoll path={"polls/new"}/>
            <PollDetails path={"polls/:pollId"}/>
            <ShowPoll path={"poll/:pollId"}/>
        </Router>
    </div>
  );
}

export default App;
