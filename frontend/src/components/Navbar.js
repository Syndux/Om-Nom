import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';




const Navbar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
      Hamburger menu icon for side-menu here
    </div>
  );
}

export default Navbar;