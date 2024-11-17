// Importation de la fonction createSlice depuis la bibliothèque Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Création d'un slice appelé "auth" pour gérer l'état d'authentification
const authSlice = createSlice({
  name: 'auth', 
  initialState: { 
    user: { 
      firstName: '', 
      lastName: '',  
      userName: '',  
    },
    token: null, // Token d'authentification (initialisé à null)
    error: null, // Erreur potentielle (initialisée à null)
  },
  reducers: { // Définition des actions qui modifient l'état
    // Action appelée lors d'un succès de connexion
    loginSuccess: (state, action) => {
      state.token = action.payload; 
      state.error = null; 
    },
    // Action appelée lors d'un échec de connexion
    loginFailure: (state, action) => {
      state.token = null; 
      state.error = action.payload; 
    },
    // Action appelée lors de la déconnexion
    logout: (state) => {
      state.token = null; // Réinitialise le token
      state.error = null; // Réinitialise l'erreur
    },
    // Action appelée pour mettre à jour les informations de l'utilisateur
    updateUserName: (state, action) => {
      state.user.firstName = action.payload.firstName; 
      state.user.lastName = action.payload.lastName;   
      state.user.userName = action.payload.userName;  
    },
  },
});


export const { loginSuccess, loginFailure, logout, updateUserName } = authSlice.actions;


export default authSlice.reducer;
