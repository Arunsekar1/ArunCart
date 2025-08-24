import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import {useDispatch, useSelector} from 'react-redux'
import { getAdminProducts } from '../../actions/productActions';

export default function Dashboard() {
  const { products = [] } = useSelector(state => state.productsState);
  const dispatch = useDispatch();
  let outOfStock = 0;

  if(products.length > 0) {
    products.forEach(product => {
      if(product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    })
  }

  useEffect(() => {
    dispatch(getAdminProducts())
  },[])

  return (
    <div className='row'>
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Dashboard</h1>
        <div className="row pe-4">
          <div className="col-xl-12 col-sm-12 mb-3">
            <div className="card text-white bg-primary overflow-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Total Amount<br /> <b>$3425</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row pe-4">
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-success overflow-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Products<br /> <b>{products.length}</b></div>
              </div>
              <a className="card-footer text-white clearfix small z-1" to="/admin/products">
                <span className="float-start">View Details</span>
                <span className="float-end">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>


          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-danger overflow-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Orders<br /> <b>345</b></div>
              </div>
              <a className="card-footer text-white clearfix small z-1" to="/admin/orders">
                <span className="float-start">View Details</span>
                <span className="float-end">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>


          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-info overflow-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Users<br /> <b>55</b></div>
              </div>
              <a className="card-footer text-white clearfix small z-1" href="/admin/users">
                <span className="float-start">View Details</span>
                <span className="float-end">
                  <i className="fa fa-angle-right"></i>
                </span>
              </a>
            </div>
          </div>


          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-warning overflow-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
