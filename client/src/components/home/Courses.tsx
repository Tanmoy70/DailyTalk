const courses = [
  {
    id: 1,
    title: 'Beginner English Conversations',
    desc: 'Learn basic greetings, everyday questions, and simple sentences to start speaking confidently.',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1623863568368-69e4cbe6cc0b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Fluency Booster Sessions',
    desc: 'Interactive live sessions to boost your fluency, reduce hesitation, and improve pronunciation.',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Interview Preparation',
    desc: 'Practice mock interviews, professional introductions, and formal conversation techniques.',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=60',
  },
];

const Courses = () => {
  return (
    <section id="courses" className="bg-gray-50 py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            Explore Our <span className="text-indigo-600">Courses</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose a course that suits your level and speaking goals.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 flex flex-col justify-between h-[250px]">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm">{course.desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                    {course.level}
                  </span>
                  <a
                    href="#"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    Enroll Now →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
