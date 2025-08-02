import { useState } from "react";

const burgers = [
  { name: "Classic Burger", price: "$5.99", desc: "Beef, lettuce, tomato, cheese.", img: "/1.jpg" },
  { name: "Double Trouble", price: "$7.99", desc: "Two patties, extra cheese, pickles.", img: "/2.jpg" },
  { name: "Veggie Deluxe", price: "$6.49", desc: "Grilled veggies, lettuce, vegan mayo.", img: "/3.jpg" },
  { name: "Bacon Beast", price: "$8.49", desc: "Crispy bacon, cheddar, and BBQ sauce.", img: "/4.jpg" },
  { name: "Spicy Inferno", price: "$7.25", desc: "Jalapeños, spicy sauce, pepper jack cheese.", img: "/5.jpg" },
  { name: "Mushroom Melt", price: "$6.99", desc: "Sautéed mushrooms, Swiss cheese, garlic aioli.", img: "/6.jpg" },
  { name: "Hawaiian Burger", price: "$7.75", desc: "Grilled pineapple, teriyaki glaze, ham.", img: "/7.jpg" },
  { name: "Blue Cheese Bomb", price: "$8.10", desc: "Blue cheese, arugula, caramelized onions.", img: "/8.jpg" },
];

const Menu = () => {
  const [selected, setSelected] = useState<null | typeof burgers[0]>(null);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-white to-orange-50 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">🍔 Our Signature Burgers</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {burgers.map((item, i) => (
            <div
              key={i}
              onClick={() => setSelected(item)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition hover:scale-[1.02] cursor-pointer"
            >
              <img src={item.img} alt={item.name} className="w-full h-40 object-cover group-hover:scale-105 transition" />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.desc}</p>
                <span className="text-lg font-bold text-red-500">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-lg animate-fade-in">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <img src={selected.img} alt={selected.name} className="rounded-xl w-full h-64 object-cover mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{selected.name}</h3>
            <p className="text-gray-600 mb-3">{selected.desc}</p>
            <div className="text-xl font-bold text-red-500 mb-6">{selected.price}</div>
            <button
              onClick={() => setShowLogin(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLogin && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 animate-slide-in relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Order</h3>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
