import React, { useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, resetPassword } from '../../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const { isAuthenticated, error } = useSelector(state => state.authState)
    const navigate = useNavigate();
    const { token } = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        dispatch(resetPassword(formData, token))
    }

    useEffect(() => {
        if (isAuthenticated) {
            toast('Password Reset Success!', {
                type: 'success',
                position: 'bottom-center'
            })
            navigate('/')
            return;
        }
        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => { dispatch(clearAuthError()) }
            });
            return;
        }
    },[isAuthenticated, error, dispatch, navigate])


    return (
        <>
            <MetaData title={"Reset Password"} />
            <div className="login-styles">
                <div className="w-100 login-style" style={{ maxWidth: "450px" }}>
                    <form onSubmit={submitHandler} className="shadow-lg p-4 bg-body">
                        {/* Title */}
                        <h1 className="mb-4">New Password</h1>

                        {/* Password */}
                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-3">
                            <label htmlFor="confirm_password_field" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn w-100 py-3 mt-2"
                        >
                            Set Password
                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}
