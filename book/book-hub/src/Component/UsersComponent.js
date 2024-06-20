// UsersComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsersComponent() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'patron' });
    const [updateUser, setUpdateUser] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users/')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, [refresh]);

    const handleInputChange = (event, field, isUpdate = false) => {
        const value = event.target.value;
        if (isUpdate) {
            setUpdateUser((prevUpdate) => ({
                ...prevUpdate,
                [field]: value,
            }));
        } else {
            setNewUser((prevNewUser) => ({
                ...prevNewUser,
                [field]: value,
            }));
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/users/', newUser, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success('User added successfully', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
            setNewUser({ name: '', email: '', role: 'patron' });
            setRefresh(!refresh);
        } catch (error) {
            toast.error('Error adding user', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
        }
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/users/${id}/`, updateUser, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success('User updated successfully', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
            setRefresh(!refresh);
        } catch (error) {
            toast.error('Error updating user', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/users/${id}/`, { method: 'DELETE' });
            toast.success('User deleted successfully', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
            setRefresh(!refresh);
        } catch (error) {
            toast.error('Error deleting user', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-lg p-5 shadow mb-5">
            <h2>Add New User</h2>
            <form onSubmit={handleAddUser}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={newUser.name} onChange={(e) => handleInputChange(e, 'name')}></input>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={newUser.email} onChange={(e) => handleInputChange(e, 'email')}></input>
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select className="form-control" value={newUser.role} onChange={(e) => handleInputChange(e, 'role')}>
                        <option value="patron">Patron</option>
                        <option value="librarian">Librarian</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add User</button>
            </form>

            <h2 className="mt-5">Users List</h2>
            <div className="row mt-3">
                <input type="text" placeholder="Search Here" className="form-control" style={{ width: 200 }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => setUpdateUser(user)} data-bs-toggle="modal" data-bs-target="#updateUserModal">Update</button> &nbsp;
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="updateUserModal" tabIndex="-1" aria-labelledby="updateUserModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateUserModalLabel">Update User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => handleSubmit(e, updateUser.id)}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={updateUser.name} onChange={(event) => handleInputChange(event, 'name', true)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={updateUser.email} onChange={(event) => handleInputChange(event, 'email', true)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <select className="form-control" value={updateUser.role} onChange={(event) => handleInputChange(event, 'role', true)}>
                                        <option value="patron">Patron</option>
                                        <option value="librarian">Librarian</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3" data-bs-dismiss="modal">Update</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersComponent;
