import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)

        try {
            const respose = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (respose.ok) {
                toast.success("Login successful " + formData.username, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored',
                })
            } else {
                toast.error("Invalid ", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored',
                })
            }

        } catch (error) {

        }
    }

    return (
        <>
            <h2 className='text-center'>Login Here</h2>
            <div className='container shadow' style={{ width: '30%', marginBottom: 50 }}>
                <form onSubmit={handleSubmit}>

                    <div className='form-group p-3'>
                        <label>Username</label>
                        <input type='text' name='username' className='form-control' onChange={handleInput}></input>
                    </div>
                    <div className='form-group p-3'>
                        <label>Password</label>
                        <input type='password' name='password' className='form-control' onChange={handleInput}></input>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type='submit' className='btn btn-primary' style={{ marginBottom: 20 }} >Submit</button>
                    </div>
                    
                </form>
                <p style={{ paddingBottom: 20, paddingLeft: 100, }}><b>Don't have an account</b><Link to={"/register"}>Register Here</Link></p>

            </div>
        </>
    )
}

export default Login