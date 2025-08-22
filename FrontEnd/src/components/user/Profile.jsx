import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

export default function Profile() {

    const { user } = useSelector(state => state.authState)

    return (
        <>
            <MetaData title={'My Profile'} />
            <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-3 text-center">
                    <figure className='avatar avatar-profile'>
                        <img className="rounded-circle img-fluid shadow-sm" src={user.avatar ?? './images/default_avatar.png'} alt='Profile' />
                    </figure>
                    <div className="d-grid">
                        <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary my-5">
                            Edit Profile
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-5">
                    <h4>Full Name</h4>
                    <p>{user.name}</p>

                    <h4>Email Address</h4>
                    <p>{user.email}</p>

                    <h4>Joined</h4>
                    <p>{String(user.createdAt).substring(0, 10)}</p>

                    <div className="d-grid gap-3 mt-5">
                        <Link to="/orders" className="btn btn-danger">
                            My Orders
                        </Link>
                        <Link to="/myprofile/update/password" className="btn btn-primary">
                            Change Password
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
