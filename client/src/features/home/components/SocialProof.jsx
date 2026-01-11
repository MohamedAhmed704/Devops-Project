import { Clock, TrendingUp, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const SocialProof = () => {
    const { t } = useTranslation();

    const benefits = [
        {
            icon: <Clock className="w-8 h-8 text-[#112D4E] dark:text-blue-400" />,
            title: t("home.social.benefit1.title", "Save time and reduce complexity"),
            description: t("home.social.benefit1.desc", "Streamline operations and focus on what truly drives growth.")
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-[#112D4E] dark:text-blue-400" />,
            title: t("home.social.benefit2.title", "Scale with confidence and ease"),
            description: t("home.social.benefit2.desc", "Grow your business without infrastructure headaches.")
        },
        {
            icon: <Headphones className="w-8 h-8 text-[#112D4E] dark:text-blue-400" />,
            title: t("home.social.benefit3.title", "Expert support when you need it most"),
            description: t("home.social.benefit3.desc", "Our team stands ready to help you succeed.")
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block"
                    >
                        {t("home.social.tagline", "Credits")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                    >
                        {t("home.social.headline", "Why businesses choose Tadbir")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-gray-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        {t("home.social.subheadline", "We deliver more than software. We deliver peace of mind and measurable results that matter.")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="mb-6 p-4 bg-blue-50 dark:bg-slate-700/50 rounded-full">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 dark:text-slate-400">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
