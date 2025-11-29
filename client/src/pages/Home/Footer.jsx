import { Brain } from "lucide-react";
import React from "react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Demo"],
    },
    {
      title: "Company",
      links: ["About", "Contact", "Careers"],
    },
    {
      title: "Legal",
      links: ["Terms", "Privacy", "Security"],
    },
  ];

  return (
    <footer className="bg-slate-950 text-white py-14 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start gap-12">
        {/* LOGO & DESCRIPTION */}
        <div className="flex flex-col items-start gap-4 md:w-1/3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-xl">
              <Brain size={22} className="text-white" />
            </div>
            <h4 className="font-semibold text-xl">ShiftMind</h4>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            Smart workforce management and AI scheduling for modern businesses.
          </p>
        </div>

        {/* DYNAMIC LINK SECTIONS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:w-2/3">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h5 className="font-semibold mb-4 text-lg">{section.title}</h5>

              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li
                    key={idx}
                    className="text-gray-400 hover:text-white cursor-pointer transition"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} ShiftMind — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
