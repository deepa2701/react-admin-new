import React from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    return (
        <>
            <div class="content-body">
                <div class="auth-wrapper auth-basic px-2">
                    <div class="auth-inner my-2">
                        <div class="card mb-0">
                            <div class="card-body">
                                <a href="index.html" class="brand-logo">
                                    
                                    <h2 class="brand-text ms-1">JackPot Pro</h2>
                                </a>

                                <h4 class="card-title mb-1">Forgot Password? 🔒</h4>
                                <p class="card-text mb-2">Enter your email and we'll send you instructions to reset your password</p>

                                <form class="auth-forgot-password-form mt-2" action="auth-reset-password-basic.html" method="POST" novalidate="novalidate">
                                    <div class="mb-1">
                                        <label for="forgot-password-email" class="form-label">Email</label>
                                        <input type="text" class="form-control" id="forgot-password-email" name="forgot-password-email" placeholder="john@example.com" />
                                    </div>
                                    <button class="btn btn-primary w-100 waves-effect waves-float waves-light" tabindex="2">Send reset link</button>
                                </form>

                                <p class="text-center mt-2">
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