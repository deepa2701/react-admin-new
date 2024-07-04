import React, { useState } from 'react';
import apiData from '../../../axiosConfig';

function AddNotification() {
   

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // Changed from '' to false
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);

        try {
            const response = await apiData.post('/notification', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setSuccessMessage('Data successfully submitted!');
            setFormData({ title: '', description: '' });
            setErrors({});
            console.log('response', response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const apiErrors = error.response.data.errors;
                setErrors(apiErrors);
                setSuccessMessage('');
            } else {
                console.log('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-content content">
            <div className="content-wrapper container-xxl p-0">
                <div className="content-body">
                    <section id="basic-horizontal-layouts">
                        <div className="row">
                            <div className="col-md-12 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        {loading ? (
                                            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                                <div className="spinner-border" role="status"></div>
                                            </div>
                                        ) : (
                                            <form className="form form-horizontal" onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-12 mb-1">
                                                        <label className="col-form-label" htmlFor="title">
                                                            Title
                                                            <span className="required-star">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            value={formData.title}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.title && <div className="validation_error_message" style={{ color: 'red' }}>{errors.title}</div>}
                                                    </div>
                                                    <div className="col-12 mb-1">
                                                        <label className="col-form-label" htmlFor="description">
                                                            Description
                                                            <span className="required-star">*</span>
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="description"
                                                            name="description"
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.description && <div className="validation_error_message mt-1" style={{ color: 'red' }}>{errors.description}</div>}
                                                    </div>
                                                    <div className="col-sm-9 offset-sm-6">
                                                        <button type="submit" className="btn btn-orange me-1">
                                                            Submit
                                                        </button>
                                                    </div>
                                                    {successMessage && (
                                                        <div className="col-12 mt-1">
                                                            <span style={{ color: 'green' }}>{successMessage}</span>
                                                        </div>
                                                    )}
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
    );
}

export default AddNotification;
