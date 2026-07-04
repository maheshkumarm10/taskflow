import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      }

      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-md w-full card-smooth shadow-xl rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 brand-gradient rounded-3xl flex items-center justify-center text-white font-extrabold text-2xl mb-3">TF</div>
          <h2 className="text-2xl font-semibold text-center text-white">Create your account</h2>
          <p className="text-sm text-gray-300 mt-1">Join TaskFlow to manage tasks with focus</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-white text-left">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(79,70,229,0.6)]"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(79,70,229,0.6)]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(79,70,229,0.6)]"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white text-left">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(79,70,229,0.6)]"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl brand-btn font-semibold hover:opacity-95 transition-all"
            disabled={loading}
          >
            {loading ? "Registering..." : "Create account"}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-center text-red-600 text-sm">{error}</p>
        )}

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white/90 hover:text-white font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

