// Importation de React et des hooks nécessaires
import React, { useEffect } from 'react';

// Importation des hooks et fonctions de Redux
import { useSelector, useDispatch } from 'react-redux';

// Importation pour la navigation
import { NavLink } from 'react-router-dom';

// Importation des actions pour gérer l'authentification
import { logout } from '../../redux/authSlice';
import { loadUserProfile } from '../../redux/api';

// Importation du logo
import Logo from '../../assets/img/argentBankLogo.webp';

function Header() {
  // Sélection de l'état global pour obtenir le token et l'utilisateur
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token'); // Suppression du token du stockage local
    dispatch(logout()); // Dispatch de l'action de déconnexion
  };

  // Chargement du profil utilisateur si un token est présent
  useEffect(() => {
    if (token) {
      dispatch(loadUserProfile(token));
    }
  }, [dispatch, token]);

  return (
    <header>
      <nav className="main-nav"> {/* Barre de navigation principale */}
        <NavLink to="/" className="main-nav-logo"> {/* Lien vers la page d'accueil */}
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1> {/* Titre accessible uniquement aux lecteurs d'écran */}
        </NavLink>
        <div> {/* Section de navigation conditionnelle */}
          {token ? (
            // Affichage pour les utilisateurs connectés
            <>
              <NavLink to='/user' className="main-nav-item"> {/* Lien vers la page utilisateur */}
                <i className="fa fa-user-circle"></i>
                {user?.userName}
              </NavLink>

              <NavLink to='/' className="main-nav-item" onClick={handleLogout}> {/* Lien de déconnexion */}
                <i className="fa fa-sign-out"></i>
                Sign Out
              </NavLink>
            </>
          ) : (
            // Affichage pour les utilisateurs non connectés
            <NavLink to="sign-in" className="main-nav-item"> {/* Lien vers la page de connexion */}
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
