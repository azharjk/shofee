import { Link } from 'react-router-dom';
import {
  Container,
  Card,
} from 'react-bootstrap';

import './recommend-section.css'

const truncateText = (text) => {
  const max = 60

  if (text.length >= max) {
    return text.substring(0, max) + '...'
  }
  return text
}

const Recommended = ({ productChunk, title = 'Rekomendasi' }) => {
  return (
    <Container>
      <p style={{ fontSize: '24px' }}>{title}</p>
      <div>
        {productChunk.map((products, index) => {
          return (
            <div className="recommend-section" key={index}>
              {products.map((product, index) => {
                return (
                  <Card key={index} style={{ width: '18rem' }}>
                    <Card.Img style={{ height: '286px' }} variant="top" src={product.image} />
                    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Card.Title as="p">{truncateText(product.name)}</Card.Title>
                      <div className="d-flex align-items-center justify-content-between">
                        <Card.Title as="p" className="text-primary" style={{ fontSize: '18px' }}>{product.price}</Card.Title>
                        <Link className="btn btn-primary" to={`/product/${product.id}`}>Kunjungi</Link>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          );
        })}
      </div>
    </Container>
  )
}

export default Recommended;
