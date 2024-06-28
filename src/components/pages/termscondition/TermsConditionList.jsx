import React, { useState, useEffect } from 'react';
import apiData from '../../../axiosConfig';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

function TermsConditionList() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token directly as a string

    apiData.get("/about-us", {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    })
    .then(response => {
      // Clean the text field from HTML tags before setting the state
      const cleanedData = response.data.about_us.map(item => ({
        ...item,
        text: removeTags(item.text)
      }));
      setAboutData(cleanedData);
    })
    .catch(error => {
      console.error("There was an error!", error);
    });
  }, []);

  const removeTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const columns = [
    {
      name: "#", // Column header for serial number
      selector: (row, index) => index + 1, // Use index + 1 to start numbering from 1
      sortable: true,
      width: "70px" // Adjust width as needed
    },
    {
      name: "Content",
      selector: row => row.text,
      width: "60%" // Adjust width as needed
    },
    {
      name: "Edit",
      cell: row => (
        <Link to="/edit-user" className="btn btn-primary me-2" onClick={() => handleEdit(row.id)}>Edit</Link>
      ),
      width: "5%" // Adjust width as needed
    },
    {
      name: "Delete",
      cell: row => (
        <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>Delete</button>
      ),
      width: "5%" // Adjust width as needed
    }
  ];

  const handleChange = (e) => {
    const newData = aboutData.filter(row =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAboutData(newData);
  };

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
                    {aboutData !== null && (
                      <DataTable
                        columns={columns}
                        data={aboutData}
                        fixedHeader
                        pagination
                        selectableRows
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

export default TermsConditionList;
