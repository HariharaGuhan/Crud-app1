import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from'axios';
import './custom.css';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import upd from './upd.webp'
export default function Update(){


    const {id}=useParams();
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    useEffect(()=>{
        fetch('http://localhost:3000/Update_data/'+id)
        .then(response=>response.json())
        .then(function(res){
            setUsername(res[0].username);
            
            setEmail(res[0].email);
            setPassword(res[0].password);
            

        })
        .catch(function (error) {
            alert(error);
            window.location.href = "/";
        })
    },[])



    const handleupdate= async (event)=>{
        event.preventDefault();
        var datastring =new FormData(event.target);
        var config={Headers:{'enctype':'multipart/form-data'}}

        await axios.put('http://localhost:3000/Update_data/'+id+'',datastring,config)
        .then(function(response)
        {
            if(response.data.status==='error')
            {
                alert('query error');
                window.location.href = "/";
            }
            else if(response.data.status==='success')
            {
                alert('successfully regiestered');
                window.location.href ="/dashboard";
            }
            else{
                alert('conact admin');
                window.location.href = "/";
            }
        })

        .catch(function(error)
        {
            if(error)
            {
                alert('Error');
                window.location.href = "/";
            }
        })

    }
    return(
        <>
         <div className="bg1">
                <div className="container img">
                    <div className="row">
                        <div className="col-lg-5">
                            <img src={upd} alt="no image" className="h-50 w-100 img1" />
                        </div>
                        <div className="col-lg-7">

                            <h5 className="fw-bold text-monospace mt-3" >Update your account</h5>
                            <form  onSubmit={handleupdate}>
                            <div className="mb-4">
                                <label className="">Username</label>
                                <input type="text" id="username" name="username" placeholder="Enter your name" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control col-sm-7" />
                            </div>
                            <div className="mb-4">
                                <label className="">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter a valid email" value={email} onChange={(e)=>setEmail(e.target.value)}className="form-control col-sm-7" />
                            </div>
                            <div className="mb-4">
                                <label className="">Password</label>
                                <input type="password" id="password" name="password" placeholder="Enter a valid password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control col-sm-7" />
                            </div>
                            <div class="pt-1 mb-4">
                                <button class="btn btn-dark btn-lg col-sm-7" type="submit">Update</button>
                            </div>
                            {/* <a className=" text-muted" href="#!" >Remember password?</a>
                            <p className="mb-5 pb-lg-2 text-center" >Already have an account?
                                <a href=""
                                    className="text-primary">Login</a>
                                
                            </p> */}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}