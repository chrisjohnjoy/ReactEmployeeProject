// BooksComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BooksComponent() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '' });
    const [updateBook, setUpdateBook] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/books/')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, [refresh]);

    const handleInputChange = (event, field, isUpdate = false) => {
        const value = event.target.value;
        if (isUpdate) {
            setUpdateBook((prevUpdate) => ({
                ...prevUpdate,
                [field]: value,
            }));
        } else {
            setNewBook((prevNewBook) => ({
                ...prevNewBook,
                [field]: value,
            }));
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/books/', newBook, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success('Book added successfully', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
            setNewBook({ title: '', author: '', isbn: '' });
            setRefresh(!refresh);
        } catch (error) {
            toast.error('Error adding book', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
        }
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/books/${id}/`, updateBook, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success('Book updated successfully', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
            setRefresh(!refresh);
        } catch (error) {
            toast.error('Error updating book', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/books/${id}/`, { method: 'DELETE' });
            toast.success('Book deleted successfully', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
            setRefresh(!refresh);
        } catch (error) {
            toast.error('Error deleting book', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored',
            });
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-lg p-5 shadow mb-5">
            <h2>Add New Book</h2>
            <form onSubmit={handleAddBook}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={newBook.title} onChange={(e) => handleInputChange(e, 'title')}></input>
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" value={newBook.author} onChange={(e) => handleInputChange(e, 'author')}></input>
                </div>
                <div className="form-group">
                    <label>ISBN</label>
                    <input type="text" className="form-control" value={newBook.isbn} onChange={(e) => handleInputChange(e, 'isbn')}></input>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add Book</button>
            </form>

            <h2 className="mt-5">Books List</h2>
            <div className="row mt-3">
                <input type="text" placeholder="Search Here" className="form-control" style={{ width: 200 }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book, index) => (
                        <tr key={book.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => setUpdateBook(book)} data-bs-toggle="modal" data-bs-target="#updateBookModal">Update</button> &nbsp;
                                <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="updateBookModal" tabIndex="-1" aria-labelledby="updateBookModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateBookModalLabel">Update Book</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => handleSubmit(e, updateBook.id)}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" value={updateBook.title} onChange={(event) => handleInputChange(event, 'title', true)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Author</label>
                                    <input type="text" className="form-control" value={updateBook.author} onChange={(event) => handleInputChange(event, 'author', true)}></input>
                                </div>
                                <div className="form-group">
                                    <label>ISBN</label>
                                    <input type="text" className="form-control" value={updateBook.isbn} onChange={(event) => handleInputChange(event, 'isbn', true)}></input>
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

export default BooksComponent;
