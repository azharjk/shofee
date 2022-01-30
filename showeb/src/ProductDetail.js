import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';

import Context from './Context';

import celana_kulot from './assets/celana_kulot.jpeg';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [state, setState] = useContext(Context);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { productId } = useParams();

  const getProductDetail = async () => {
    let response;
    try {
      response = await axios.get(`http://localhost:8000/products/${productId}/`);
      setProduct(response.data);
    } catch (err) {
      console.log('[ERROR] getProductDetail function');
      console.error(err);
    }
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const data = {
      user_id: state.user.id,
      ordered_product: {
        product_id: product.id,
        qty: qty
      }
    }
    console.log(data);
    try {
      const response = await axios.post('http://localhost:8000/carts/', data);
      console.log(response);
      navigate(`/cart/${state.user.id}`);
    } catch (e) {
      console.log('ERROR: handleSubmitProduct error');
      console.error(e)
    }
  }

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <Container>
      <p style={{ fontSize: '24px' }}>Product detail</p>
      <Row>
        <Col>
          <img src={product ? product.image : celana_kulot} alt="Gambar produk" style={{ width: '500px', height: '500px' }} />
        </Col>
        <Col>
          <p style={{ fontSize: '24px' }}>{product ? product.name : 'Loading...'}</p>
          <p className="text-primary" style={{ fontSize: '28px' }}>{product ? product.price : 'Loading...'}</p>
          <Form onSubmit={handleSubmitProduct}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kuantitas</Form.Label>
              <Form.Control value={qty} onChange={(e) => { setQty(e.target.value) }} name="quantity" type="number" placeholder="Masukan kuantitas" />
              <Form.Text className="text-muted">
                Tersisa {product ? product.amount : 'Loading...'} buah
              </Form.Text>
            </Form.Group>
            <div className="d-flex">
              <Button type="submit" className="me-4" variant="outline-primary">Masukan Keranjang</Button>
              <Button type="submit">Beli Sekarang</Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <div>
          <p>@{product ? product.user.username : 'Loading...'}</p>
          <Link className="btn btn-primary" to={`/user/${product ? product.user.id : 'none'}`}>Kunjungi</Link>
        </div>
      </Row>
    </Container>
  );
}

export default ProductDetail;
