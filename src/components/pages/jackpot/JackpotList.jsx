import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import apiData from '../../../axiosConfig';
import { Link } from 'react-router-dom';

function JackpotList() {
    const [jackpot, setJackpot] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the token directly as a string

        apiData.get("/jackpots", {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
        .then(response => {
            console.log(response.data); // Log the entire response to understand its structure
            setJackpot(response.data.jackpots);
            setLoading(false);
        })
        .catch(error => {
            console.error("There was an error!", error);
            setLoading(false);
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
            selector: row => row.name,
        },
        {
            name: "Image",
            selector: row => row.jackpot_image,
            cell: row => (
                <img src={row.jackpot_image} alt="Profile" style={{height:'60px',width:'60px',borderRadius:'10px',padding:'4px'}}/>
            )
        },
        {
            name: "Description",
            selector: row => row.description,
        },
        {
            name: "Starting Date",
            selector: row => row.starting_date,
        },
        {
            name: "Prize Pool",
            selector: row => row.prize_pool,
        },
        {
            name: "Join Count",
            selector: row => row.join_count,
        },
        {
            name: "Winning Amount",
            selector: row => row.wining_amount,
        },
        {
            name: "Delete",
            cell: row => (
              <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>Delete</button>
            )
        }
    ];

    const handleDelete = (id) => {
        const token = localStorage.getItem('token'); // Retrieve the token directly as a string

        apiData.get(`/delete-jackpot?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
        .then(response => {
            console.log("Deleted jackpot with ID:", id);
            // Remove the deleted jackpot from the state
            setJackpot(jackpot.filter(jackpot => jackpot.id !== id));
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    };

    const handleChange = (e) => {
        const newData = jackpot.filter(row =>
            row.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setJackpot(newData);
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
                                            <div className="spinner-border" role="status">
                                                {/* <span className="sr-only">Loading...</span> */}
                                            </div>
                                        </div>
                                    ) : (
                                        <DataTable
                                            columns={columns}
                                            data={jackpot}
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

export default JackpotList;
