import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiData from '../../../axiosConfig';
import { useParams } from 'react-router-dom';

function EditUser() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    contact_number: '',
  });
  const [previewImage, setPreviewImage] = useState(null); // To store the preview image URL
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiData.get(`/user-details?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.data && response.data.user) {
          setFormData({
            ...response.data.user,
            contact_number: response.data.user.number, // Assuming the API returns 'number'
          });
          setPreviewImage(response.data.user.profileImagePath); // Assuming the image path is in 'profileImagePath'
        
        } else {
          console.log('User details not found');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
      // Update the preview image URL to the new selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await apiData.post('update-user', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Data successfully updated!');
      console.log('response', response);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors;
        let updatedErrors = {};
        for (let key in apiErrors) {
          updatedErrors[key] = apiErrors[key];
        }
        setErrors(updatedErrors);
      } else {
        console.log(error);
      }
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
                  <h2 className="content-header-title float-start mb-0">Edit User</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <section id="basic-horizontal-layouts">
              <div className="row">
                <div className="col-md-12 col-12">
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    <form className="form form-horizontal" onSubmit={handleSubmit}>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-6">
                              <div className="mb-1">
                                <label className="col-form-label" htmlFor="name">
                                  Name<span className="required-star">*</span>
                                </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    className="form-control"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                  />
                                </div>
                                {errors.name && (
                                  <div className="validation_error_message" style={{ color: 'red' }}>
                                    {errors.name}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="mb-1">
                                <label className="col-form-label" htmlFor="image">
                                  Image<span className="required-star">*</span>
                                </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    className="form-control"
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleChange}
                                  />
                                </div>
                                {previewImage && (
                                  <img
                                    src={previewImage}
                                    alt="Profile Preview"
                                    style={{ height: '60px', width: '60px', borderRadius: '10px', marginTop: '10px' }}
                                  />
                                )}
                                {errors.image && (
                                  <span className="validation_error_message" style={{ color: 'red' }}>
                                    {errors.image}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="mb-1">
                                <label className="col-form-label" htmlFor="contact_number">
                                  Contact Number<span className="required-star">*</span>
                                </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="contact_number"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                  />
                                </div>
                                {errors.contact_number && (
                                  <span className="validation_error_message" style={{ color: 'red' }}>
                                    {errors.contact_number}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {successMessage && <div className="alert alert-success">{successMessage}</div>}
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
