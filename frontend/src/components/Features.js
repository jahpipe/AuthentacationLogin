import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const features = [
    { title: "Fresh Ingredients", desc: "Only the freshest veggies and meats." },
    { title: "Fast Delivery", desc: "Get your burger hot and fast." },
    { title: "Tasty Options", desc: "Tons of choices for every craving." },
];
const Features = () => (_jsxs("section", { className: "p-8 bg-black/40 backdrop-blur-lg rounded-xl shadow-lg", children: [_jsx("h3", { className: "text-3xl font-bold text-yellow-300 mb-6", children: "Why Choose Us?" }), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: features.map((f, i) => (_jsxs("div", { className: "p-6 bg-black/50 backdrop-blur rounded-lg shadow text-white", children: [_jsx("h4", { className: "text-xl font-semibold text-yellow-200", children: f.title }), _jsx("p", { className: "mt-2 text-gray-300", children: f.desc })] }, i))) })] }));
export default Features;
