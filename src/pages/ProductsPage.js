import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,Form,ListGroupItem
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
const ProductsPage = (props) => {

  const [qty,setQty]=useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
   const addToCart=()=>{
     props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
   }
  useEffect(async () => {
    //  console.log(product)
    dispatch(listProductDetails(props.match.params.id));
  }, []);

  return (
    <Container>
      <Link to="/" className="my-3">
        <button type="button" class="btn btn-warning">
          Go Back
        </button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6} className="my-3">
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="#f8e825"
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>₹{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    {product.countInStock > 0 ? (
                      <Col style={{ color: "blue" }}>In Stock</Col>
                    ) : (
                      <Col style={{ color: "red" }}>Out of Stock</Col>
                    )}
                  </Row>
                </ListGroup.Item>
                {product.countInStock>0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>
                        Qty
                      </Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {
                        [...Array(product.countInStock).keys()].map(x=>(
                          <option key={x+1} value={x+1}>
                           {x+1}
                          </option>
                        ))
                        }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block btn-secondary"
                    type="button"
                    disabled={product.countInStock == 0}
                    onClick={addToCart}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductsPage;
