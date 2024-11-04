import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/api';
import { useNavigate } from 'react-router-dom';

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword')
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword)
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userInformation = { email, password };

    try {
      const result = await dispatch(loginUser(userInformation)) 
      if (result.payload) {
        setEmail('');
        setPassword('');

        if (rememberMe) {
          sessionStorage.setItem('rememberedEmail', email);
          sessionStorage.setItem('rememberedPassword', password)
        }

        navigate('/user');
      }
    } catch (error) {
      setError('Erreur dans l\'email et/ou le mot de passe'); 
      console.error(error);
    }
  };

  return (
    <section className="sign-in-content">
       <form onSubmit={handleLogin}>
      <div>
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      </div>

     
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="current-email"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
        <div className="error-message">{error}</div>
      </form>
    </section>
  );
}

export default Form;
