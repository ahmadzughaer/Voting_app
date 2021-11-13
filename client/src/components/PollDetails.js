import {navigate} from "@reach/router";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';


const CastVote = props => {
    const [poll, setPoll] = useState([])
    const [updatedPoll, setUpdatedPoll] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/polls/" + props.pollId)
            .then(response => setPoll((response.data)))
            .catch(error => console.log("There was an issue: ", error))
    }, [poll, updatedPoll]);

    const onClickHandler = (e) => {
        e.preventDefault()
        if (e.target.id === "optionOne") {
            console.log("you are here")
            axios.put("http://localhost:8000/api/polls/" + props.pollId, {
                question: poll[0].question,
                "optionOne.answer":poll[0].optionOne.answer,
                "optionOne.votes":++(poll[0].optionOne.votes),
                "optionTwo.answer":poll[0].optionTwo.answer,
                "optionTwo.votes":poll[0].optionTwo.votes,
                "optionThree.answer":poll[0].optionThree.answer,
                "optionThree.votes":poll[0].optionThree.votes,
                "optionFour.answer":poll[0].optionFour.answer,
                "optionFour.votes":poll[0].optionFour.votes,
                totalVotes:++(poll[0].totalVotes)
            })
                .then(response => setUpdatedPoll((response.data)))
                .catch(error => console.log("There was an issue: ", error))
        }

        else if (e.target.id === "optionTwo") {
            axios.put("http://localhost:8000/api/polls/" + props.pollId, {
                question: poll[0].question,
                "optionOne.answer":poll[0].optionOne.answer,
                "optionOne.votes":poll[0].optionOne.votes,
                "optionTwo.answer":poll[0].optionTwo.answer,
                "optionTwo.votes":++(poll[0].optionTwo.votes),
                "optionThree.answer":poll[0].optionThree.answer,
                "optionThree.votes":poll[0].optionThree.votes,
                "optionFour.answer":poll[0].optionFour.answer,
                "optionFour.votes":poll[0].optionFour.votes,
                totalVotes:++(poll[0].totalVotes)
            })
                .then(response => setUpdatedPoll((response.data)))
                .catch(error => console.log("There was an issue: ", error))
        }

        else if (e.target.id === "optionThree") {
            axios.put("http://localhost:8000/api/polls/" + props.pollId, {
                question: poll[0].question,
                "optionOne.answer":poll[0].optionOne.answer,
                "optionOne.votes":poll[0].optionOne.votes,
                "optionTwo.answer":poll[0].optionTwo.answer,
                "optionTwo.votes":poll[0].optionTwo.votes,
                "optionThree.answer":poll[0].optionThree.answer,
                "optionThree.votes":++(poll[0].optionThree.votes),
                "optionFour.answer":poll[0].optionFour.answer,
                "optionFour.votes":poll[0].optionFour.votes,
                totalVotes:++(poll[0].totalVotes)
            })
                .then(response => setUpdatedPoll((response.data)))
                .catch(error => console.log("There was an issue: ", error))
        }

        else if (e.target.id === "optionFour") {
            axios.put("http://localhost:8000/api/polls/" + props.pollId, {
                question: poll[0].question,
                "optionOne.answer":poll[0].optionOne.answer,
                "optionOne.votes":poll[0].optionOne.votes,
                "optionTwo.answer":poll[0].optionTwo.answer,
                "optionTwo.votes":poll[0].optionTwo.votes,
                "optionThree.answer":poll[0].optionThree.answer,
                "optionThree.votes":poll[0].optionThree.votes,
                "optionFour.answer":poll[0].optionFour.answer,
                "optionFour.votes":++(poll[0].optionFour.votes),
                totalVotes:++(poll[0].totalVotes)
            })
                .then(response => setUpdatedPoll((response.data)))
                .catch(error => console.log("There was an issue: ", error))
        }
        navigate("/poll/" + props.pollId)
    }


    return (
        <>
            {
                poll.length > 0 ?
                    <div style={{borderStyle:"solid", margin:"20px"}}>
                                    <Button variant="contained" color="secondary" style={{float:"right", margin: '-50px', marginRight:'10px'}}><a href="/" style={{color:"white", textDecoration: 'none'}}>Back to Home</a></Button>

                        <h1>{poll[0].question}</h1>
                        <center>
                        <div style={{display:"flex", padding:"20px", marginLeft:"740px"}}>
                            <div style={{background: "white", padding:"5px", borderStyle:"solid", margin:"10px", borderRadius:10}}>
                                <h3>{poll[0].optionOne.answer}</h3>
                                <button id={"optionOne"} style={{background: "gold"}} onClick={ (e)=> onClickHandler(e) }>Vote {poll[0].optionOne.answer}</button>
                            </div>
                            <div style={{background: "white", padding:"5px", borderStyle:"solid", margin:"10px", borderRadius:10}}>
                                <h3>{poll[0].optionTwo.answer}</h3>
                                <button id={"optionTwo"} style={{background: "gold"}} onClick={(e)=> onClickHandler(e)}>Vote {poll[0].optionTwo.answer}</button>
                            </div>
                            {
                                poll[0].optionThree.answer !== "" ?
                                    <div style={{background: "white", padding:"5px", borderStyle:"solid", margin:"10px", borderRadius:10}}>
                                        <h3>{poll[0].optionThree.answer}</h3>
                                        <button id={"optionThree"} style={{background: "gold"}} onClick={(e)=> onClickHandler(e) }>Vote {poll[0].optionThree.answer}</button>
                                    </div>
                                    : ""
                            }
                            {
                                poll[0].optionFour.answer !== "" ?
                                    <div style={{background: "white", padding:"5px", borderStyle:"solid", margin:"10px", borderRadius:10}}>
                                        <h3>{poll[0].optionFour.answer}</h3>
                                        <button id={"optionFour"} style={{background: "gold"}} onClick={(e)=> onClickHandler(e) }>Vote {poll[0].optionFour.answer}</button>
                                    </div>
                                    : ""
                            }
                        </div>
                        </center>
                    </div>
                    : ""
            }
        </>
    )
};

export default CastVote;