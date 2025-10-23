import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContexts } from "../Contexts/AuthContexts";

const AddToFindRoommate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 🧠 catch ID if in edit mode
  const { user } = useContext(AuthContexts);

  const [formData, setFormData] = useState({
    photo: "",
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
    userName: user?.displayName || "",
    userEmail: user?.email || "",
  });

  // 🧠 if editing existing listing, fetch old data
  useEffect(() => {
    if (id) {
      fetch(`https://roommate-finder-server-site-two.vercel.app/ownlistings/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            ...data,
            lifestyle: data.lifestyle || { pets: false, smoking: false, nightOwl: false },
          });
        });
    }
  }, [id]);

  // 🧠 Handle form input
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name in formData.lifestyle) {
      setFormData({
        ...formData,
        lifestyle: { ...formData.lifestyle, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🧠 Submit handler — add or update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // ✅ UPDATE mode
      fetch(`https://roommate-finder-server-site-two.vercel.app/ownlistings/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/ownlistings"));
        });
    } else {
      // ✅ ADD mode
      fetch("https://roommate-finder-server-site-two.vercel.app/addtofindroommate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            title: "Submitted Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/browselisting"));
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {id ? "Update Roommate Listing" : "Add a Roommate Listing"}
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* photo url */}
        <div>
          <label className="block font-medium mb-1">Photo URL</label>
          <input
            type="url"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="link"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Dhaka City"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* rent */}
        <div>
          <label className="block font-medium mb-1">Rent</label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            placeholder="800"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* roomType */}
        <div>
          <label className="block font-medium mb-1">Room Type</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Single</option>
            <option>Shared</option>
            <option>Studio</option>
          </select>
        </div>

        {/* description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        {/* contact */}
        <div>
          <label className="block font-medium mb-1">Contact Info</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Phone or WhatsApp"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* user info */}
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

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddToFindRoommate;
