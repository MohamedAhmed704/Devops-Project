import { Link } from "react-router";
import { Menu, LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const HomeNav = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="w-28 h-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Show Dashboard button if logged in, otherwise Login/Register */}
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-[#112D4E] text-white px-5 py-2 rounded-xl hover:bg-[#0c2237] transition font-medium shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 text-[#112D4E] font-medium hover:text-[#0b1c2c] transition"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 bg-[#112D4E] text-white px-5 py-2 rounded-xl hover:bg-[#0c2237] transition font-medium shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <Menu className="w-6 h-6 text-[#112D4E]" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-3 flex flex-col gap-3 animate-fadeIn">
          <Link
            to="/login"
            className="flex items-center gap-2 text-[#112D4E] font-medium hover:text-[#0b1c2c] transition"
            onClick={() => setOpen(false)}
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 bg-[#112D4E] text-white px-5 py-2 rounded-xl hover:bg-[#0c2237] transition font-medium shadow-sm"
            onClick={() => setOpen(false)}
          >
            <UserPlus className="w-4 h-4" />
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HomeNav;
