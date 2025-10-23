import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContexts } from "../Contexts/AuthContexts";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const NavBar = () => {
  const location = useLocation();
    const navigate = useNavigate();

  const { user } = useContext(AuthContexts);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.log("Logout Error:", error);
      });
  };

   const handleNavClick = (path) => {
    if (!user) {
      // যদি logged-in না থাকে, তাহলে login page এ পাঠাও
      navigate("/login");
    } else {
      navigate(path);
    }
  };


  const navItems = [
    { name: "Home", path: "/" },
    { name: "Add to Find Roommate", path: "/addtofindroommate" },
    { name: "Browse Listing", path: "/browselisting" },
    { name: "Favorite", path: "/myList" },
    { name: "My Listings", path: "/ownlistings" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* Dropdown menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm font-bold dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                 onClick={() => handleNavClick(item.path)}
                  to={item.path}
                  className={`hover:text-red-600 ${
                    location.pathname === item.path
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <a className="btn btn-ghost text-xl text-red-500 font-bold">
          RoomMate Finder
        </a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu gap-5 font-bold menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`hover:text-red-600 ${
                  location.pathname === item.path
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleLogout}
            className="btn bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn bg-red-500 text-white hover:bg-red-600">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
