import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {PayPalButton} from 'react-paypal-button-v2';
import axios from 'axios';
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import {ORDER_PAY_RESET} from '../constants/orderConstants';
const OrderPage = ({ match }) => {
  
const orderId=match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails); 

  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);

  const { success:successPay, loading:loadingPay } = orderPay;
  
  if(!loading){
      order.itemsPrice = order.orderItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
  }
  useEffect(() => {
      const addPaypalScript=async()=>{
          const { data: clientId } = await axios.get(
            "https://picknature-backend.herokuapp.com/api/config/paypal"
          );
          
        const script=document.createElement('script');
        script.type='text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async=true;
   document.body.appendChild(script);      
script.onload=()=>{
    setSdkReady(true);
   
}

      }
    if(!order || successPay){
        dispatch({type:ORDER_PAY_RESET})
dispatch(getOrderDetails(orderId));
    }else if(!order.isPaid){
      
        if(!window.paypal){
            addPaypalScript()
        }else{
            setSdkReady(true)
        }
    }
    
  }, [dispatch,orderId,successPay,order]);
  

  const successPayment=(paymentResult)=>{
console.log(paymentResult)
dispatch(payOrder(orderId,paymentResult))
  }
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error}></Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>

          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    {" "}
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    {" "}
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message
                      variant="success"
                      message={`Delivered on ${order.deliveredAt}`}
                    ></Message>
                  ) : (
                    <Message variant="info" message="Not delivered"></Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message
                      variant="success"
                      message={`paid on ${order.paidAt}`}
                    ></Message>
                  ) : (
                    <Message variant="danger" message="Not paid"></Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message
                      variant="info"
                      message="Your order is empty"
                    ></Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ₹{item.price} = ₹{" "}
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>₹ {order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>₹ {order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>₹ {order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>total</Col>
                      <Col>₹ {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                      <ListGroup.Item>
                          {loadingPay && <Loader/>}
                          {!sdkReady?<Loader/>:(
                              <PayPalButton amount={order.totalPrice} onSuccess={successPayment}/>
                          )}
                      </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
export default OrderPage;
