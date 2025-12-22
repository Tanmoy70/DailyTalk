import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="w-full bg-gradient-to-br from-white via-blue-50 to-indigo-100 py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/*Image Section */}
        <div className="order-1">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1555416594-698c1e94b861?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="DailyTalk Practice"
              className="rounded-3xl shadow-xl w-full object-cover max-h-[480px] transition duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-xl text-sm font-medium text-indigo-600 shadow-md">
              10K+ Learners Active
            </div>
          </div>
        </div>

        {/*Text Section */}
        <div className="order-2">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Learn to Speak English <span className="text-indigo-600">Confidently</span>
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            DailyTalk is your smart speaking partner. Using AI-powered practice, real-time feedback, and fun interactions, we help learners turn hesitation into fluent expression.
          </p>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-center gap-2">
              <i className="fas fa-check-circle text-indigo-500"></i> Real-time AI feedback
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-check-circle text-indigo-500"></i> Daily speaking challenges
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-check-circle text-indigo-500"></i> Community practice rooms
            </li>
          </ul>
          <Link
            to="/#features"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
