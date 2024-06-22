import React from 'react'
import { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import apiData from '../../../axiosConfig';
import { Link } from 'react-router-dom';


function UserList() {

// const [users, setUsers] = useState(null);

const [users, setUsers] = useState(null);
useEffect(() => {


        const token = localStorage.getItem('token'); // Retrieve the token directly as a string
        console.log("token1212", token)

        apiData.get("/get-user", {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }

        })


        .then(response => {
            console.log(response.data); // Log the entire response to understand its structure
            setUsers(response.data.users);
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
}, []);


  const columns = [
    {
      name: "#", // Column header for serial number
      selector: (row, index) => index + 1, // Use index + 1 to start numbering from 1
      sortable: true,
      width: "70px" // Adjust width as needed
    },
    // {
    //   name: "ID",
    //   selector: row => row._id,
    //   cell: row => (
    //     <>
    //       <Link to={`/userdetails/${row.id}`} className="me-2" onClick={() => handleEdit(row.id)}>
    //         {row._id}
    //       </Link>
    //     </>
    //   )
    // },
    {
      name: "Image",
      selector: row => row.profileImagePath,
      cell: row => (
        <>
           <img src={row.profileImagePath} alt="Profile" style={{height:'60px',width:'60px',borderRadius:'10px',padding:'4px'}}/>
        </>
      )
    },
    {
      name: "Name",
      selector: row => row.name,
      cell: row => (
            <>
              <Link to={`/userdetails/${row.name}`} className="me-2">
                {row.name}
              </Link>
            </>
          )
    },
    {
      name: "Contact Number",
      selector: row => row.number
    },
	
	
    {
        name: "Action",
        cell: row => (
          <>
            <Link to="/edit-user" className="btn btn-primary  me-2" onClick={() => handleEdit(row.id)}>Edit</Link>
          </>
        )
      },
      {
        name: "Action",
        cell: row => (
          <>
            <button className="btn btn-danger " onClick={() => handleDelete(row.id)}>Delete</button>
          </>
        )
      }
  ];


 
  const handleChange = (e) => {
    // console.log("dddddddddddd")
    const newData = filterrecords.filter(row =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRecords(newData);
  }


  
  const handleEdit = (id) => {
   
    console.log("Edit user with ID:", id);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
    // Implement delete functionality here
  };

  return (
    
    <>
    
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row">
          </div>
          <div className="content-body">
            <section id="responsive-datatable">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header border-bottom">
                      <h4 className="card-title">Jackpot List</h4>
                    </div>
                    <div className='row d-flex justify-content-end'>
                      <div className='col-md-3'>
                        <input
                          type="search"
                          className="form-control mt-1 float-end border ps-3 me-1"
                          placeholder="Search"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {users !== null && ( // Conditionally render DataTable if users is not null
                    <DataTable
                      columns={columns}
                      data={users}
                      fixedHeader
                      pagination
                      selectableRows
                      noHeader
                    />
                  )}


                    {/* <DataTable
                      columns={columns}
                      data={users}
                      fixedHeader
                      title="React-Data-Table-Component Tutorial"
                      pagination
                      selectableRows

                      
                    /> */}


                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserList