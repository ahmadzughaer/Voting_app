import img from '../JFToE.jpg';
import background from '../bkg.jpg';

import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "@reach/router";
import Button from '@material-ui/core/Button';
import style from '../index.css';


const Home = () => {
    const [polls, setPolls] = useState([])
    const [topThree, setTopThree] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/getAllPolls")
            .then(response => setPolls((response.data)))
            .catch(error => console.log("There was an issue: ", error))

        axios.get("http://localhost:8000/api/topThree")
            .then(response => setTopThree((response.data)))
            .catch(error => console.log("There was an issue: ", error))
    }, [])



    return (
        <>
        <center>
        <Button variant="contained" color="secondary" style={{margin:30}}> <Link to="/polls/new" style={{color:"white", textDecoration: 'none'}}> Creat your own Poll</Link></Button>
         </center>
            {
                polls.length > 0 ?
                    <div style={{display:"flex", justifyContent:"space-around", backgroundImage:`url(${background})`, backgroundRepeat: 'repeat'}}>
                        <div style={{background:"black", borderStyle:"solid", width:"40%", borderRadius: '20px'}}> 
                           <h1 style={{color:'white'}}>Top 3 Polls</h1>
                            {
                                topThree.map((poll, index) => {
                                    return(
                                        <div style={{background:"white", margin:"10px", borderRadius: '50px'}} key={index}>
                                            <img src={img}  width={"100px"}/>
                                                <h3><Link class='link' to={"/polls/" + poll._id} style={{}}>{poll.question}</Link></h3>
                                            <div style={{display:"inline-flex"}}>
                                            <p style={{padding:10, fontWeight:'bold'}}>{poll.optionOne.answer}: {poll.optionOne.votes}</p>
                                            <p style={{padding:10, fontWeight:'bold'}}>{poll.optionTwo.answer}: {poll.optionTwo.votes}</p>
                                            {
                                                poll.optionThree.answer !== undefined ?
                                                    <p style={{padding:10, fontWeight:'bold'}}>{poll.optionThree.answer}: {poll.optionThree.votes}</p>
                                                    : ""
                                            }
                                            {
                                                poll.optionFour.answer !== undefined ?
                                                    <p style={{padding:10, fontWeight:'bold'}}>{poll.optionFour.answer}: {poll.optionFour.votes}</p>
                                                    : ""
                                            }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div style={{background:"brown", borderStyle:"solid", width:"40%", borderRadius: '20px'}}>
                            <h1 style={{color: 'white'}}>Recent Polls</h1>
                            {
                                polls.map((poll, index) => {
                                    return(
                                        <div style={{background:"white", margin:"10px", borderRadius: '50px'}} key={index}>
                                            <img src={img}  width={"100px"}/>
                                            <h3><Link  class='link' to={"/polls/" + poll._id}>{poll.question}</Link></h3>
                                            
                                            <div style={{display:"inline-flex"}}>
                                            <p style={{padding:10, fontWeight:'bold'}}>{poll.optionOne.answer}: {poll.optionOne.votes}</p>
                                            <p style={{padding:10, fontWeight:'bold'}}>{poll.optionTwo.answer}: {poll.optionTwo.votes}</p>
                                            
                                            {
                                                poll.optionThree.answer !== "" ?
                                                    <p style={{padding:10, fontWeight:'bold'}}>{poll.optionThree.answer}: {poll.optionThree.votes}</p>
                                                    : ""
                                            }
                                            {
                                                poll.optionFour.answer !== "" ?
                                                    <p style={{padding:10, fontWeight:'bold'}}>{poll.optionFour.answer}: {poll.optionFour.votes}</p>
                                                    : ""
                                            }
                                            </div>
                                           
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                : <></>
            }
        </>
    )
};

export default Home;