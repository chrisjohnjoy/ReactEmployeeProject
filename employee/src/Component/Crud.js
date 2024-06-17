import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Crud() {
    const [data, setData] = useState([])
    const [update, setUpdate] = useState({})
    const [refresh, setRefresh] = useState(false)
    

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/contacts/')
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log('error')
            })
    }, [refresh])

    //update

    const updateDetails = (id) => {
        console.log('Employee id:', id)
        fetch(`http://127.0.0.1:8000/contacts/${id}/`)
            .then(response => response.json())
            .then(res => setUpdate(res))

    }

    //update change

    const handleInputChange = (event, feild) => {

        const value = event.target.value

        setUpdate((prevUpdate) => ({

            ...prevUpdate,
            [feild]: value,

        }))


    }

    const handleSubmit = async (e, id) => {

        e.preventDefault()

        const requestData = {
            id: update.id,
            name: update.name,
            email: update.email,
            phone: update.phone,
        };

        console.log('updatated data', requestData)


        const response = await axios.put(`http://127.0.0.1:8000/contacts/update/${id}/`, requestData, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log('Updated data:', response.data);
       

        toast.success('Employee Updated successfully', {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
        });
        setRefresh(!refresh)

       
    

};
const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/contacts/${id}/delete/`, {
        method: 'DELETE',
    });
    console.log("Deleted");

    toast.success('Employee Deleted successfully', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
    });

    // Trigger data refresh
    setRefresh(!refresh)
}



return (
    <>
        <div className='container-lg p-5'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">OPERATIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item,index) => (


                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <button className='btn btn-success' onClick={() => { updateDetails(item.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button> &nbsp;
                                    <button className='btn btn-danger' onClick={() => { updateDetails(item.id) }} data-bs-toggle="modal" data-bs-target="#exampleModals">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>




        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Update Modal</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div className='container'>
                            <form onSubmit={(e) => { handleSubmit(e, update.id) }}>
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input type='text' className='form-control' value={update.name} onChange={(event) => handleInputChange(event, 'name')}></input>
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type='text' className='form-control' value={update.email} onChange={(event) => handleInputChange(event, 'email')}></input>
                                </div>
                                <div className='form-group'>
                                    <label>Phone</label>
                                    <input type='text' className='form-control' value={update.phone} onChange={(event) => handleInputChange(event, 'phone')}></input>
                                </div>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Update</button>

                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="exampleModals" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Modal</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Do yoy want to delete <b></b>{update.name}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => { handleDelete(update.id) }}>Delete</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>

    </>
)
}

export default Crud