import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
import './custom.css';
import { Link } from 'react-router-dom';
import back from '../components/tec.jpg';
export default function Signup()
{   
    const handledata=(event)=>{
        event.preventDefault();
        var datastring =new FormData(event.target);
        var config={Headers:{'enctype':'multipart/form-data'}}

        axios.post('http://localhost:3000/Signup_data',datastring,config)
        .then(function(response)
        {
            if(response.data.status==='error')
            {
                alert('query error');
                window.location.reload();
            }
            else if(response.data.status==='success')
            {
                alert('successfully regiestered');
                window.location.href="./signin";
            }
            else{
                alert('conact admin');
                window.location.reload();
            }
        })

        .catch(function(error)
        {
            if(error)
            {
                alert('Error');
                window.location.reload();
            }
        })
    }
    return(
        <>
        <div className="bg">
                <div className="container img">
                    <div className="row">
                        <div className="col-lg-5">
                            <img src={back} alt="no image" className="h-50 w-100 img1" />
                        </div>
                        <div className="col-lg-7">

                            <h5 className="fw-bold text-monospace mt-3" >Begin into your account</h5>
                            <form onSubmit={handledata}>
                            <div className="mb-4">
                                <label className="">Username</label>
                                <input type="text" id="username" name="username" placeholder="Enter your name" className="form-control col-sm-7" />
                            </div>
                            <div className="mb-4">
                                <label className="">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter a valid email" className="form-control col-sm-7" />
                            </div>
                            <div className="mb-4">
                                <label className="">Password</label>
                                <input type="password" id="password" name="password" placeholder="Enter a valid password" className="form-control col-sm-7" />
                            </div>
                            <div class="pt-1 mb-4">
                                <button class="btn btn-dark btn-lg col-sm-7" type="submit">Signup</button>
                            </div>
                            <a className=" text-muted" href="#!" >Remember password?</a>
                            <p className="mb-5 pb-lg-2 text-center" >Already have an account?
                                <a href="signin"
                                    className="text-primary">Login</a>
                                
                            </p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}