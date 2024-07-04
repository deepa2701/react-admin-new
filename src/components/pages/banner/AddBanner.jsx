import React, { useState } from 'react';
import apiData from '../../../axiosConfig';

function AddBanner() {
    const [formData, setFormData] = useState({
        bannerName: '',
        image: null, // Update to handle file input
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                image: files[0], // Handle file input
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const token = localStorage.getItem('token');
        // console.log("token", token);

        // Create FormData object
        const data = new FormData();
        data.append('bannerName', formData.bannerName);
        data.append('image', formData.image);

        try {
            const response = await apiData.post('/add-banner', data, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                },
            });
            setSuccessMessage('Data successfully submitted!'); 
            setFormData({
                bannerName: '',
                image: null,
            }); // Reset form data
            setErrors({}); // Clear errors
            console.log('response', response);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                // Update errors state with API response errors
                const apiErrors = error.response.data.errors;
                let updatedErrors = {};
                for (let key in apiErrors) {
                    updatedErrors[key] = apiErrors[key]; // Assuming errors are returned as an object
                }
                setErrors(updatedErrors);
                setSuccessMessage(''); // Clear success message
                // console.log("updatedErrors",updatedErrors);
                // console.log("apiErrors",apiErrors);
            } else {
                console.log(error.response.data);
            }
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <>
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper container-xxl p-0">
                    <div className="content-header row">
                        <div className="content-header-left col-md-9 col-12 mb-2">
                            <div className="row breadcrumbs-top">
                                <div className="col-12">
                                    <h2 className="content-header-title float-start mb-0">Add Banner</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <section id="basic-horizontal-layouts">
                            <div className="row">
                                <div className="col-md-8 offset-2 col-12">
                                    <div className="card">
                                        <div className="card-body">
                                        {loading ? (
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                                <div className="spinner-border" role="status">
                                                </div>
                                              </div>
                                            ) : (
                                            <form className="form form-horizontal" onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="mb-1">
                                                            <label className="col-form-label" htmlFor="bannerName">
                                                                Banner Name
                                                                
                                                            </label>
                                                            <div className="input-group input-group-merge">
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    id="bannerName"
                                                                    name="bannerName"
                                                                    value={formData.bannerName}
                                                                    onChange={handleChange}
                                                                />
                                                                
                                                            </div>
                                                            {errors.bannerName && <div className="validation_error_message" style={{ color: 'red' }}>{errors.bannerName}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="mb-1">
                                                            <label className="col-form-label" htmlFor="image">
                                                                Banner Image
                                                                <span className="required-star">*</span>
                                                            </label>
                                                            <div className="input-group input-group-merge">
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    id="image"
                                                                    name="image"
                                                                    onChange={handleChange}
                                                                />
                                                                
                                                            </div>
                                                            {errors.image && <div className="validation_error_message mt-1" style={{ color: 'red' }}>{errors.image}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9 offset-sm-5">
                                                        <button type="submit" className="btn btn-orange me-1">
                                                            Submit
                                                        </button>
                                                    </div>
                                                    {successMessage && <div className="col-12 mt-1"><span style={{ color: 'green' }}>{successMessage}</span></div>}
                                                </div>
                                            </form>
                                            )}
                                        </div>
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

export default AddBanner;
