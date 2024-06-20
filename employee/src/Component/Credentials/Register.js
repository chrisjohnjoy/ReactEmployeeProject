import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';


function Register() {
    const [formData, setFormData] = useState({})
       const navigate= useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Enter value is ", formData)

        

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/register/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 201) {
                toast.success("Admin Inserted Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
                setFormData({
                    admin_name: '',
                    email: '',
                    username: '',
                    password: '',
                    con_password: ''
                });
            }
            

            navigate('/')

        } catch (error) {
            console.error('Error occurred:', error);
            toast.error("Admin Not Inserted Successfully", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
    };

    return (
        <>
            <h2 className='text-center'>Admin Registration</h2>

            <div className='container shadow' style={{ width: '30%', marginBottom: 50 }}>
                <form onSubmit={handleSubmit}>
                    <div className='form-group p-3'>
                        <label>Admin Name</label>
                        <input
                            type='text'
                            name='admin_name'
                            className='form-control'
                            value={formData.admin_name}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className='form-group p-3'>
                        <label>Admin Email</label>
                        <input
                            type='email'
                            name='email'
                            className='form-control'
                            value={formData.email}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className='form-group p-3'>
                        <label>Username</label>
                        <input
                            type='text'
                            name='username'
                            className='form-control'
                            value={formData.username}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className='form-group p-3'>
                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            className='form-control'
                            value={formData.password}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className='form-group p-3'>
                        <label>Confirm Password</label>
                        <input
                            type='password'
                            name='con_password'
                            className='form-control'
                            value={formData.con_password}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type='submit' className='btn btn-primary' style={{ marginBottom: 20 }} >Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register