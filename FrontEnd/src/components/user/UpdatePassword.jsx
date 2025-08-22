import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, updatePassword as updatePasswordAction } from '../../actions/userActions'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UpdatePassword() {

    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const dispatch = useDispatch();
    const {isUpdated, error} = useSelector(state => state.authState)

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword)
        formData.append('password', password)
        dispatch(updatePasswordAction(formData))
    }

    useEffect(()=>{
        if (isUpdated) {
                toast('Password updated successfully', {
                    type: 'success',
                    position: "bottom-center"
                });
                setOldPassword("");
                setPassword("")

                return;
            }
        
            if (error) {
                toast.error(error, {
                    position: 'bottom-center',
                    type: 'error',
                    onOpen: () => { dispatch(clearAuthError()) }
                });
                return;
            }
    },[isUpdated,error,dispatch])
    return (
        <>
            <MetaData title={"Update Password"} />

            <div className="login-styles">
                <div className="w-100 login-style" style={{ maxWidth: "450px" }}>
                    <form onSubmit={submitHandler} className="shadow-lg p-4 bg-body">
                        {/* Title */}
                        <h1 className="mb-4">Update Password</h1>

                        {/* Old Password */}
                        <div className="mb-3">
                            <label htmlFor="old_password_field" className="form-label">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={e => { setOldPassword(e.target.value) }}
                            />
                        </div>

                        {/* New Password */}
                        <div className="mb-3">
                            <label htmlFor="new_password_field" className="form-label">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={e => { setPassword(e.target.value) }}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn w-100 py-3 mt-2"
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
