import React, { useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
import { getProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './layouts/Loader';
import Product from './product/Product';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';


export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
  const [ currentPage, setCurrentPage] = useState(1)
  console.log(currentPage)
  const setCurrentPageNo = ({ selected }) => {
    setCurrentPage(selected + 1)
  }

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: 'bottom-center',
      });
    }
    console.log("📦 Home component: dispatching getProducts");
    dispatch(getProducts(null, null, null, null, currentPage))
  }, [dispatch, error, currentPage])


  return (
    <>
      {loading ? <Loader /> : null}
      <>
        <MetaData title={'Buy Best Products'} />
        <h1 id="products_heading">Latest Products</h1>

        <section id="products" className="container mt-5">
          <div className="row">
            {products && products.map((product) => (
              <Product col={3} key={product._id} product={product} />
            ))}
          </div>
        </section>
        {productsCount > 0 && productsCount > resPerPage ?
          <div className="d-flex justify-content-center mt-5">
            <ReactPaginate
              previousLabel={'Prev'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={Math.ceil(productsCount / resPerPage)}
              onPageChange={setCurrentPageNo}
              forcePage={currentPage - 1}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </div> : null}
      </>
    </>
  )
}
