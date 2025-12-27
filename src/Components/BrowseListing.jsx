import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import AllCardRoommate from './AllCardRoommate';

const BrowseListing = () => {
  // ১. সেফটি চেক: যদি ডেটা না থাকে তবে যেন খালি অ্যারে সেট হয়
  const loaderData = useLoaderData();
  const broommates = Array.isArray(loaderData) ? loaderData : [];

  const [showAll, setShowAll] = useState(false);

  // ২. শুধু প্রথমে ৬টা দেখাবে, পরে সব
  const displayedRoommates = showAll ? broommates : broommates.slice(0, 6);

  return (
    <div className="mt-20 mb-20 px-4">
      {/* 🔹 Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3">
          Browse All Roommate Listings
        </h2>
        <p className="text-gray-600 mb-10">
          Explore available rooms and find your perfect match.
        </p>
      </div>

      {/* 🔹 Grid Layout */}
      {/* যদি কোনো ডেটা না থাকে তবে মেসেজ দেখাবে */}
      {broommates.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No listings found.</p>
      ) : (
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:px-20">
          {/* এখানে broommates এর বদলে displayedRoommates ব্যবহার করতে হবে */}
          {displayedRoommates.map((roommate) => (
            <AllCardRoommate
              roommate={roommate}
              key={roommate._id || roommate.id} // ID চেক
            />
          ))}
        </div>
      )}

      {/* 🔹 See More / See Less Button */}
      {/* লজিক: যদি মোট লিস্ট ৬ এর বেশি হয় তবেই বাটনটি দেখাবে */}
      {broommates.length > 6 && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-primary px-8"
          >
            {showAll ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowseListing;