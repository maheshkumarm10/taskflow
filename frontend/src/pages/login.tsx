import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      setMessage(data?.message || "Login successful");
      localStorage.setItem("userEmail", email);
      navigate("/dashboard");
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
          <h2 className="text-2xl font-semibold text-center text-white">Welcome back</h2>
          <p className="text-sm text-gray-300 mt-1">Sign in to continue to TaskFlow</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full px-4 py-2 border border-[#d4d4d4] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl brand-btn font-semibold hover:opacity-95 transition-all disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-green-600 text-sm">{message}</p>
        )}
        {error && (
          <p className="mt-3 text-center text-red-600 text-sm">{error}</p>
        )}

        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white/90 hover:text-white font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}