import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, forgotPassword } from '../../actions/userActions'
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {error,message } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData))
    }

    useEffect(() => {
        if (message) {
            toast(message, {
                type: 'success',
                position: 'bottom-center'
            })
            setEmail("");
            return
        }

        if (error) {
            toast.error(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => { dispatch(clearAuthError()) }
            });
            return;
        }

    }, [message, error, dispatch])

    return (
        <>
        <MetaData title={"Forgot Password"}/>
        <div className="login-styles">
            <div className="w-100 login-style" style={{ maxWidth: "450px" }}>
                <form onSubmit={submitHandler} className="shadow-lg p-4 bg-body">
                    {/* Title */}
                    <h1 className="mb-4">Forgot Password</h1>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email_field" className="form-label">
                            Enter Email
                        </label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-100 py-3 mt-2"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}
