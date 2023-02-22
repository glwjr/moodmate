/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

function Navbar() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const isLoggedIn = !!auth.id;

  const handleClick = () => dispatch(logout());

  return (
    <div>
      <h1>MoodMate</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/entries">Entries</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
}

export default Navbar;
