// Importation de la librairie Axios pour effectuer des requêtes HTTP
import Axios from 'axios';
// Importation des actions Redux pour mettre à jour le nom d'utilisateur et signaler la connexion réussie
import { updateUserName, loginSuccess } from './authSlice';

// Fonction pour effectuer une connexion d'utilisateur
export const loginUser = (userInformation) => async (dispatch) => {
  // Définir l'URL de l'API pour la connexion
  const url = 'http://localhost:3001/api/v1/user/login';
  // Configuration des en-têtes HTTP pour la requête (type de contenu JSON)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // Envoi d'une requête POST avec les informations utilisateur et la configuration des en-têtes
    const response = await Axios.post(url, userInformation, config);

    // Si la réponse du serveur est réussie (statut 200)
    if (response.status === 200) {
      // Extraction du token d'authentification depuis la réponse
      const token = response.data.body.token;

      // Enregistrer le token dans le sessionStorage (accessible pendant la session de l'utilisateur)
      sessionStorage.setItem('token', token);

      // Déclenche l'action Redux pour indiquer que la connexion a réussi avec le token
      dispatch(loginSuccess(token));

      // Retourner le token dans l'objet de payload pour une utilisation ultérieure
      return { payload: token };
    }
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error(error);
  }
}

// Fonction générique pour effectuer une requête API avec un token d'authentification
export async function apiCallWithToken(dispatch, token, url, config) {
  try {
    // Envoi d'une requête POST avec le token d'authentification dans les en-têtes
    const response = await Axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${token}`, // Utilisation du token dans l'en-tête Authorization
      },
      ...config, // Fusionner les autres paramètres de configuration si nécessaires
    });

    // Si la réponse du serveur est réussie (statut 200)
    if (response.status === 200) {
      // Retourner les données du corps de la réponse
      return response.data.body;
    }
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error(error);
  }
}

// Fonction pour charger le profil utilisateur en utilisant un token
export const loadUserProfile =  (token) => async (dispatch) => {
  // Définir l'URL de l'API pour charger le profil utilisateur
  const url = 'http://localhost:3001/api/v1/user/profile';
  // Configuration des en-têtes HTTP pour inclure le token d'authentification
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // Envoi d'une requête POST pour récupérer le profil utilisateur
    const response = await Axios.post(url, null, config);

    // Si la réponse est réussie (statut 200)
    if (response.status === 200) {
      // Extraction des informations utilisateur (prénom, nom, nom d'utilisateur)
      const { firstName, lastName, userName } = response.data.body;
      // Déclenche l'action Redux pour mettre à jour l'état avec les informations utilisateur
      dispatch(updateUserName({ firstName, lastName, userName}));
    }
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error(error);
  }
}

// Fonction pour modifier le nom d'utilisateur via l'API
export async function editUsernameAPI(token, newUsername, user) {
  try {
    // Définir l'URL de l'API pour mettre à jour le profil utilisateur
    const url = 'http://localhost:3001/api/v1/user/profile';
    // Configuration des en-têtes HTTP pour inclure le token d'authentification et le type de contenu JSON
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    // Corps de la requête avec le nouveau nom d'utilisateur
    const requestBody = {
      userName: newUsername,
    };

    // Envoi d'une requête PUT pour modifier le nom d'utilisateur
    const response = await Axios.put(url, requestBody, config);

    // Si la réponse est réussie (statut 200)
    if (response.status === 200) {
      // Création d'un nouvel objet utilisateur avec le nom d'utilisateur mis à jour
      const updatedUser = {
        ...user, // Copie des données utilisateur existantes
        userName: newUsername, // Mise à jour du nom d'utilisateur
      };
      // Retourner l'utilisateur mis à jour
      return updatedUser;
    }
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error(error);
  }
}
