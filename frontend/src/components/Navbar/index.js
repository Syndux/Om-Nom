import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navbar.css';

function Navbar({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
      Hamburger menu icon for side-menu here
    </div>
  );
}

export default Navbar;