import React from 'react';
import {   Link,   Navigate } from 'react-router';

const NavBar = () => {
    const navlink = [
        <Link className='  hover:text-red-600  ' to='/'>Home</Link>,
        <Link className='  hover:text-red-600  '  to='addtofindroommate'>Add to Find Roommate</Link>,
        <Link className='  hover:text-red-600  '  to=''>Browse Listing </Link>,
        <Link className='  hover:text-red-600  '  to=''>My Listings </Link>
        
    ]

   const handleLogin=()=>{
         console.log("Login button clicked!");
         
    }
    return (
       <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm font-bold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
         {navlink}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center  hidden lg:flex">
    <ul className="menu gap-15   font-bold menu-horizontal px-1">
       {navlink}
    </ul>
  </div>
  <div  onClick={handleLogin} className="navbar-end">
   <Link to='/login'> <a className="btn"  >Login</a></Link>
  </div>
</div>
    );
};

export default NavBar;