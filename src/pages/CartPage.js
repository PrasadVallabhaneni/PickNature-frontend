import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';
import Message from '../components/Message'
import {addToCart,removeFromCart} from '../actions/cartActions'
const CartPage = (props) => {
    const productId=props.match.params.id;
    const qty=props.location.search?Number(props.location.search.split('=')[1]):1
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    const {cartItems}=cart;

    const removeCart=(id)=>{
        dispatch(removeFromCart(id))
    }

    const checkOut=()=>{
        props.history.push('/login?redirect=shipping')
    }
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty ))
        }
    },[dispatch,productId,qty])
    return (
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Link to="/" style={{ textDecoration: "none" }}>
              <Message
                variant="info"
                message={`Your cart is empty. Click to go back`}
              ></Message>
            </Link>
          ) : (
            <ListGroup variant="fulsh">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeCart(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((total, item) => total + item.qty, 0)})items
                </h2>
                $
                {cartItems.reduce(
                  (tot, item) => tot + item.qty * item.price,
                  0
                )}
              </ListGroup.Item>
              <ListGroup.Item>
<Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkOut}>Proceed To Checkout</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
}

export default CartPage
