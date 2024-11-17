// Importation des fonctions nécessaires de Redux Toolkit et de Redux Persist
import { configureStore } from '@reduxjs/toolkit'; 
import thunk from 'redux-thunk'; 
import authReducer from './authSlice'; 
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist'; 
import { combineReducers } from '@reduxjs/toolkit'; 

// Configuration de la persistance de l'état
const persistConfig = {
  key: 'root',
  storage, 
};

// Combinaison des réducteurs pour gérer l'authentification
const rootReducer = combineReducers({
  auth: authReducer, 
});

// Applique la persistance à la combinaison des réducteurs
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store Redux avec le réducteur persistant
const store = configureStore({
  reducer: persistedReducer, // Utilisation du réducteur persistant
  middleware: [thunk], 
});

// Création du persistor qui va gérer la persistance des données
const persistor = persistStore(store);


export { store, persistor };
