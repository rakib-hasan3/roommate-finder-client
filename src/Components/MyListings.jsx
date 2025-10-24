import React, { useContext, useEffect, useState } from "react";
import { AuthContexts } from "../Contexts/AuthContexts";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user,loading } = useContext(AuthContexts);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  // 🔒 Protected route check
  useEffect(() => {
      if (loading) return; // wait until firebase checks auth
    if (!user) {
      navigate("/login");
      return;
    }
    // 🧠 Fetch logged-in user's own listings
    fetch(`https://roommate-finder-server-site-7ki9.vercel.app/ownlistings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, [user, navigate]);

  // ❌ Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://roommate-finder-server-site-7ki9.vercel.app/ownlistings/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setListings(listings.filter((listing) => listing._id !== id));
              Swal.fire("Deleted!", "Your listing has been deleted.", "success");
            }
          });
      }
    });
  };

  // ✏️ Handle update
  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // update route e pathabe
  };

  if (!user) {
    return null; // prevent flicker before redirect
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-20 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-6">
        My Listings
      </h2>

      {listings.length === 0 ? (
 <span className="loading loading-spinner loading-lg text-red-500"></span>      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 text-center">
            <thead className="bg-red-100">
              <tr>
                <th className="border px-4 py-2">Photo</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Rent</th>
                <th className="border px-4 py-2">Room Type</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item._id} className="hover:bg-red-50">
                  <td className="border px-4 py-2">
                    <img
                      src={item.photo}
                      alt="Room"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{item.location}</td>
                  <td className="border px-4 py-2">${item.rent}</td>
                  <td className="border px-4 py-2">{item.roomType}</td>
                  <td className="border px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 m-4 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 m-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyListings;
