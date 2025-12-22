const steps = [
  {
    icon: 'fas fa-user-plus',
    title: 'Create Your Account',
    desc: 'Register for free and set your English fluency goals in under a minute.',
  },
  {
    icon: 'fas fa-chalkboard-teacher',
    title: 'Choose Practice Mode',
    desc: 'Pick AI tutoring, live rooms, or solo speaking drills – you decide!',
  },
  {
    icon: 'fas fa-microphone',
    title: 'Speak & Improve',
    desc: 'Start speaking with real-time AI feedback, vocabulary tips, and scoring.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Track Progress',
    desc: 'Visualize your improvement, unlock badges, and stay consistent.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            How <span className="text-indigo-600">DailyTalk</span> Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Follow four simple steps to start speaking confidently in English.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line in center */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200" />

          <div className="space-y-24">
            {steps.map((step, index) => {
              const isRight = index % 2 !== 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isRight ? 'md:flex-row-reverse md:justify-end' : 'md:justify-start'
                  }`}
                >
                  {/* Icon Dot on Line */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-indigo-600 text-white items-center justify-center shadow-lg text-xl">
                    <i className={step.icon}></i>
                  </div>

                  {/* Step Content */}
                  <div
                    className={`bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-lg w-full md:max-w-[45%] z-10 ${
                      isRight ? 'md:ml-auto text-left' : 'md:mr-auto text-left'
                    }`}
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>

                  {/* Mobile-only Icon */}
                  <div className="md:hidden w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow mb-6">
                    <i className={step.icon}></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
