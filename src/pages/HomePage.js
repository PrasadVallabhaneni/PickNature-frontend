import {React, useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listProducts} from '../actions/productActions';
const HomePage = () => {

const dispatch=useDispatch();
const productList=useSelector(state=>state.productList)
const {loading,error,products}=productList 
    useEffect(async ()=>{
        dispatch(listProducts())
    },[dispatch])
//   const products=[]  
    return (
      <>
        <h3 style={{color:'brown', opacity:'0.7'}}>
          Choose Plants to plant <i class="fas fa-seedling"></i>
        </h3>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </>
    );
}

export default HomePage
