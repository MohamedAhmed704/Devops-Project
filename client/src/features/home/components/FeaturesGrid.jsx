import { Share2, Users, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

const FeaturesGrid = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <Share2 className="w-6 h-6 text-white" />,
            title: t("home.features.integration.title", "Seamless integration across platforms"),
            description: t("home.features.integration.desc", "Connect everything you use in one unified workspace.")
        },
        {
            icon: <Users className="w-6 h-6 text-white" />,
            title: t("home.features.interface.title", "Intuitive interface for every user"),
            description: t("home.features.interface.desc", "No learning curve - just immediate productivity and clarity.")
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-white" />,
            title: t("home.features.security.title", "Security built into every layer"),
            description: t("home.features.security.desc", "Your data is protected with enterprise-grade encryption.")
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block"
                    >
                        {t("home.features.tagline", "Features")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                    >
                        {t("home.features.headline", "What sets us apart from the rest")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-gray-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        {t("home.features.subheadline", "We combine thoughtful design with powerful functionality. Each feature is built to solve your problems.")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-gray-100 dark:hover:border-slate-700 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 mx-auto bg-[#112D4E] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;
