import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Context from './Context';

const RequireAuth = ({ children }) => {
  let token = localStorage.getItem('token') || '';
  if (!(token.length > 0)) {
    return <Navigate to="/login" />
  }

  return children
}

export default RequireAuth;
