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
  console.log(cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return <h1>Cart</h1>;
};

export default CartPage;
