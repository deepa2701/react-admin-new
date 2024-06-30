import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiData from '../../axiosConfig';

const HelpSupport = (props) => {
    const [formData, setFormData] = useState({
        editorHtml: '',
        // title: '',
        // description: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [theme] = useState('snow'); // Default theme is 'snow'
    const [loading, setLoading] = useState('')

    // Function to fetch data from the API
    const fetchData = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            const response = await apiData.get('/help-and-support', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setFormData({ ...formData, editorHtml: response.data.help_and_support.text });
        } catch (error) {
            console.error("Error fetching data", error);
        }
        finally{
            setLoading(false);
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures this runs once when component mounts

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
        // data.append('title', title);
        // data.append('description', description);

        try {
            const response = await apiData.post('/help-and-support', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Data successfully submitted!'); // Set success message
            fetchData(); // Refetch the data to update the editor
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
                // console.log("updatedErrors",updatedErrors);
                // console.log("apiErrors",apiErrors);
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
                                    <h2 className="content-header-title float-start mb-0">Help & Support</h2>
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
                                        {loading ? (
                                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                                                <div className="spinner-border" role="status">
                                                </div>
                                              </div>
                                            ) : (
                                            <form className="form form-horizontal" onSubmit={handleSubmit}>
                                                <div className="row">
                                                   
                                                    <div className="col-12">
                                                        <ReactQuill
                                                            theme={theme}
                                                            onChange={handleEditorChange}
                                                            value={formData.editorHtml}
                                                            modules={HelpSupport.modules}
                                                            formats={HelpSupport.formats}
                                                            bounds={'.app'}
                                                            placeholder={props.placeholder || 'Write something...'}
                                                        />
                                                        {errors.text && <span className="validation_error_message" style={{ color: 'red' }}>{errors.text}</span>}
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
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
};

// Modules and formats need to be defined
HelpSupport.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean'] // remove formatting button
    ],
};

HelpSupport.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

export default HelpSupport;
