// Import des librairies et hooks React
import React, { useState, useEffect } from 'react';

// Import de Redux pour la gestion de l'état
import { useDispatch } from 'react-redux';

// Import de l'action loginUser pour la gestion de la connexion utilisateur
import { loginUser } from '../../redux/api';

// Import du hook useNavigate de React Router pour la navigation
import { useNavigate } from 'react-router-dom';

function Form() {
  // Hook pour accéder à dispatch Redux
  const dispatch = useDispatch();

  // Hook pour gérer la navigation de l'utilisateur après la connexion
  const navigate = useNavigate();

  // Déclaration des états locaux pour l'email, le mot de passe, etc.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null); // Gestion des erreurs de connexion

  // Effet pour vérifier si un utilisateur a déjà enregistré son email et mot de passe
  useEffect(() => {
    // Récupération des informations enregistrées dans le stockage local
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    
    // Si des informations sont retrouvées, les remplir dans le formulaire
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  // Fonction de gestion de la connexion de l'utilisateur
  const handleLogin = async (e) => {
    e.preventDefault();

    // Création de l'objet userInformation pour l'authentification
    const userInformation = { email, password };

    try {
      // Envoi de la requête pour se connecter
      const result = await dispatch(loginUser(userInformation)); 

      // Si la connexion est réussie, on réinitialise le formulaire
      if (result.payload) {
        setEmail('');
        setPassword('');

        // Si l'option "remember me" est activée, on enregistre les informations dans le stockage de session
        if (rememberMe) {
          sessionStorage.setItem('rememberedEmail', email);
          sessionStorage.setItem('rememberedPassword', password);
        }

        // Redirection vers la page utilisateur après la connexion
        navigate('/user');
      }
    } catch (error) {
      // Gestion des erreurs de connexion
      setError('Erreur dans l\'email et/ou le mot de passe');
      console.error(error);
    }
  };

  return (
    <section className="sign-in-content">
      {/* Formulaire de connexion */}
      <form onSubmit={handleLogin}>
        <div>
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
        </div>

        {/* Champ de saisie pour l'email */}
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

        {/* Champ de saisie pour le mot de passe */}
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

        {/* Case à cocher pour mémoriser les informations */}
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        {/* Bouton de soumission du formulaire */}
        <button type="submit" className="sign-in-button">
          Sign In
        </button>

        {/* Affichage des erreurs, si présentes */}
        <div className="error-message">{error}</div>
      </form>
    </section>
  );
}

export default Form;
