import React from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    return (
        <>
            <div className="content-body">
                <div className="auth-wrapper auth-basic px-2">
                    <div className="auth-inner my-2">
                        <div className="card mb-0">
                            <div className="card-body">
                                <Link to="/dashboard" className="brand-logo">
                                    
                                    <h2 className="brand-text ms-1">JackPot Pro</h2>
                                </Link>

                                <h4 className="card-title mb-1">Forgot Password? 🔒</h4>
                                <p className="card-text mb-2">Enter your email and we'll send you instructions to reset your password</p>

                                <form className="auth-forgot-password-form mt-2" action="auth-reset-password-basic.html" method="POST" novalidate="novalidate">
                                    <div className="mb-1">
                                        <label for="forgot-password-email" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="forgot-password-email" name="forgot-password-email" placeholder="john@example.com" />
                                    </div>
                                    <button className="btn btn-primary w-100 waves-effect waves-float waves-light" tabindex="2">Send reset link</button>
                                </form>

                                <p className="text-center mt-2">
                                    <Link to="/login">Back to login </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ForgotPassword