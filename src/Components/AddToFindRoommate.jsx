import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddToFindRoommate = () => {



     const handleSubmit = e =>{
        e.preventDefault();
        const form =e.target;
        const formData = new FormData(form);
        const roommateData = Object.fromEntries(formData.entries());
        console.log(roommateData) 

        // send signup data to the database(db)
           fetch('http://localhost:3000/addtofindroommate',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(roommateData)
           })
           .then(res=>res.json())
           .then(data=>{
            console.log('after adding data :',data);
            Swal.fire({
                    title: "Submitted Successfully",
                    icon: "success",
                    draggable: true
                });
           })


        }     

     const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    roomType: "Single",
    lifestyle: {
      pets: false,
      smoking: false,
      nightOwl: false,
    },
    description: "",
    contact: "",
    availability: "Available",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
  });

  const handleChange = (e) => {
    const { name, value,   checked } = e.target;

    if (name in formData.lifestyle) {
      setFormData({
        ...formData,
        lifestyle: { ...formData.lifestyle, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a Roommate Listing</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Looking for a roommate in NYC"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="New York City"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rent */}
        <div>
          <label className="block font-medium mb-1">Rent Amount</label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            placeholder="800"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="block font-medium mb-1">Room Type</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Single</option>
            <option>Shared</option>
            <option>Studio</option>
          </select>
        </div>

        {/* Lifestyle Preferences */}
        <div>
          <label className="block font-medium mb-1">Lifestyle Preferences</label>
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="pets"
                checked={formData.lifestyle.pets}
                onChange={handleChange}
              />
              Pets
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="smoking"
                checked={formData.lifestyle.smoking}
                onChange={handleChange}
              />
              Smoking
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="nightOwl"
                checked={formData.lifestyle.nightOwl}
                onChange={handleChange}
              />
              Night Owl
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe yourself and expectations..."
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Contact */}
        <div>
          <label className="block font-medium mb-1">Contact Info</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Phone or WhatsApp"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block font-medium mb-1">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Available</option>
            <option>Not Available</option>
          </select>
        </div>

        {/* User Name (Read Only) */}
        <div>
          <label className="block font-medium mb-1">User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* User Email (Read Only) */}
        <div>
          <label className="block font-medium mb-1">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit 
          </button>
        </div>
      </form>
    </div>
  );
};


export default AddToFindRoommate;