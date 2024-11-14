// Importation des modules principaux
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Importation des pages
import Home from '../../pages/home';
import Connexion from '../../pages/connexion';
import User from '../../pages/user';
import Errorpage from '../../pages/errorpage';

// Importation des composants
import Header from '../header';
import Footer from '../footer';
import PrivateRoute from '../privateroute';

function Router() {
  return (
    <div>
        <Header /> {/* En-tête de l'application */}
        <Routes> {/* Définition des routes */}
            <Route path='/' element={<Home />} /> {/* Page d'accueil */}
            <Route path='/sign-in' element={<Connexion />} /> {/* Page de connexion */}
            <Route path='/user' element={ <PrivateRoute element={<User />} /> } /> {/* Page utilisateur protégée */}
            <Route path='*' element={<Errorpage />}  /> {/* Page d'erreur pour les routes non trouvées */}
        </Routes>
        <Footer /> {/* Pied de page */}
    </div>
  );
}

export default Router;
