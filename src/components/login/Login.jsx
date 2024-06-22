import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiData from '../../axiosConfig';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await apiData.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('respo', response);

            const token = response.data.token;
            // console.log("token",token)
            localStorage.setItem("token", token);
            navigate('/dashboard'); // Ensure navigate is called correctly
        } catch (error) {
            setError('Invalid credentials or an error occurred. Please try again.');
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <div className="content-body">
                <div className="auth-wrapper auth-basic px-2">
                    <div className="auth-inner my-2">
                        <div className="card mb-0">
                            <div className="card-body">
                                <h2 className="brand-text text-orange ms-1 ">Jackpot Pro</h2>
                                <h4 className="card-title mb-1">Welcome to Jackpot Pro! 👋</h4>
                                <p className="card-text mb-2">Please sign-in to your account and start the adventure</p>

                                {error && <div className="alert alert-danger">{error}</div>}

                                <form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                                    <div className="mb-1">
                                        <label htmlFor="login-email" className="form-label">Email</label>
                                        <input
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            placeholder="john@example.com"
                                            id="login-email"
                                        />
                                    </div>

                                    <div className="mb-1">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" htmlFor="login-password">Password</label>
                                            <Link to="/forgot-password">
                                                <small>Forgot Password?</small>
                                            </Link>
                                        </div>
                                        <div className="input-group input-group-merge form-password-toggle">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="form-control form-control-merge"
                                                id="login-password"
                                                name="password"
                                            />
                                            <span className="input-group-text cursor-pointer" onClick={togglePasswordVisibility}>
                                                <i data-feather={showPassword ? "eye-off" : "eye"}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mb-1">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me" tabIndex="3" />
                                            <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary w-100">Sign in</button>
                                </form>

                                <p className="text-center mt-2">
                                    <span>New on our platform?</span>
                                    <Link to="/register">
                                        <span>Create an account</span>
                                    </Link>
                                </p>

                                <div className="divider my-2">
                                    <div className="divider-text">or</div>
                                </div>

                                <div className="auth-footer-btn d-flex justify-content-center">
                                    <a href="#" className="btn btn-facebook">
                                        <i data-feather="facebook"></i>
                                    </a>
                                    <a href="#" className="btn btn-twitter white">
                                        <i data-feather="twitter"></i>
                                    </a>
                                    <a href="#" className="btn btn-google">
                                        <i data-feather="mail"></i>
                                    </a>
                                    <a href="#" className="btn btn-github">
                                        <i data-feather="github"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
