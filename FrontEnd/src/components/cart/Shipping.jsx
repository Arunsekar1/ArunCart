import React, { useState } from 'react'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { countries } from 'countries-list';
import { saveShippingInfo } from '../../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { toast } from 'react-toastify';

export const validateShipping = (shippingInfo,navigate) => {
    if(!shippingInfo.address||
        !shippingInfo.city||
        !shippingInfo.country||
        !shippingInfo.phoneNo||
        !shippingInfo.postalCode
    ){
        toast.error('Please fill the shipping information',{
            position:'bottom-center'
        })
        navigate('/shipping')
    }
}

export default function Shipping() {
    const { shippingInfo={} } = useSelector(state => state.cartState)

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const countryList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({address,city,phoneNo,postalCode,country,state}))
        navigate('/order/confirm')
    }

    return (
        <>
            <MetaData title={"Shipping Info"} />
            <CheckoutSteps shipping/>
            <div className="login-styles">
                <div className="w-100 login-style" style={{ maxWidth: "450px" }}>
                    <form onSubmit={submitHandler} className="shadow-lg">
                        {/* Title */}
                        <h1 className="mb-3">Shipping Info</h1>

                        {/* Address */}
                        <div className="mb-3">
                            <label htmlFor="address_field" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        {/* City */}
                        <div className="mb-3">
                            <label htmlFor="city_field" className="form-label">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-3">
                            <label htmlFor="phone_field" className="form-label">Phone No</label>
                            <input
                                type="tel"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        {/* Postal Code */}
                        <div className="mb-3">
                            <label htmlFor="postal_code_field" className="form-label">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                />
                        </div>

                        {/* Country */}
                        <div className="mb-3">
                            <label htmlFor="country_field" className="form-label">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >{countryList.map((c, i) => (
                                <option key={i} value={c.name}>
                                    {c.name}
                                </option>
                            ))
                                }
                            </select>
                        </div>

                        {/* State */}
                        <div className="mb-3">
                            <label htmlFor="state_field" className="form-label">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>

                        {/* Continue Button */}
                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn w-100 py-3 login-btn"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}