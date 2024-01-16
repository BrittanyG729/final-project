import React from 'react'
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-services'

function NavBar(props) {
  // Add in functionality to log out
  function handleLogOut () {
    // Delegate to users-service
    userService.logOut();
    // update state will also cause a re-render
    props.setUser(null);
  }

  return (
    <nav>
        <Link to='/orders'>Order History</Link>
        &nbsp; | &nbsp;
        <Link to='/orders/new'>New Orders</Link>
        &nbsp; | &nbsp;
        <Link to='/checkout'>Checkout</Link>
        &nbsp; | &nbsp;
        <span>Welcome, {props.user.name}</span>
        &nbsp; | &nbsp;
        <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  )
}

export default NavBar