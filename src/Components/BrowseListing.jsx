import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import AllCardRoommate from './AllCardRoommate';

const BrowseListing = () => {
  const broommates = useLoaderData();
  const [showAll, setShowAll] = useState(false);

  // শুধু প্রথমে ৬টা দেখাবে, পরে সব
  const displayedRoommates = showAll ? broommates : broommates.slice(0, 6);

  return (
    <div className="mt-20 mb-20">
      {/* 🔹 Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3">
          Browse All Roommate Listings
        </h2>
        <p className="text-gray-600 mb-20">
          Explore available rooms and find your perfect match.
        </p>
      </div>

      {/* 🔹 Grid Layout */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20 lg:p-20">
        {displayedRoommates.map((roommate) => (
          <AllCardRoommate
            roommate={roommate}
            key={roommate._id}
          ></AllCardRoommate>
        ))}
      </div>

      {/* 🔹 See More / See Less Button */}
      {broommates.length > 6 && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-primary"
          >
            {showAll ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowseListing;
