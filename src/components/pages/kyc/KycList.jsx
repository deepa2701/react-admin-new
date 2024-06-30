import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import apiData from '../../../axiosConfig';
import Switch from 'react-switch';

function KycList() {
  const [kyc, setKyc] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [toggleStatus, setToggleStatus] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token directly as a string

    apiData.get("/kyc-details", {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then(response => {
        console.log(response.data); // Log the entire response to understand its structure
        setKyc(response.data.kyc_details);

        // Initialize toggle status state
        const initialToggleStatus = {};
        response.data.kyc_details.forEach(item => {
          initialToggleStatus[item.id] = item.status === 'active';
        });
        setToggleStatus(initialToggleStatus);
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error("There was an error!", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const columns = [
    {
      name: "#", // Column header for serial number
      selector: (row, index) => index + 1, // Use index + 1 to start numbering from 1
      sortable: true,
      width: "70px" // Adjust width as needed
    },
    {
      name: "Name",
      selector: row => row.name
    },
    {
      name: "Pan Number",
      selector: row => row.pan_no
    },
    {
      name: "Pan Image",
      selector: row => row.pan_img,
      cell: row => (
        <img src={row.pan_img} alt="Profile" style={{ height: '60px', width: '60px', borderRadius: '10px', padding: '4px' }} />
      )
    },
    {
      name: "Aadhar Number",
      selector: row => row.aadhar_no
    },
    {
      name: "Aadhar Image",
      selector: row => row.aadhar_img,
      cell: row => (
        <img src={row.aadhar_img} alt="Profile" style={{ height: '60px', width: '60px', borderRadius: '10px', padding: '4px' }} />
      )
    },
    {
      name: "Status",
      cell: row => (
        <Switch
          onChange={() => handleToggle(row.id)}
          checked={toggleStatus[row.id]}
          offColor="#888"
          onColor="#0f0"
          uncheckedIcon={false}
          checkedIcon={false}
        />
      )
    },
    {
      name: "Action",
      cell: row => (
        <>
          <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>Delete</button>
        </>
      )
    }
  ];

  const handleToggle = (id) => {
    const newStatus = !toggleStatus[id];
    setToggleStatus(prevState => ({
      ...prevState,
      [id]: newStatus
    }));

    // Update the status on the server
    const token = localStorage.getItem('token'); // Retrieve the token directly as a string

    apiData.post(`/change-kyc-status?id=${id}`, {
      id,
      status: newStatus ? 'active' : 'inactive'
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then(response => {
        console.log("Updated status for KYC with ID:", id);
      })
      .catch(error => {
        console.error("There was an error updating the status!", error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token directly as a string

    apiData.get(`/delete-kyc?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then(response => {
        console.log("Deleted KYC with ID:", id);
        // Remove the deleted kyc from the state
        setKyc(kyc.filter(kyc => kyc.id !== id));
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  };

  const handleChange = (e) => {
    const newData = kyc.filter(row =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setKyc(newData);
  };

  return (
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
                    <h4 className="card-title">KYC List</h4>
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
                      <div className="spinner-border" role="status">
                      </div>
                    </div>
                  ) : (
                    <DataTable
                      columns={columns}
                      data={kyc}
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
  );
}

export default KycList;
