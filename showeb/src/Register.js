import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

import Context from './Context';

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showError, setShowError] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowError(true);
    }

    try {
      let response = await axios.post('http://localhost:8000/users/create/', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      setState((state) => ({token: response.data.token, user: response.data.user}))
      navigate('/');
    } catch (err) {
      console.log("ERROR: register");
      setShowError(true);
    }
  }

  return (
    <Container>
      <p style={{ fontSize: '24px' }}>Daftar akun</p>
      <Form onSubmit={handleRegisterSubmit}>
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
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" placeholder="Confirm password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
