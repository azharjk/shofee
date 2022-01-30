import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
  Button,
} from 'react-bootstrap';

import Recommended from './Recommended';
import ProductDetail from './ProductDetail';
import UserDetail from './UserDetail';
import Cart from './Cart';
import Topup from './Topup';
import Search from './Search';
import Register from './Register';
import Login from './Login';
import Context from './Context';
import RequireAuth from './RequireAuth';

import { chunkArray } from './utils';

const App = () => {
  const [state, setState] = useState({
    user: {
      id: 1,
      username: 'toko_apple'
    },
    token: ''
  });
  const [productChunk, setProductChunk] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const getAllProducts = async () => {
    let response;
    try {
      response = await axios.get('http://localhost:8000/products/');
      setProductChunk(chunkArray(response.data));
    } catch (err) {
      console.log('[ERROR] getAllProducts function');
      console.error(err);
    }
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`, { replace: false });
  }

  const getAuthenticatedUser = async () => {
    let token = localStorage.getItem('token');
    if (token === null) {
      token = '';
      setState((state) => ({token: token, ...state}));
      return;
    }
    let response = await axios.post('http://localhost:8000/users/api-token-user/', {
      token
    });
    setState((state) => ({token: token, user: response.data}));
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setState((state) => ({token: '', user: {}}));
  }

  useEffect(() => {
    getAllProducts();
    getAuthenticatedUser();
  }, []);

  return (
    <Context.Provider value={[state, setState]}>
      <div>
        <Navbar bg="primary">
          <Container>
            <Navbar.Brand className="text-white">Shofee</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                {state.token.length > 0 ? (
                  <>
                    <Link to={`/user/${state.user.id}`} className="nav-link text-white">@{state.user.username}</Link>
                    <Link to={`/cart/${state.user.id}`} className="nav-link text-white">Keranjang</Link>
                    <Button onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="nav-link text-white">Daftar</Link>
                    <Link to="/login" className="nav-link text-white">Login</Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container d-flex justify-content-center py-4">
          <Form onSubmit={handleSumbit} style={{ width: '100%' }}>
            <InputGroup>
              <FormControl
                placeholder="Search for products..."
                value={query}
                onChange={handleQueryChange}
              />
              <Button type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>
        </div>
        <Routes>
          <Route path="/" element={<Recommended productChunk={productChunk} />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/user/:userId" element={<UserDetail />} />
          <Route path="/cart/:userId" element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          } />
          <Route path="/topup/:userId" element={
            <RequireAuth>
              <Topup />
            </RequireAuth>
          } />
          <Route path="/search" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
