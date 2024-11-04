import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink,  } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { loadUserProfile } from '../../redux/api';
import Logo from '../../assets/img/argentBankLogo.webp';

function Header() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  useEffect(() => {
    if(token) {
        dispatch(loadUserProfile(token))
        }
     
   }, [dispatch, token]); 
  return (
    <header>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          {token ? (
            <>

              <NavLink to='/user' className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {user?.userName}
              </NavLink> 

              <NavLink to ='/' className="main-nav-item" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                Sign Out
              </NavLink>
                   
            </>
          ) : (
            <NavLink to="sign-in" className="main-nav-item">
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
