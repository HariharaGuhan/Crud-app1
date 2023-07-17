import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import log from './logout.png'
import './custom.css'
export default function Dashboard() {

    const [getdata, setGetdata] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/Getsignup_data/')
            .then(responsive => responsive.json())
            .then(json => setGetdata(json))
    })

    const delete1 = (id) => {
        var key = { id }
        var value = { Headers: { "enctype": "mutipart/form_data" } }

        axios.post("http://localhost:3000/Delete", key, value)
            .then(function (response) {
                if (response.data.status === "error") {
                    alert("error");

                }
                else if (response.data.status === "delete") {
                    alert("deleted");
                }
                else {
                    alert("contact admin")
                }
            })
    }

    return (
        <>
            <div className="table-responsive mt-3">
                <table className="table table-bordered">
                    <thead>
                        <tr className='text-center text-primary'>
                            <th>id</th>
                            <th>userame</th>


                            <th>Email</th>

                            <th>password</th>
                            <Link to="/Signup"><button type="submit" className="btn btn"><img src={log} className="col-lg-3 log" /></button></Link>
                        </tr>
                    </thead>
                    <tbody className='text-center text-dark'>
                        {
                            getdata.map((v, i) => (
                                <tr>
                                    <td>{v.id}</td>
                                    <td>{v.username}</td>
                                    <td>{v.email}</td>
                                    <td>{v.password}</td>

                                    <td>
                                        <Link to={"/update/" + v.id}><button type='submit' value='submit' className='btn btn-primary'>edit</button></Link>
                                        <button type="button" name="data_del" id="data_del" className="btn btn-danger" onClick={() => { delete1(v.id) }}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}