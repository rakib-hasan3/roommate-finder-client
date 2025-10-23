import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import NavBar from "./NavBar";
import CardRoommate from "./CardRoommate";
import Slider from "./Slider";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";

const Home = () => {
  const loaderData = useLoaderData();
  const [roommates, setRoommates] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // ✅ loaderData আসলে সেট করা
  useEffect(() => {
    if (Array.isArray(loaderData)) {
      setRoommates(loaderData);
    } else {
      console.error("Loader data is not an array:", loaderData);
      setRoommates([]); // fallback
    }
  }, [loaderData]);

  // ✅ শুধু প্রথমে ৬টা card দেখাবে
  const displayedRoommates = showAll ? roommates : roommates.slice(0, 6);

  return (
    <div className="mt-4 mb-12">
      {/* 🔹 Hero Slider Section */}
      <Slider />

      {/* 🔹 Roommates Section */}
      <div className="mt-20 mb-24">
        <h2 className="text-5xl text-emerald-600 font-bold text-center mb-20">
          Find Your Perfect Match
        </h2>

        {/* ✅ Data আছে কিনা check করা */}
        {Array.isArray(displayedRoommates) && displayedRoommates.length > 0 ? (
          <div className="grid w-full justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-16">
            {displayedRoommates.map((roommate) => (
              <CardRoommate roommate={roommate} key={roommate._id} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No roommates found.
          </p>
        )}

        {/* 🔹 See More Button */}
        {roommates.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowAll(!showAll);
                // যদি Show Less হয়, তাহলে smooth scroll করবে উপরে
                if (showAll) {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
              className="btn btn-primary"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>

      {/* 🔹 Extra Sections */}
      <div>
        <HowItWorks />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
