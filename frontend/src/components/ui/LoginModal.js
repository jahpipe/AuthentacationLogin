import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const LoginModal = ({ onClose }) => {
    return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black/50 z-50", children: _jsxs("div", { className: "bg-white p-8 rounded-lg w-full max-w-md shadow-xl", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-red-600 text-center", children: "Login" }), _jsxs("form", { className: "space-y-4", children: [_jsx("input", { type: "email", placeholder: "Email", className: "w-full p-3 border rounded" }), _jsx("input", { type: "password", placeholder: "Password", className: "w-full p-3 border rounded" }), _jsx("button", { type: "submit", className: "w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition", children: "Sign In" })] }), _jsx("button", { className: "mt-4 text-sm text-gray-600 hover:underline block mx-auto", onClick: onClose, children: "Cancel" })] }) }));
};
export default LoginModal;
