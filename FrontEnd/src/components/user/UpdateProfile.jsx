import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, updateProfile } from '../../actions/userActions';
import { toast } from 'react-toastify';
import MetaData from '../layouts/MetaData';
import { clearUpdateProfile } from '../../slices/authSlice';

export default function UpdateProfile() {
    const { error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(e.target.files[0])
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        if (avatar) formData.append('avatar', avatar);
        dispatch(updateProfile(formData))
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                if (typeof user.avatar === "string") {
                    setAvatarPreview(user.avatar); // direct URL
                } else if (user.avatar.url) {
                    setAvatarPreview(user.avatar.url); // Cloudinary URL object
                }
            }
        }

        if (isUpdated) {
            toast('Profile updated successfully', {
                type: 'success',
                position: "bottom-center",
                onOpen: () => { dispatch(clearUpdateProfile()) }
            });
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
    }, [user, isUpdated, error, dispatch]);



    return (
        <>
            <MetaData title={"Update Profile"} />
            <div className="login-styles">
                <div className="w-100 login-style" style={{ maxWidth: "450px" }}>
                    <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
                        {/* Title */}
                        <h1 className="mb-3">Update Profile</h1>

                        {/* Name */}
                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Name</label>
                            <input
                                name='name'
                                type="text"
                                id="name_field"
                                className="form-control"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                name='email'
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
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
                                            alt="image"
                                            className="rounded-circle"
                                        />
                                    </figure>
                                </div>
                                <div
                                    style={{
                                        border: "1px solid #ced4da",
                                        borderRadius: "4px",
                                        display: "flex",
                                        alignItems: "center",
                                        overflow: "hidden",
                                        width: "100%"
                                    }}
                                >
                                    <span
                                        style={{
                                            padding: "6px 12px",
                                            flex: 1,
                                            color: "#6c757d",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}
                                    >
                                        {avatar instanceof File ? avatar.name : "Choose Avatar"}

                                    </span>
                                    <label
                                        htmlFor="avatar"
                                        style={{
                                            background: "#e9ecef",
                                            padding: "6px 12px",
                                            cursor: "pointer",
                                            margin: 0,
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        Browse
                                    </label>
                                </div>

                                <input
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={onChangeAvatar}
                                />
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            id="update_button"
                            type="submit"
                            className="btn w-100 py-3 login-btn"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
