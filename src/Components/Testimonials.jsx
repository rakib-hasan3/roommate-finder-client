import React from "react";

const testimonials = [
  { id: 1, name: "Sarah J.", text: "Found my perfect roommate within a week! Highly recommend." },
  { id: 2, name: "Mike L.", text: "Sharing a space was so easy thanks to this platform." },
  { id: 3, name: "Emma W.", text: "Quick and simple way to find a compatible roommate." },
];

const Testimonials = () => {
  return (
    <section className="py-12 px-4 mt-14 mb-20">
      <h2 className="text-4xl font-bold text-center mb-10">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-cyan-400 text-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-white font-bold mb-4">"{t.text}"</p>
            <h4 className="font-semibold">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
