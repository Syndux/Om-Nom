import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navbar.css';

function Navbar({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="flex justify-between items-center m-2">
      <div>
        <NavLink exact to="/">Om Nom</NavLink>
      </div>
      <div>
        
      </div>

    </div>
  );
}

export default Navbar;