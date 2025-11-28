import React from "react";
import Button from "./Button";

const Branding = () => {
  return (
    <section className="w-full bg-linear-to-r from-sky-200 to-sky-100 py-20">
      <div className="text-center px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          Ready to Transform Your Workforce Management?
        </h2>
        <p className="mt-4 text-slate-700 text-base md:text-lg">
          \ Join thousands of companies already using ShiftMind to optimize
          their operations.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-center flex-wrap gap-4">
          <Button variant="primary" className="px-6 py-3 rounded-xl font-medium transition-all duration-150 active:scale-95">
            Start Free Trial
          </Button>
          <Button variant="outline" className="px-6 py-3 rounded-xl font-medium transition-all duration-150 active:scale-95">
            Schedule Demo
          </Button>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default Branding;
