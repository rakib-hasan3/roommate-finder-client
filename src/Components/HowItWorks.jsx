import React from "react";

const steps = [
  { id: 1, title: "Sign Up", description: "Create your account easily" },
  { id: 2, title: "Browse Listings", description: "Find roommates in your area" },
  { id: 3, title: "Contact", description: "Message your potential roommate" },
  { id: 4, title: "Move In", description: "Enjoy shared living" },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <h2 className="text-4xl  font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-blue-400 text-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-3xl font-bold mb-4">{step.id}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-white font-bold">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
