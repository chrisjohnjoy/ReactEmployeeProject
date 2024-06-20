// App.js
import React from 'react';
import UsersComponent from './Component/UsersComponent';
import BooksComponent from './Component/BooksComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="my-4">Book Hub</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>User Management</h2>
            <UsersComponent />
          </div>
          <div className="col-md-6">
            <h2>Catalog Management</h2>
            <BooksComponent />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
