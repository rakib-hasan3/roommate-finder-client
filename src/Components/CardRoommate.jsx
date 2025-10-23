import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom হতে import
import { AuthContexts } from '../Contexts/AuthContexts';

const CardRoommate = ({ roommate }) => {
  const navigate = useNavigate(); // ✅ ঠিক নাম ব্যবহার
  const { user } = useContext(AuthContexts);

  const handleViewDetails = (id) => { // ✅ typo ঠিক করা
    if (!user) {
      // যদি logged-in না থাকে, login page এ redirect করো
      navigate("/login");
      return;
    }

    // logged-in user হলে view details page এ যাও
    navigate(`/viewdetails/${id}`);
  };

  const { _id, photo, userName, availability, description, rent } = roommate;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-full">
      {/* 🖼️ Image Section */}
      <figure className="h-56 md:h-64 lg:h-72 overflow-hidden">
        <img
          src={photo}
          alt="Roommate"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </figure>

      {/* 📄 Content Section */}
      <div className="card-body p-4 space-y-3">
        <h2 className="card-title text-lg md:text-xl font-bold text-gray-800">
          {userName}
        </h2>

        <p className="text-sm md:text-base text-gray-600">
          {description?.split(" ").slice(0, 25).join(" ")}...
        </p>

        {/* Rent + Availability */}
        <div className="flex justify-between items-center text-sm md:text-base">
          <p className="font-bold text-red-500">Rent: ${rent}</p>
          <span
            className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
              availability === "Available" ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            {availability}
          </span>
        </div>

        {/* Details Button */}
        <button onClick={() => handleViewDetails(_id)} className="btn btn-accent w-full mt-2">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CardRoommate;
