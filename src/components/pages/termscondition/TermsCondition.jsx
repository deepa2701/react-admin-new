import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiData from '../../../axiosConfig';

const AddTermsCondition = (props) => {
    const [editorHtml, setEditorHtml] = useState('');
    const [theme] = useState('snow'); // Default theme is 'snow'
    const [error, setError] = useState('');

    // Handle Quill editor changes
    const handleEditorChange = (html) => {
        setEditorHtml(html);
        if (html) {
            setError(''); // Clear error message if there's content
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editorHtml) {
            setError('Please enter some content before submitting.'); // Set error message
            return;
        }
        const token = localStorage.getItem('token');
        console.log("token", token);

        // Create FormData object
        const data = new FormData();
        data.append('text', editorHtml); // Add the HTML content to the FormData object

        try {
            const response = await apiData.post('/terms-and-condetion', data, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                },
            });

            console.log('response', response);
            console.log('res', errors.text);

        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            console.log('res', errors.text);
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
                                                            value={editorHtml}
                                                            modules={AddTermsCondition.modules}
                                                            formats={AddTermsCondition.formats}
                                                            bounds={'.app'}
                                                            placeholder={props.placeholder || 'Write something...'}
                                                        />
                                                        {/* {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} */}
                                                   
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                                                    </div>
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
AddTermsCondition.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean'] // remove formatting button
    ],
};

AddTermsCondition.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

export default AddTermsCondition;
