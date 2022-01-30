import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Alert, Button } from 'react-bootstrap';

import Context from './Context';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [state, setState] = useContext(Context);

  const handleLoginSubmit = async (e) => {
   e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/users/api-token-auth/', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      setState((state) => ({token: response.data.token, user: response.data.user}))
      navigate('/');
    } catch (err) {
      console.log("ERROR: login");
      setShowError(true);
    }
   }

  return (
    <Container>
      <p style={{ fontSize: '24px' }}>Login</p>
      <Form onSubmit={handleLoginSubmit}>
        {showError ? (
          <Alert variant="danger">
            Form error
          </Alert>
        ) : null}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>);
}

export default Login;
