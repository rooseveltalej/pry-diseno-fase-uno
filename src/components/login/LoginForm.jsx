import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onLanguageChange }) => {
  const navigate = useNavigate();
  const [requestToken, setRequestToken] = useState(null);
  const [sessionId, setSessionId] = useState(localStorage.getItem('session_id'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const apiKey = "YOUR_APIKEY";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('request_token');
    const approved = params.get('approved');

    if (approved === 'true' && token && !sessionId) {
      fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          request_token: token,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setSessionId(data.session_id);
            localStorage.setItem('session_id', data.session_id);

            // Obtener el nombre de usuario una vez
            return fetch(`https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${data.session_id}`);
          } else {
            console.error('Error al crear la sesión:', data);
          }
        })
        .then(response => response.json())
        .then(accountData => {
          if (accountData) {
            setUsername(accountData.username);
            localStorage.setItem('username', accountData.username);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, [sessionId, apiKey]);

  const getRequestToken = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`);
      const data = await response.json();
      setRequestToken(data.request_token);
      return data.request_token;
    } catch (error) {
      console.error('Error obteniendo el token de solicitud:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getRequestToken();
    if (token) {
      // Redirigir al usuario para autenticar el token
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173`;
    } else {
      alert(onLanguageChange === 'es' ? 'Error al obtener el token de autenticación' : 'Error obtaining authentication token');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('session_id');
    localStorage.removeItem('username');
    setSessionId(null);
    setUsername(null);
    window.location.href = '/';  // Redirige a la página principal después del logout
  };

  return (
    <>
      {username ? (
        <div>
          <button className="user-button" onClick={() => navigate('/profile')}>
            {username}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            {onLanguageChange === 'es' ? 'Cerrar Sesión' : 'Logout'}
          </button>
        </div>
      ) : (
        <button type="submit" className="login-button" onClick={handleSubmit}>
          {onLanguageChange === 'es' ? 'Iniciar Sesión' : 'Login'}
        </button>
      )}
    </>
  );
};

LoginForm.propTypes = {
  onLanguageChange: PropTypes.string.isRequired, // El idioma actual
};

export default LoginForm;
