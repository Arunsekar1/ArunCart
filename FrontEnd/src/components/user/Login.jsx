import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {loading, error, isAuthenticated} = useSelector(state => state.authState)
  const redirect = location.search?'/'+location.search.split('=')[1]:'/';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password))
  }

  useEffect(()=>{
    if(isAuthenticated){
      navigate(redirect)
    }
    if(error){
        toast(error, {
              position: 'bottom-center',
              type:'error',
              onOpen: () => {dispatch(clearAuthError())}
            });
        return
    }
  },[error,isAuthenticated,dispatch,navigate])

  return (
    <>
      <MetaData title={"Login"} />

      <div className="login-styles">
        <div className="w-100 login-style" style={{ maxWidth: "450px" }}>
          <form onSubmit={submitHandler} className="shadow-lg">
            {/* Title */}
            <h1 className="mb-3">Login</h1>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

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

            {/* Forgot Password */}
            <div className="text-end mb-3">
              <Link to='/password/forgot' className="text-decoration-none text-muted small">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              id="login_button"
              type="submit"
              className="btn w-100 py-3 login-btn"
              disabled={loading}
            >
              LOGIN
            </button>

            {/* New User */}
            <div className="text-end mt-3">
              <Link to="/register" className="text-decoration-none text-muted small">
                New User?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
