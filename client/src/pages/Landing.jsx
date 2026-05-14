import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%)]"></div>

      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-semibold tracking-wide">Enrollix</h1>

        <button
          onClick={() => navigate("/enroll")}
          className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          Open Form
        </button>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-2xl">

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Turn registrations into{" "}
            <span className="text-blue-400">structured systems</span>
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            Enrollix helps you collect, manage, and export registrations
            without messy spreadsheets or manual tracking.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate("/enroll")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition shadow-lg shadow-blue-600/20"
            >
              Start Collecting
            </button>

            <button
              onClick={() => navigate("/admin")}
              className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition"
            >
              View Admin
            </button>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10">

        <div className="grid md:grid-cols-2 gap-12">

          <div>
            <h3 className="text-xl font-medium">Simple Collection</h3>
            <p className="text-gray-400 mt-2">
              Fast, clean forms with real-time validation and feedback.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">Centralized Data</h3>
            <p className="text-gray-400 mt-2">
              Store and manage all registrations in one place.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">Export Ready</h3>
            <p className="text-gray-400 mt-2">
              Download your data instantly for analysis or sharing.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">Built to Scale</h3>
            <p className="text-gray-400 mt-2">
              Extend into payments, onboarding, or full SaaS workflows.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-white/10 text-center">
        <h3 className="text-2xl font-medium">
          Start collecting registrations today
        </h3>

        <button
          onClick={() => navigate("/enroll")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition shadow-md shadow-blue-600/20"
        >
          Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t border-white/10">
        Built with purpose · Enrollix
      </footer>
    </div>
  );
}