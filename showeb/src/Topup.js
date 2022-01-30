import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';

import Context from './Context';

const Topup = () => {
  const [state, setState] = useContext(Context);
  const navigate = useNavigate();
  const topupList = [
    {
      formatPrice: 'Rp100.000.000,00',
      price: 100_000_000
    },
    {
      formatPrice: 'Rp200.000.000,00',
      price: 200_000_000
    },
    {
      formatPrice: 'Rp300.000.000,00',
      price: 300_000_000
    },
  ]

  const handleTopup = async (price) => {
    try {
      let response = await axios.post(`http://localhost:8000/wallets/${state.user.id}/deposit`, {
        amount: price
      });
      navigate(`/user/${state.user.id}`);
    } catch (e) {
      console.log('ERROR: handleTopup');
      console.log(e);
    }
  }

  return (
    <Container>
      {topupList.map((v, index) => (
        <Card key={index}>
          <Card.Body>
            <p>{v.formatPrice}</p>
            <Button onClick={() => handleTopup(v.price)}>Buy</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  )
}

export default Topup;
