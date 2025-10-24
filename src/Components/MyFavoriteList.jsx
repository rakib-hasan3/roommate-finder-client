import React, { useEffect, useState } from "react";

const MyFavoriteList = () => {
  const [myList, setMyList] = useState([]);

  // 🔹 Fetch My List from backend
  const fetchMyList = async () => {
    try {
      const res = await fetch("https://roommate-finder-server-site-7ki9.vercel.app/mylist");
      const data = await res.json();
      setMyList(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch My List.");
    }
  };

  useEffect(() => {
    fetchMyList();
  }, []);

  const handleDelete = async (id) => {
  try {
    const res = await fetch(`https://roommate-finder-server-site-7ki9.vercel.app/mylist/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      setMyList(myList.filter(item => item._id.toString() !== id));
      alert(data.message || "Deleted successfully!");
    } else {
      alert(data.message || "Delete failed. Try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Error deleting listing.");
  }
};




  return (
    <div className="p-6">
      <h2 className="text-4xl text-center font-bold mb-8 mt-8">Favorite List</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Rent</th>
              <th className="px-4 py-2">Room Type</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                  No listings found 😔
                </td>
              </tr>
            ) : (
              myList.map((item) => (
                <tr key={item._id} className="border-t text-center hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{item.userName}</td>
                  <td className="px-4 py-2">{item.location || "N/A"}</td>
                  <td className="px-4 py-2">${item.rent}</td>
                  <td className="px-4 py-2">{item.roomType || "N/A"}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    {/* Update button */}
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => alert("Update feature coming soon!")}
                    >
                      Update
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(item._id.toString())}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavoriteList;
