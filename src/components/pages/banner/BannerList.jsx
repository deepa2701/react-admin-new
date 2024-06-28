import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import apiData from '../../../axiosConfig';
import { Link } from 'react-router-dom';

function BannerList() {
    const [banners, setBanners] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the token directly as a string

        apiData.get("/get-banner", {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
        .then(response => {
            console.log(response.data); // Log the entire response to understand its structure
            setBanners(response.data.banners);
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
        {
            name: "Image",
            selector: row => row.banner_image,
            cell: row => (
                <img src={row.banner_image} alt="Profile" style={{height:'60px',width:'60px',borderRadius:'10px',padding:'4px'}}/>
            )
        },
        {
            name: "Action",
            cell: row => (
                <>
                    <Link to="/edit-user" className="btn btn-primary me-2" onClick={() => handleEdit(row.id)}>Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>Delete</button>
                </>
            )
        }
    ];

    const handleEdit = (id) => {
        console.log("Edit user with ID:", id);
        // Implement edit functionality here
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token'); // Retrieve the token directly as a string

        apiData.get(`/delete-banner?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
        .then(response => {
            console.log("Deleted banner with ID:", id);
            // Remove the deleted banner from the state
            setBanners(banners.filter(banner => banner.id !== id));
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    };

    const handleChange = (e) => {
        const newData = banners.filter(row =>
            row.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setBanners(newData);
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
                                    {banners !== null && (
                                        <DataTable
                                            columns={columns}
                                            data={banners}
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

export default BannerList;
