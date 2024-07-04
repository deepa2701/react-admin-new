import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import apiData from '../../../axiosConfig';
import { Link } from 'react-router-dom';

function BannerList() {
    const [banners, setBanners] = useState(null);
    const [loading, setLoading] = useState(true); // Set initial loading state to true

    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the token directly as a string

        apiData.get("/get-banner", {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
        .then(response => {
            // console.log(response.data); // Log the entire response to understand its structure
            setBanners(response.data.banners);
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
                
                    <Link to="/edit-user" onClick={() => handleEdit(row.id)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </Link>
                    <a  onClick={() => handleDelete(row.id)} className='mx-3'>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </a>
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
                                        <h4 className="card-title">Banner List</h4>
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
                                            data={banners}
                                            fixedHeader
                                            pagination
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
