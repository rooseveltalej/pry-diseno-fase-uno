import { useState, useEffect } from 'react';
import './LoginForm.css';  // Importa los estilos específicos para el formulario de inicio de sesión

const Login = () => {
  const [requestToken, setRequestToken] = useState(null);
  const [sessionId, setSessionId] = useState(localStorage.getItem('session_id'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const apiKey = "af7264be91d3f252b1abe33245f3b69f";

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
  }, [sessionId, apiKey]); // Solo se ejecutará cuando `sessionId` o `apiKey` cambien

  // Función para solicitar un token de inicio de sesión
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

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getRequestToken();
    if (token) {
      // Redirigir al usuario para autenticar el token
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000`;
    } else {
      alert('Error al obtener el token de autenticación');
    }
  };

  return (
    <>
      {username ? (
        <button className="user-button">
          {username}
        </button>
      ) : (
        <button type="submit" className="login-button" onClick={handleSubmit}>
          Iniciar Sesión
        </button>
      )}
    </>
  );
};

export default Login;