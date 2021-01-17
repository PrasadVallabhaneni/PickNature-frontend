import React from 'react';
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import Rating from './Rating';
const Product = ({product}) => {
    return (
      <Card className="my-3 p-3 rounded" style={{height:'400px'}}>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} style={{height:'200px'}} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title>
                <div>
                    <strong>{product.name}</strong>
                </div>
            </Card.Title>
          </Link>

          <Card.Text>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#f8e825'/>
          </Card.Text>
          <Card.Text>
              <h3>₹{product.price}</h3>
          </Card.Text>
        </Card.Body>
      </Card>
    ); 
}

export default Product
