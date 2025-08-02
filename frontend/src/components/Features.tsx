const features = [
  { title: "Fresh Ingredients", desc: "Only the freshest veggies and meats." },
  { title: "Fast Delivery", desc: "Get your burger hot and fast." },
  { title: "Tasty Options", desc: "Tons of choices for every craving." },
];

const Features = () => (
  <section className="p-8 bg-black/40 backdrop-blur-lg rounded-xl shadow-lg">
    <h3 className="text-3xl font-bold text-yellow-300 mb-6">Why Choose Us?</h3>
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div key={i} className="p-6 bg-black/50 backdrop-blur rounded-lg shadow text-white">
          <h4 className="text-xl font-semibold text-yellow-200">{f.title}</h4>
          <p className="mt-2 text-gray-300">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
