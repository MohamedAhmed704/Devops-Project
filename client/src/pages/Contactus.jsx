import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import HomeNav from "../features/home/components/HomeNav";
import { useTranslation } from "react-i18next";
import Footer from "../features/home/components/Footer";
import apiClient from "../api/apiClient";
import { motion } from "motion/react";

const ContactUs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/api/contact", formData);

      setLoading(false);
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setLoading(false);
      setError(t("contact.form.errorMessage") || "Failed to send message. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.contactInfo.email.title"),
      value: t("contact.contactInfo.email.value"),
      link: t("contact.contactInfo.email.link"),
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
    {
      icon: Phone,
      title: t("contact.contactInfo.phone.title"),
      value: t("contact.contactInfo.phone.value"),
      link: t("contact.contactInfo.phone.link"),
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
    },
    {
      icon: MapPin,
      title: t("contact.contactInfo.address.title"),
      value: t("contact.contactInfo.address.value"),
      link: null,
      color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
    },
  ];

  const businessHours = [
    { days: t("contact.businessHours.weekdays.days"), hours: t("contact.businessHours.weekdays.hours") },
    { days: t("contact.businessHours.weekends.days"), hours: t("contact.businessHours.weekends.hours") },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-['Outfit']">
      <HomeNav />

      {/* HEADER */}
      <section className="relative py-20 px-6 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bold text-4xl md:text-5xl text-slate-900 dark:text-white mb-6"
          >
            {t("contact.hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            {t("contact.hero.description")}
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <h2 className="font-bold text-2xl md:text-3xl text-slate-900 dark:text-white mb-8">
                {t("contact.form.title")}
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <p className="text-green-700 dark:text-green-300 font-medium">
                    {t("contact.form.successMessage")}
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <p className="text-red-700 dark:text-red-300 font-medium">
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.form.name.label")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#112D4E] dark:focus:ring-blue-500 focus:border-transparent transition outline-none"
                    placeholder={t("contact.form.name.placeholder")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.form.email.label")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#112D4E] dark:focus:ring-blue-500 focus:border-transparent transition outline-none"
                    placeholder={t("contact.form.email.placeholder")}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.form.phone.label")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#112D4E] dark:focus:ring-blue-500 focus:border-transparent transition outline-none"
                    placeholder={t("contact.form.phone.placeholder")}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.form.message.label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#112D4E] dark:focus:ring-blue-500 focus:border-transparent transition resize-none outline-none"
                    placeholder={t("contact.form.message.placeholder")}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-white text-slate-900 border border-slate-200 py-4 px-6 rounded-xl font-bold hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t("contact.form.submit")}
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-10"
            >
              <div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">
                  {t("contact.tagline", "Get in Touch")}
                </span>
                <h2 className="font-bold text-3xl text-slate-900 dark:text-white mb-6">
                  {t("contact.contactInfo.title")}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {t("contact.contactInfo.description")}
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl ${info.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                            {info.title}
                          </h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BUSINESS HOURS */}
              <div className="bg-[#112D4E] dark:bg-slate-800 p-8 rounded-3xl text-white shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <Clock className="w-32 h-32" />
                </div>
                <h3 className="font-bold text-xl mb-6 relative z-10">
                  {t("contact.businessHours.title")}
                </h3>
                <div className="space-y-3 relative z-10 text-blue-100">
                  {businessHours.map((hours, index) => (
                    <div key={index} className="flex justify-between border-b border-blue-800 dark:border-slate-700 pb-3 last:border-0 last:pb-0">
                      <span className="font-medium">{hours.days}</span>
                      <span className="font-bold">{hours.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Start of script to import Clock icon which was missing in imports but used in JSX
import { Clock } from "lucide-react";

export default ContactUs;