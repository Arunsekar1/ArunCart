import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, register } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layouts/MetaData';

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(e.target.files[0])
                }
            }

            reader.readAsDataURL(e.target.files[0])
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar);
        dispatch(register(formData))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
            return
        }
        if (error) {
            toast.error(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return
        }
    }, [error, isAuthenticated, navigate, dispatch])

    return (
        <>
            <MetaData title={"Register"} />
            <div className="login-styles">
                <div className="w-100 login-style" style={{ maxWidth: "450px" }}>
                    <form
                        onSubmit={submitHandler}
                        className="shadow-lg"
                        encType="multipart/form-data">
                        {/* Title */}
                        <h1 className="mb-3">Register</h1>
                        {/* Name */}
                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Name</label>
                            <input name='name'
                                onChange={onChange} type="text" id="name_field" className="form-control" />
                        </div>
                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                name='email'
                                onChange={onChange}
                                type="email"
                                id="email_field"
                                className="form-control"
                            />
                        </div>
                        {/* Password */}
                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                name='password'
                                onChange={onChange}
                                type="password"
                                id="password_field"
                                className="form-control"
                            />
                        </div>
                        {/* Avatar Upload */}
                        <div className="mb-3">
                            <label htmlFor="avatar_upload" className="form-label">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div className="avatar me-3">
                                    <figure className='avatar me-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar"
                                            className="rounded-circle"
                                        />
                                    </figure>
                                </div>
                                {/* <input type="file" name='avatar' onChange={onChange} id="customFile" className="form-control" accept="image/*" /> */}
                                <div
                                    style={{
                                        border: "1px solid #ced4da",
                                        borderRadius: "4px",
                                        display: "flex",
                                        alignItems: "center",
                                        overflow: "hidden",
                                        width: "100%"
                                    }} >
                                    <span
                                        style={{
                                            padding: "6px 12px",
                                            flex: 1,
                                            color: "#6c757d",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }} >
                                        {avatar ? avatar.name : "Choose Avatar"}
                                    </span>
                                    <label
                                        htmlFor="avatar"
                                        style={{
                                            background: "#e9ecef",
                                            padding: "6px 12px",
                                            cursor: "pointer",
                                            margin: 0,
                                            whiteSpace: "nowrap"
                                        }} >
                                        Browse
                                    </label>
                                </div>
                                <input
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    onChange={onChange}
                                    accept="image/*"
                                    style={{ display: "none" }} />
                            </div>
                        </div>
                        {/* Register Button */}
                        <button
                            id="register_button"
                            type="submit"
                            className="btn w-100 py-3 login-btn"
                            disabled={loading} >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div >
        </>
    )
}
