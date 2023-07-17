import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
import './custom.css';
import { Link } from 'react-router-dom';
import back1 from '../components/emp1.webp';
export default function Signin()
{
    const signindata=(event)=>{
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers:{"enctype":"multipart/form-data"}};

        axios.post('http://localhost:3000/Signin_data',datastring,config)
        .then(function(response){
            if(response.data.status === 'error'){
                alert('Query Error');
                // window.location.href="./signin";
                window.location.reload();
            } 
            else if(response.data.status === 'Success'){
                let id = response.data.id;
                localStorage.setItem("id",id);
                alert('Logined');
                window.location.href="./dashboard";
            } 
            else if(response.data.status === 'Invalid'){
                alert('Invalid username and password');
                // window.location.href="./signin";
                window.location.reload();
            } 
            else{
                alert('Contact Admin');
                // window.location.href="./signin";
                window.location.reload();
            }
        })
        .catch(function(error){
            alert('Error');
            // window.location.href="./signin";
            window.location.reload();
        })
    }
    return(
        <>
        <div className="container img1 ">
                <div className="row">
                    <div className="col-lg-7  mt-3 align-items-center">

                        <h5 className="fw-bold text-monospace mt-3" >Login into your account</h5>
                        <form onSubmit={signindata}>
                        <div className="mb-4">
                            <label className="">Username</label>
                            <input type="text" id="username" name="username" placeholder="Enter your name" className="form-control col-sm-7" />
                        </div>
                        <div className="mb-4">
                            <label className="">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter a valid password" className="form-control col-sm-7" />
                        </div>
                        <div class="pt-1 mb-4">
                            <button class="btn btn-dark btn-lg col-sm-7" type="submit">Login</button>
                        </div>
                        <a className=" text-muted" href="#!" >Forgot password?</a>
                        <p className="mb-5 pb-lg-2 text-center" >Don't have an account?
                            <Link to="/Signup"> <a href="#!"
                                className="text-primary">Register</a>
                            </Link></p>
                            </form>
                    </div>
                    <div className=" col-lg-5 mb-3">
                        <img src={back1} alt="no image" className="h-100 w-100" />
                    </div>

                </div>
            </div>

        </>
    );
}