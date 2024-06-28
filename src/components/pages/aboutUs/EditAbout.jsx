import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiData from '../../../axiosConfig';

const EditAbout = () => {
  const location = useLocation();
  const history = useHistory();
  const { id, text } = location.state || { id: null, text: '' };

  useEffect(() => {
    if (!id) {
      // Redirect to another page or handle the error
      history.push('/dashboard');
    }
  }, [id, history]);

  const [formData, setFormData] = useState({
    editorHtml: text || '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [theme] = useState('snow'); // Default theme is 'snow'

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value) {
      setErrors({ ...errors, [name]: '' }); // Clear error message if there's content
    }
  };

  // Handle Quill editor changes
  const handleEditorChange = (html) => {
    setFormData({ ...formData, editorHtml: html });
    if (html) {
      setErrors({ ...errors, editorHtml: '' }); // Clear error message if there's content
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { editorHtml } = formData;

    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('text', editorHtml);

    try {
      const response = await apiData.post(`/update-about-us/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Data successfully submitted!'); // Set success message
      setFormData({ editorHtml: '' }); // Reset form data
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
      } else {
        console.log(error.response.data);
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
                  <h2 className="content-header-title float-start mb-0">About Us</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <section id="basic-horizontal-layouts">
              <div className="row">
                <div className="col-md-12 col-12">
                  <div className="card">
                    <div className="card-body">
                      <form className="form form-horizontal" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-12">
                            <ReactQuill
                              theme={theme}
                              onChange={handleEditorChange}
                              value={formData.editorHtml}
                              modules={EditAbout.modules}
                              formats={EditAbout.formats}
                              bounds={'.app'}
                              // placeholder={props.placeholder || 'Write something...'}
                            />
                            {errors.text && <span className="validation_error_message" style={{ color: 'red' }}>{errors.text}</span>}
                          </div>
                          <div className="col-12">
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                          </div>
                          {successMessage && <div className="col-12 mt-3"><span style={{ color: 'green' }}>{successMessage}</span></div>}
                        </div>
                      </form>
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
};

// Modules and formats need to be defined
EditAbout.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean'] // remove formatting button
  ],
};

EditAbout.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default EditAbout;
