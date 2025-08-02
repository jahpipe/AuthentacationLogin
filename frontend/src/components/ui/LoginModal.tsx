interface Props {
  onClose: () => void;
}

const LoginModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
          >
            Sign In
          </button>
        </form>
        <button
          className="mt-4 text-sm text-gray-600 hover:underline block mx-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
