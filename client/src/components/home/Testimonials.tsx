import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Student, India',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    quote:
      'DailyTalk helped me break the fear of speaking. I now speak English every day with confidence. It’s like having a personal tutor anytime!',
  },
  {
    name: 'Emily Johnson',
    role: 'Working Professional, UK',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    quote:
      'The AI feedback is surprisingly helpful. My pronunciation has improved drastically. I love the live practice rooms!',
  },
  {
    name: 'Mohammed Al-Farouq',
    role: 'Graduate, UAE',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote:
      'I’ve used many English apps, but DailyTalk is different. The structured approach and practice schedule keeps me on track.',
  },
    {
    name: 'Mohammed Al-Farouq',
    role: 'Graduate, UAE',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote:
      'I’ve used many English apps, but DailyTalk is different. The structured approach and practice schedule keeps me on track.',
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-gradient-to-r from-indigo-50 to-rose-50 py-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-3">
            Hear from <span className="text-indigo-600">Our Learners</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            Real voices. Real experiences. See what learners around the world
            say about DailyTalk.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-2xl">
                <div>
                  <div className="flex items-center mb-4 gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div>
                      <h4 className="text-gray-800 font-semibold">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    <i className="fas fa-quote-left text-indigo-400 mr-2" />
                    {item.quote}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Fix - Add manual space below to push dots down */}
        <div className="mt-4 h-8 flex justify-center items-center">
          {/* Pagination bullets appear automatically here from Swiper */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
