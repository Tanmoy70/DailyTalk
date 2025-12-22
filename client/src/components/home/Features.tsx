const features = [
  {
    icon: 'fas fa-microphone-alt',
    title: 'Live Speaking Practice',
    desc: 'Interact with AI tutors and real learners to build your confidence and fluency.',
  },
  {
    icon: 'fas fa-robot',
    title: 'AI-Powered Feedback',
    desc: 'Get instant suggestions on pronunciation, grammar, and clarity.',
  },
  {
    icon: 'fas fa-users',
    title: 'Community Rooms',
    desc: 'Join learners worldwide and grow together with themed speaking challenges.',
  },
  {
    icon: 'fas fa-calendar-check',
    title: 'Daily Speaking Goals',
    desc: 'Stay consistent and motivated with trackable progress and reminders.',
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            Why Choose <span className="text-indigo-600">DailyTalk?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Elevate your English speaking with features designed for real-world communication and rapid growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">
                <i className={`${feature.icon} text-3xl text-indigo-600`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
