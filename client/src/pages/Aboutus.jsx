import React from "react";
import { Users, Target, Award, TrendingUp } from "lucide-react";
import HomeNav from "../components/Home/HomeNav";
import { useTranslation } from "react-i18next";
import Footer from "../components/Home/Footer";

const About = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: t("Ahmed Salah AboShendy"),
      role: t("Full Stack Developer"),
      image: "/images/about/my-img.jpg",
    },
    {
      name: t("about.team.member2.name"),
      role: t("about.team.member2.role"),
      image: "/images/team/member2.jpg",
    },
    {
      name: t("about.team.member3.name"),
      role: t("about.team.member3.role"),
      image: "/images/team/member3.jpg",
    },
    {
      name: t("about.team.member4.name"),
      role: t("about.team.member4.role"),
      image: "/images/team/member4.jpg",
    },
    {
      name: t("about.team.member5.name"),
      role: t("about.team.member5.role"),
      image: "/images/team/member5.jpg",
    },
  ];

  const values = [
    {
      icon: Users,
      title: t("about.values.simplicity.title"),
      description: t("about.values.simplicity.description"),
    },
    {
      icon: Target,
      title: t("about.values.efficiency.title"),
      description: t("about.values.efficiency.description"),
    },
    {
      icon: Award,
      title: t("about.values.quality.title"),
      description: t("about.values.quality.description"),
    },
    {
      icon: TrendingUp,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
  ];

  const stats = [
    { number: t("about.stats.businesses.number"), label: t("about.stats.businesses.label") },
    { number: t("about.stats.uptime.number"), label: t("about.stats.uptime.label") },
    { number: t("about.stats.features.number"), label: t("about.stats.features.label") },
    { number: t("about.stats.support.number"), label: t("about.stats.support.label") },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HomeNav />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-sky-200 to-sky-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-bold text-4xl md:text-5xl text-slate-900 mb-6">
            {t("about.hero.title")}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("about.hero.description")}
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bold text-3xl md:text-4xl text-slate-900 mb-6">
                {t("about.story.title")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("about.story.paragraph1")}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t("about.story.paragraph2")}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md aspect-square rounded-2xl shadow-xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center">
                <Users className="w-32 h-32 text-sky-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-sky-700 to-sky-800 flex items-center justify-center shadow-md mb-6">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-2xl text-slate-900 mb-4">
                {t("about.mission.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("about.mission.description")}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-sky-700 to-sky-800 flex items-center justify-center shadow-md mb-6">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-2xl text-slate-900 mb-4">
                {t("about.vision.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("about.vision.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              {t("about.values.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("about.values.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-sky-700 to-sky-800 flex items-center justify-center shadow-md mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-semibold text-xl text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-sky-950 via-sky-900 to-sky-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="font-bold text-4xl md:text-5xl text-white mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-200 text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              {t("about.team.title")}
            </h2>
            <p className="text-gray-600 text-lg">
              {t("about.team.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-sky-200 to-sky-300 flex items-center justify-center relative">
                  {member.image && !member.image.includes("member") ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="w-20 h-20 text-sky-700" />
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-xl text-slate-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default About;