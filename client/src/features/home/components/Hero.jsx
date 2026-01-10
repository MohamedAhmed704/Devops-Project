import { useState } from "react";
import computer from "/images/home/computer.jpg";
import { Link } from "react-router";
import { PlayCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const Hero = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoUrl = "https://www.youtube.com/embed/YoAynDdkeCA?si=HG7Q47tEBZKp_es2";

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 pt-16 pb-20 lg:pt-24 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-sky-50/50 dark:bg-slate-800/30 blur-3xl -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-100 dark:border-slate-700"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          v2.0 is now live
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-6"
        >
          {t("hero.title.line1")} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#112D4E] to-blue-500 dark:from-white dark:to-gray-400">
            {t("hero.title.highlight")}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto px-10 py-3.5 rounded-lg font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            {t("hero.buttons.getStarted")}
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-10 py-3.5 rounded-lg font-semibold bg-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            {t("hero.buttons.watchDemo")}
          </button>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Decorative Elements */}
          <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 dark:opacity-40 animate-pulse"></div>

          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700 aspect-[16/9] flex items-center justify-center bg-gray-50 dark:bg-slate-900 group">
            <img src="images/home/DashboardPreview.png" alt="Dashboard Preview" />
          </div>
        </motion.div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition cursor-pointer"
            >
              <X size={24} />
            </button>

            <div className="aspect-video w-full">
              <iframe
                src={videoUrl}
                title="Demo Video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;