import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiData from '../../../axiosConfig';

const EditAbout = () => {
  const [formData, setFormData] = useState({
    editorHtml: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [text, setText] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    apiData.get("/about-us", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setText(response.data.about_us[0].text);
      setId(response.data.about_us[0].id);
      setFormData({ editorHtml: response.data.about_us[0].text });
    })
    .catch(error => {
      console.error("There was an error!", error);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleEditorChange = (html) => {
    setFormData({ ...formData, editorHtml: html });
    if (html) {
      setErrors({ ...errors, editorHtml: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { editorHtml } = formData;

    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('text', editorHtml);
    data.append('id', id);

    try {
      const response = await apiData.post(`/update-about-us`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Data successfully submitted!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors;
        let updatedErrors = {};
        for (let key in apiErrors) {
          updatedErrors[key] = apiErrors[key];
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
                              theme="snow"
                              onChange={handleEditorChange}
                              value={formData.editorHtml}
                              modules={EditAbout.modules}
                              formats={EditAbout.formats}
                              bounds={'.app'}
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

EditAbout.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

EditAbout.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default EditAbout;
