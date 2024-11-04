import Axios from 'axios';
import { updateUserName, loginSuccess } from './authSlice';



// Fonction pour effectuer une connexion
export const loginUser = (userInformation) => async (dispatch) => {
  

    const url = 'http://localhost:3001/api/v1/user/login';
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await Axios.post(url, userInformation, config);
  
      if (response.status === 200) {
        const token = response.data.body.token;
  
        sessionStorage.setItem('token', token);
        dispatch(loginSuccess(token));
  
        return { payload: token };
      }
    } catch (error) {
      console.error(error);
    }
  }


export async function apiCallWithToken(dispatch, token, url, config) {
  try {
    const response = await Axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...config,
    });

    if (response.status === 200) {
      return response.data.body;
    }
  } catch (error) {
    console.error(error);
  }
}


 
// Fonction pour charger le profil utilisateur
export const loadUserProfile =  (token) => async (dispatch) => {
    const url = 'http://localhost:3001/api/v1/user/profile';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await Axios.post(url, null, config);
  
      if (response.status === 200) {
        const { firstName, lastName, userName } = response.data.body;
        dispatch(updateUserName({ firstName, lastName, userName}));

      }
    } catch (error) {
      console.error(error);
    }
  }


  export async function editUsernameAPI(token, newUsername, user) {
    try {
      const url = 'http://localhost:3001/api/v1/user/profile';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const requestBody = {
        userName: newUsername,
      };
  
      const response = await Axios.put(url, requestBody, config);
  
      if (response.status === 200) {
        const updatedUser = {
          ...user, 
          userName: newUsername, 
        };
        return updatedUser;
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  


