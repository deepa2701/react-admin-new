import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import apiData from '../../../axiosConfig';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token directly as a string

    apiData.get("/get-user", {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then(response => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error!", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "70px"
    },
    {
      name: "Image",
      selector: row => row.profileImagePath,
      cell: row => (
        <>
          <img src={row.profileImagePath} alt="Profile" style={{ height: '60px', width: '60px', borderRadius: '10px', padding: '4px' }} />
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
          <Link to={`/edit-user/${row._id}`} onClick={() => handleEdit(row._id)} className="me-2">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </Link>
          <a className="mx-2" onClick={() => handleDelete(row._id)}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </a>
        </>
      )
    }
  ];

  const handleChange = (e) => {
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
          <div className="content-header row"></div>
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
                    {loading ? (
                      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                        <div className="spinner-border" role="status"></div>
                      </div>
                    ) : (
                      <DataTable
                        columns={columns}
                        data={users}
                        fixedHeader
                        pagination
                        // selectableRows
                        noHeader
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
