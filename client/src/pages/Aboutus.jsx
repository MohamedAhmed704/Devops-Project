import { Users, Target, Award, TrendingUp } from "lucide-react";
import HomeNav from "../features/home/components/HomeNav";
import { useTranslation } from "react-i18next";
import Footer from "../features/home/components/Footer";
import { motion } from "motion/react";

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Users,
      title: t("about.values.simplicity.title"),
      description: t("about.values.simplicity.description"),
      color: "bg-blue-500",
    },
    {
      icon: Target,
      title: t("about.values.efficiency.title"),
      description: t("about.values.efficiency.description"),
      color: "bg-purple-500",
    },
    {
      icon: Award,
      title: t("about.values.quality.title"),
      description: t("about.values.quality.description"),
      color: "bg-amber-500",
    },
    {
      icon: TrendingUp,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-['Outfit']">
      <HomeNav />

      {/* HERO SECTION */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-300 text-sm font-semibold mb-6 border border-blue-100 dark:border-slate-700"
          >
            {t("nav.about", "About Us")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-bold text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white mb-6 leading-tight"
          >
            {t("about.hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            {t("about.hero.description")}
          </motion.p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mb-6">
                {t("about.story.title")}
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{t("about.story.paragraph1")}</p>
                <p>{t("about.story.paragraph2")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 transform rotate-3"></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-700">
                <img src="/images/about/team.jpeg" alt="Team" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mb-4">
              {t("about.values.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t("about.values.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-100 dark:hover:border-slate-700"
                >
                  <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center shadow-lg mb-6`}>
                    <Icon className="text-white w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;