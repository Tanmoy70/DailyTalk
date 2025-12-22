import About from '../components/home/About';
import Contact from '../components/home/Contact';
import Courses from '../components/home/Courses';
import Features from '../components/home/Features';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/How_it_works';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <About/>
      <Features/>
      <HowItWorks />
      <Courses />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
