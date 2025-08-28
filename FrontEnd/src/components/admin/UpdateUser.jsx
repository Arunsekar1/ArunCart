import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../actions/userActions';
import { toast } from 'react-toastify'
import { clearError, clearUserUpdated } from '../../slices/userSlice';

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const {id:userId} = useParams();
  const { loading, isUserUpdated, error, user } = useSelector(state => state.userState)
  const { user:authUser } = useSelector(state => state.authState)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    dispatch(updateUser(userId,formData))
  }




  useEffect(() => {
    if (isUserUpdated) {
      toast('User Update Successfully', {
        type: 'success',
        position: 'bottom-center',
        onOpen: () => dispatch(clearUserUpdated())
      })
      return;
    }

    if (error) {
      toast.error(error, {
        position: 'bottom-center',
        type: 'error',
        onOpen: () => { dispatch(clearError()) }
      });
      return;
    }
    dispatch(getUser(userId))
  }, [isUserUpdated, error, dispatch,userId])

  useEffect(() => {
    if(user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  },[user])

  return (
    <div className='row'>
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <>
          <div className="login-styles">
            <div className="w-100 login-style" style={{ maxWidth: "450px" }}>
              <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                <h1 className="mb-4">Update User</h1>

                <div className="mb-3">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="text"
                    id="email_field"
                    className="form-control"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category_field">Role</label>
                  <select disabled={user._id === authUser._id } value={role} onChange={e => setRole(e.target.value)} className="form-control" id="category_field">
                    <option value="admin" >Admin</option>
                    <option value="user" >User</option>
                  </select>
                </div>

                <button
                  id="create_button"
                  type="submit"
                  className="btn w-100 py-3"
                  disabled={loading}
                >
                  UPDATE
                </button>

              </form>
            </div>
          </div>
        </>
      </div>
    </div>
  )
}
