import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';

const CartPage = ({ location, history }) => {
  const { id: productId } = useParams();

  const qty = new URLSearchParams(useLocation().search).get('qty');

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const updateQtyHandler = (id, qty, action) => {
    if (action === 'INC') {
      dispatch(addToCart(id, qty + 1));
    }
    if (action === 'DEC') {
      dispatch(addToCart(id, qty - 1));
    }
  };
  const removeFromCart = (id) => {
    console.log('remove');
  };
  return (
    <Row>
      <Col md={9}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className='text-center'>
                    <Button
                      type='button'
                      variant='dark'
                      className='mx-1'
                      size='sm'
                      onClick={() =>
                        updateQtyHandler(item.product, item.qty, 'DEC')
                      }
                    >
                      <i className='fas fa-minus'></i>
                    </Button>

                    <p
                      type='text'
                      className='mx-1 text-center'
                      value={item.qty}
                      id='qty'
                      size='1'
                    >
                      {item.qty}
                    </p>

                    <Button
                      type='button'
                      className='mx-1'
                      variant='dark'
                      size='sm'
                      onClick={() =>
                        updateQtyHandler(item.product, item.qty, 'INC')
                      }
                    >
                      <i className='fas fa-plus '></i>
                    </Button>
                  </Col>
                  <Col md={2} className='text-center'>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCart(item.product)}
                    >
                      <i className='fas fa-trash '></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} )
                Items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
