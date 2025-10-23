import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate import

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/rKqFHKtZ/bedroom.jpg",
    title: "Find Your Perfect Roommate",
    text: "Search thousands of listings to match your ideal living partner.",
    button: "Get Started",
    link:'/addtofindroommate',
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/LDnrj8vJ/cozy-bedroom.jpg",
    title: "Share a Space, Save More",
    text: "Find affordable shared rooms and make new friends.",
    button: "Browse Listings",
    link:'/addtofindroommate',
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/WNNW9ybh/appartment.jpg",
    title: "Post Your Room Easily",
    text: "Got an empty room? Post your listing in seconds.",
    button: "Add Listing",
    link: '/addtofindroommate',
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate(); // ✅ hook top-level

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center px-10">
            <div className="text-white space-y-4 max-w-lg">
              <h2 className="text-4xl font-bold">{slide.title}</h2>
              <p>{slide.text}</p>
              <button 
                onClick={() => navigate(slide.link)} // ✅ dynamic navigation
                className="bg-blue-600 px-5 py-2 rounded text-white font-medium hover:bg-blue-700"
              >
                {slide.button}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
