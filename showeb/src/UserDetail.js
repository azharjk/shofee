import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { Container } from "react-bootstrap";

import Recommended from "./Recommended";
import { chunkArray } from './utils';

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [wallet, setWallet] = useState(null);

  const getUserDetail = async () => {
    let response;
    try {
      response = await axios.get(`http://localhost:8000/users/${userId}/`);
      console.log(response);
      setUser(response.data);
      if (response.data.wallet) {
        setWallet(response.data.wallet);
      }
    } catch (err) {
      console.log('[ERROR] getProductDetail function');
      console.error(err);
    }
  }

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <Container>
      <p style={{ fontSize: '24px' }}>User detail: @{user ? user.username : 'Loading...'}</p>
      <div>
        <p>Username: @{user ? user.username : 'Loading...'}</p>
        <p>Produk: {user ? user.products_count : '0'}</p>
        <p>CoinLater: {wallet ? wallet.balance_formatted : 'Loading...'}</p>
        <Link className="btn btn-primary" to={`/topup/${user ? user.id : 'Loading'}`}>Top up CoinLater</Link> 
      </div>
      <Recommended productChunk={user ? chunkArray(user.products) : []} title={user ? `Rekomendasi dari @${user.username}` : 'loading'} />
    </Container>
  );
}

export default UserDetail;
