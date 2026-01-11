import Button from "../../../utils/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Branding = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-linear-to-r from-sky-100 dark:from-sky-950 to-sky-100 dark:to-sky-900 py-20">
      <div className="text-center px-6 max-w-4xl mx-auto">
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#112D4E] dark:text-sky-200 leading-tight">
          {t("ready to transform your workforce management")}
        </h2>

        {/* SUBTEXT */}
        <p className="mt-4 text-[#3F72AF] dark:text-sky-300 text-base md:text-lg">
          {t("Join companies already using our platform to automate scheduling andimprove productivity")}
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-center flex-wrap gap-4">
          <Link to={"/register"}
            className="w-full sm:w-auto px-10 py-3.5 rounded-lg font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            {t("startFreeTrial")}
          </Link>
          <Link to={"/contact"}
            className="w-full sm:w-auto px-10 py-3.5 rounded-lg font-semibold bg-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            {t("scheduleDemo")}
          </Link>

        </div>

        {/* FOOTNOTE */}
        <p className="mt-4 text-sm text-gray-600 dark:text-slate-400">
          {t("noCreditCardRequired")}
        </p>
      </div>
    </section>
  );
};

export default Branding;
