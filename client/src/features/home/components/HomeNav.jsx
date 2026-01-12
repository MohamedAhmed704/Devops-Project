import { Link } from "react-router";
import { Menu, LogIn, UserPlus, Moon, Sun, LayoutDashboard, X, Search, Phone } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contexts/AuthContext";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

const HomeNav = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={theme === "light" ? "/icons/lightLogo.webp" : "/icons/darkLogo.webp"}
            alt={t("nav.logoAlt")}
            className="lg:w-32 w-24 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <div className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-gray-600 dark:text-slate-300 hover:text-[#112D4E] dark:hover:text-white transition font-medium text-sm lg:text-base relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-[#112D4E] dark:after:bg-white after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 dark:text-slate-300 hover:text-[#112D4E] dark:hover:text-white transition font-medium text-sm lg:text-base relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-[#112D4E] dark:after:bg-white after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              {t("nav.contact")}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-[#112D4E] dark:hover:text-white transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-2"></div>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-black/70 hover:text-black duration-300 transition-all   border-gray-300 dark:border-slate-700 dark:text-white/70 px-6 py-2.5 rounded-xl font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" />
              {t("navDashboard")}
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium hover:text-slate-900 dark:hover:text-white transition"
              >
                <LogIn className="w-4 h-4" />
                {t("nav.login")}
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-semibold shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                {t("nav.getStarted")}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {!open ? (
            <Menu className="w-6 h-6 text-[#112D4E] dark:text-white" />
          ) : (
            <X className="w-6 h-6 text-[#112D4E] dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 absolute w-full left-0 px-6 py-6 flex flex-col gap-4 shadow-xl animate-fadeIn">

          <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-slate-800">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 px-3 py-2 transition"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span className="font-medium">{t("theme")}</span>
            </button>
            <LanguageSwitcher />
          </div>


          {/* Mobile Links */}
          <div className="flex flex-col gap-2">
            <Link
              to="/about"
              className="flex items-center gap-3 p-3 rounded-xl text-slate-700 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-[#112D4E] dark:hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              <Search className="w-5 h-5" />
              {t("nav.about")}
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-3 p-3 rounded-xl text-slate-700 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-[#112D4E] dark:hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              <Phone className="w-5 h-5" />
              {t("nav.contact")}
            </Link>
          </div>

          <div className="h-px bg-gray-100 dark:bg-slate-800 my-2"></div>

          {!isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-[#112D4E] dark:text-white font-semibold p-3 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                onClick={() => setOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                {t("nav.login")}
              </Link>

              <Link
                to="/register"
                className="flex items-center justify-center gap-2 bg-[#112D4E] dark:bg-white text-white dark:text-[#112D4E] px-5 py-3 rounded-xl font-bold shadow-lg"
                onClick={() => setOpen(false)}
              >
                <UserPlus className="w-4 h-4" />
                {t("nav.getStarted")}
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 bg-[#112D4E] dark:bg-white text-white dark:text-[#112D4E] px-5 py-3 rounded-xl font-bold shadow-lg"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard className="w-4 h-4" />
              {t("navDashboard")}
            </Link>
          )}

        </div>
      )
      }
    </nav >
  );
};

export default HomeNav;
