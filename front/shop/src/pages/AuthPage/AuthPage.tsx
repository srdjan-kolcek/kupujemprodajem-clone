import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.sub) navigate('/');
      } catch {
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  return (
    <div className="auth-page-container">
      <Outlet />
    </div>
  );
};

export default AuthPage;