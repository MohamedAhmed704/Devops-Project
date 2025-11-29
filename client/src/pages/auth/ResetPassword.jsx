import { useState } from "react";
import { useSearchParams, Link } from "react-router";
import apiClient from "../../api/apiClient.js";

export default function ResetPassword() {
  const [newPassword, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [params] = useSearchParams();

  const token = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.post("/api/auth/reset-password", {
        token,
        newPassword,
      });

      setMessage("Password reset successful. You can now log in.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F7F7] py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-[#DBE2EF] space-y-6">

        <h2 className="text-center text-3xl font-extrabold text-[#112D4E]">
          Reset Password
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-[#112D4E]">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#DBE2EF] rounded-md bg-[#F9F7F7] text-[#112D4E] focus:outline-none focus:ring-[#3F72AF]"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#112D4E]">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#DBE2EF] rounded-md bg-[#F9F7F7] text-[#112D4E] focus:outline-none focus:ring-[#3F72AF]"
              placeholder="Confirm your password"
            />
          </div>

          {/* Messages */}
          {message && (
            <div className="rounded-md bg-green-50 border border-green-200 p-3">
              <p className="text-sm text-green-800">{message}</p>
            </div>
          )}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md bg-[#19283a] text-white hover:bg-[#274b74] transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

          <p className="text-center text-sm text-[#3F72AF]">
            Back to{" "}
            <Link to="/login" className="font-medium text-[#112D4E] hover:text-[#3F72AF]">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
