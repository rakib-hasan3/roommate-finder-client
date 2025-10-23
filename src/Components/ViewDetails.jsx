import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MapPin, DollarSign, Phone, User, Heart } from "lucide-react";
import { AuthContexts } from "../Contexts/AuthContexts";

const ViewDetails = () => {
  const roommate = useLoaderData();
  const navigate = useNavigate();
  

  const { photo, userName, availability, description, rent, location, contact } = roommate;

  // 🧩 Handle Add to My List
  const handleAddToList = async () => {
  try {
    const res = await fetch('http://localhost:3000/mylist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roommate),
    });

    const data = await res.json();
    if (res.status === 400) {
      alert(data.message); // Already added
    } else {
      alert("Added to My List!");
      navigate("/mylist");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to add to My List.");
  }
};


  return (
    <div className="max-w-6xl mx-auto px-5 py-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      
      {/* 🖼️ Profile Card */}
      <div className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
        <img
          src={photo}
          alt={userName}
          className="w-full h-60 object-cover"
        />
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <User className="text-blue-500" size={20} />
              {userName}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                availability === "Available" ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              {availability}
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            A friendly roommate looking for a neat and cozy living experience.
          </p>
          {/* ➕ Add to My List Button */}
          <button
            onClick={handleAddToList}
            className="btn btn-accent w-full flex items-center justify-center gap-2"
          >
            <Heart size={18} /> Add to My List
          </button>
        </div>
      </div>

      {/* 💰 Rent Card */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100">
        <DollarSign className="text-red-500 mb-3" size={32} />
        <h3 className="text-lg font-semibold text-gray-800">Rent Information</h3>
        <p className="text-sm text-gray-500 mt-1">Monthly Rent</p>
        <p className="text-2xl font-bold text-red-500 mt-2">${rent}</p>
      </div>

      {/* 📍 Location Card */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100">
        <MapPin className="text-blue-500 mb-3" size={32} />
        <h3 className="text-lg font-semibold text-gray-800">Location</h3>
        <p className="text-sm text-gray-500 mt-1">Located at</p>
        <p className="text-gray-700 font-medium mt-2">{location || "Not Provided"}</p>
      </div>

      {/* ☎️ Contact Card */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100">
        <Phone className="text-green-500 mb-3" size={32} />
        <h3 className="text-lg font-semibold text-gray-800">Contact Info</h3>
        <p className="text-gray-700 mt-2">{contact || "No contact info available"}</p>
      </div>

      {/* 📝 Description Card */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:col-span-2 lg:col-span-3 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          {description || "No detailed description provided for this listing."}
        </p>
      </div>
    </div>
  );
};

export default ViewDetails;
