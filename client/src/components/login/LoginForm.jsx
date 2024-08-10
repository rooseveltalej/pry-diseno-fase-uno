import { useState } from 'react';
import './LoginForm.css';  // Importa los estilos específicos para el formulario de inicio de sesión

const Login = () => {
  const [requestToken, setRequestToken] = useState(null);
  const apiKey = "af7264be91d3f252b1abe33245f3b69f";

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
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/session`; // Cambia la URL de redirección según tu entorno
    } else {
      alert('Error al obtener el token de autenticación');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión con TMDB</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;