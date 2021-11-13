import { useState } from "react"
import axios from "axios"
import { navigate } from "@reach/router"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import background from '../JFToE.jpg';





const AddPoll = () => {
    const [question, setQuestion] = useState("")
    const [optionOne, setOptionOne] = useState("")
    const [optionTwo, setOptionTwo] = useState("")
    const [optionThree, setOptionThree] = useState("")
    const [optionFour, setOptionFour] = useState("")
    const [errors, setErrors] = useState([])
    const [questionError, setQuestionError] = useState(" ")
    const [optionOneError, setOptionOneError] = useState(" ")
    const [optionTwoError, setOptionTwoError] = useState(" ")

    const onSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/createPoll", {
            question,
            "optionOne.answer": optionOne,
            "optionTwo.answer": optionTwo,
            "optionThree.answer": optionThree,
            "optionFour.answer": optionFour
        })
            .then(() => navigate("/"))
            .catch(err =>{
                const errorResponse = err.response.data.errors; 
                const errorArr = []; 
                for (const key of Object.keys(errorResponse)) { 
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }
    const inputHandler = e => {
        if (e.target.id === "question") {
            if (e.target.value.length < 1)
                setQuestionError("Question is Required");
            else {
                setQuestionError("");
                setQuestion(e.target.value);
            }
        }

        else if (e.target.id === "optionOne") {
            if (e.target.value.length == 1)
                setOptionOneError("Option One is Required");
            else {
                setOptionOneError("");
                setOptionOne(e.target.value);
            }
        }

        else if (e.target.id === "optionTwo") {
            if (e.target.value.length == 1)
                setOptionTwoError("Option One is Required");
            else {
                setOptionTwoError("");
                setOptionTwo(e.target.value);
            }
        }
    }

    return(
        <div className="container">
            
            <Button variant="contained" color="secondary" style={{float:"right", margin: '-10px', marginRight:'12px'}}><a href="/" style={{color:"white", textDecoration: 'none'}}>Back to Home</a></Button>
            <br></br>
            <div className="row">
                <div className="col-12">
                    <p style={{color:"red"}}>{questionError}</p>
                    <p style={{color:"red"}}>{optionOneError}</p>
                    <p style={{color:"red"}}>{optionTwoError}</p>
                    <ul>{ errors.map((err, index) => <small key={index} style={{color:"red"}}><li>{err}</li></small>) }</ul>
                </div>
            </div>
            <div className="row" style={{justifyContent: "center", backgroundImage: `url(${background})`, backgroundRepeat: "repeat"}}>
                <div className="col-6">
                    <form onSubmit={ onSubmit } style={{display:"flex", justifyContent:"space-around", margin:"10px", borderStyle:"solid", padding:"10px"}}>
                        <div className="form-group">
                            <TextField
                                    id={"question"}  onChange={ inputHandler }
                                    label="Your Question*"
                                    multiline
                                    rows={15}
                                    variant="outlined"
                                    style = {{width:500}}/>
                        </div>
                        <div>
                            <div className="form-group" style={{margin:10}}>
                                <TextField id={"optionOne"} onChange={ inputHandler } label="Option 1*" variant="filled" />
                            </div>
                            <div className="form-group" style={{margin:10}}>
                                <TextField id={"optionTwo"} onChange={ inputHandler } label="Option 2*" variant="filled" />

                            </div>
                            <div className="form-group" style={{margin:10}}> 
                                <TextField onChange={(e)=>setOptionThree(e.target.value)} label="Option 3" variant="filled" />

                            </div>
                            <div className="form-group" style={{margin:10}}>
                                <TextField onChange={(e)=>setOptionFour(e.target.value)} label="Option 4" variant="filled" />

                                
                            </div>
                            <div className="form-group text-right">
                           
                                <button className="btn btn-primary btn-sm" style={{fontSize:18 ,blockSize:40, backgroundColor:"#0CABC6", color:"white", borderRadius:5}} data-toggle="button" >Submit Poll</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPoll;
