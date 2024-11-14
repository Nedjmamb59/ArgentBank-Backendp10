// Importation des fonctions nécessaires de Redux Toolkit et de Redux Persist
import { configureStore } from '@reduxjs/toolkit'; // Fonction pour configurer un store Redux
import thunk from 'redux-thunk'; // Middleware permettant de gérer des actions asynchrones
import authReducer from './authSlice'; // Le réducteur pour la gestion de l'authentification
import storage from 'redux-persist/lib/storage'; // Utilisation du stockage local pour persister les données
import { persistStore, persistReducer } from 'redux-persist'; // Fonctionnalités de Redux Persist pour persister l'état du store
import { combineReducers } from '@reduxjs/toolkit'; // Permet de combiner plusieurs réducteurs en un seul

// Configuration de la persistance de l'état
const persistConfig = {
  key: 'root', // La clé de persistance, ici 'root', utilisée dans le stockage local
  storage, // Le type de stockage, ici le localStorage
};

// Combinaison des réducteurs pour gérer l'authentification
const rootReducer = combineReducers({
  auth: authReducer, // Le réducteur auth gère l'état de l'authentification
});

// Applique la persistance à la combinaison des réducteurs
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store Redux avec le réducteur persistant
const store = configureStore({
  reducer: persistedReducer, // Utilisation du réducteur persistant
  middleware: [thunk], // Ajout du middleware thunk pour gérer les actions asynchrones
});

// Création du persistor qui va gérer la persistance des données
const persistor = persistStore(store);

// Exportation du store et du persistor pour être utilisés ailleurs dans l'application
export { store, persistor };
