import React from 'react'
import { useState, useEffect } from 'react';
import apiData from '../../../axiosConfig';
import DataTable from 'react-data-table-component';

function NotificationList() {
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true); // Set initial loading state to true

    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the token directly as a string

        apiData.get("/get-notification", {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
        .then(response => {
            // console.log(response.data); // Log the entire response to understand its structure
            setNotification(response.data.notifications);
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
            name: "Title",
            selector: row => row.title,
        },
        {
            name: "Description",
            selector: row => row.description,
        },
        {
            name: "Action",
            cell: row => (
                <>
                <a onClick={() => handleDelete(row.id)}><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a>
                    {/* <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>Delete</button> */}
                </>
            )
        }
    ];

    

    const handleDelete = (id) => {
        const token = localStorage.getItem('token'); // Retrieve the token directly as a string

        apiData.get(`/delete-notification?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
        .then(response => {
            console.log("Deleted notification with ID:", id);
            // Remove the deleted banner from the state
            setBanners(notification.filter(notification => notification.id !== id));
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    };

    const handleChange = (e) => {
        const newData = notification.filter(row =>
            row.title.toLowerCase().includes(e.target.value.toLowerCase())
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
                                        <h4 className="card-title">Notification List</h4>
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
                                            data={notification}
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
    );

}

export default NotificationList