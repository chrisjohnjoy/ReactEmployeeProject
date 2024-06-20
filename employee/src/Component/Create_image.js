import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Create_image() {
    const [formData, setFormData] = useState({})

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        })
    }
    const handlePicture = (e)=>{
        const file = e.target.files[0]

        const formDataImage = new FormData()
        formDataImage.append("name",formData.name)
        formDataImage.append("email",formData.email)
        formDataImage.append("phone",formData.phone)
        formDataImage.append("image",file)
        
        setFormData(formDataImage)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Enter value is ", formData)

        try {

            const response = await axios.post(`http://127.0.0.1:8000/contacts/`, formData,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }

            )

            if (response.status == 201) {
                toast.success("Employee Inserted Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                })
                setFormData({ name: '', email: '', phone: '' });
            }

        } catch (error) {
            console.log('errorOcccured')
        }

    }
    
    return (
        <>
            <div className='container shadow' style={{ width: '30%', marginBottom: 50 }}>
                <form onSubmit={handleSubmit}>
                    <div className='form-group p-3'>
                        <label>Employee Name</label>
                        <input type='text' name='name' className='form-control' onChange={handleInput}></input>
                    </div>
                    <div className='form-group p-3'>
                        <label>Employee Email</label>
                        <input type='text' name='email' className='form-control' onChange={handleInput}></input>
                    </div>
                    <div className='form-group p-3'>
                        <label>Employee Phone</label>
                        <input type='text' name='phone' className='form-control' onChange={handleInput}></input>
                    </div>
                    <div className='form-group p-3'>
                        <label>Employee Picture</label>
                        <input type='file' name='image' accept='image/*' className='form-control' onChange={handlePicture}></input>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type='submit' className='btn btn-primary' style={{ marginBottom: 20 }} >Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Create_image