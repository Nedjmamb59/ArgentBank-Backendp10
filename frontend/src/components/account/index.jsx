import React, { useEffect, useState } from 'react'; // Importation de React et des hooks nécessaires
import { useSelector, useDispatch } from 'react-redux'; // Importation des hooks Redux
import { updateUserName } from '../../redux/authSlice'; // Importation de l'action pour mettre à jour le nom d'utilisateur
import { editUsernameAPI, loadUserProfile } from '../../redux/api'; // Importation des fonctions API

function Account() {
  const token = useSelector((state) => state.auth.token); // Sélectionne le token d'authentification
  const user = useSelector((state) => state.auth.user); // Sélectionne l'utilisateur authentifié
  const dispatch = useDispatch(); // Initialisation de la fonction dispatch
  const [isEditing, setIsEditing] = useState(false); // État pour gérer le mode édition

  const [newUsername, setNewUsername] = useState(user.userName); // État pour le nouveau nom d'utilisateur

  useEffect(() => {
    if (token) {
      loadUserProfile(dispatch, token); // Chargement du profil utilisateur si le token est présent
    }
    setNewUsername(user.userName); // Mise à jour du nom d'utilisateur
  }, [dispatch, token, user.userName]);

  const saveUsername = async () => {
    const updatedUser = await editUsernameAPI(token, newUsername, user); // Appel de l'API pour éditer le nom d'utilisateur

    if (updatedUser) {
      dispatch(updateUserName(updatedUser)); // Mise à jour du nom dans le store Redux
      setIsEditing(false); // Sortie du mode édition
    }
  };

  return (
    <main> {/* Conteneur principal de la page */}
      {isEditing ? ( // Conditionnel pour afficher le formulaire de modification */
        <div className="header-editname">
          <div>
            <h1>Edit user info</h1> {/* Titre du formulaire */}
            <form>
              <div className="input-wrapper">
                <label htmlFor="username">User name</label>
                <input
                  type="text"
                  id="username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" value={user?.firstName} className="label-gray" />
              </div>

              <div className="input-wrapper">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" value={user?.lastName} className="label-gray" />
              </div>
            </form>
            <button type="submit" className="header-button" onClick={saveUsername}>
              Save
            </button>
            <button type="button" className="header-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="header"> {/* Affichage de l'en-tête si non en mode édition */}
          <h1>
            Welcome back <br /> {user?.firstName} {user?.lastName}!
          </h1>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        </div>
      )}
    </main>
  );
}

export default Account;
