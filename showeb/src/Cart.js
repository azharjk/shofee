import { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import { Container, Card, Button } from "react-bootstrap";

import iphone13pro from './assets/iphone13pro.png';

import Context from './Context';

const Cart = () => {
  const { userId } = useParams();
  const [state, setState] = useContext(Context);
  const [products, setProduct] = useState([]);

  const getCartData = async () => {
    try {
      let response = await axios.get(`http://localhost:8000/carts/${userId}/`);
      setProduct(response.data);
      console.log(response.data);
    } catch (e) {
      console.log('ERROR getCartData error');;;;
      console.error(e);
    }
  }

  useEffect(() => {
    getCartData();
  }, []);


  return (
    <Container>
      <p style={{ fontSize: '24px' }}>Keranjang dari @{state.user.username}</p>
      {products.map((product, index) => (
        <Card style={{ width: '100%', flexDirection: 'row' }} key={index}>
          <Card.Img style={{ height: '14rem', width: '14rem' }} variant="top" src={product.ordered_products.products.image} />
          <Card.Body>
            <Card.Title>{product.ordered_products.products.name}</Card.Title>
            <Card.Text>
              <p>Harga: {product.ordered_products.products.price}</p>
              <p>Kuantitas: {product.ordered_products.qty}</p>
              <p>Harga akhir: {product.ordered_products.total_price}</p>
            </Card.Text>
            <Button variant="primary">Checkout</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  )
}

export default Cart;
