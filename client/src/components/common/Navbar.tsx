import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");

  // Smooth scroll function
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setIsOpen(false); 

    if (targetId === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("/");
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      const navbarHeight = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "features", "how-it-works", "courses", "contact"];
      const scrollPosition = window.scrollY + 100; 

      // Check if at top of page
      if (window.scrollY < 100) {
        setActiveSection("/");
        return;
      }

      // Check each section
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(`#${sectionId}`);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (section: string) =>
    `text-gray-700 hover:text-indigo-600 font-medium transition no-underline ${
      activeSection === section ? "text-indigo-600" : ""
    }`;

  const mobileNavLinkClass = (section: string) =>
    `block text-gray-700 hover:text-indigo-600 font-medium transition no-underline ${
      activeSection === section ? "text-indigo-600" : ""
    }`;

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-all">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleSmoothScroll(e, "/")}
            className="text-3xl font-extrabold text-indigo-700 tracking-wide"
          >
            Daily<span className="text-rose-500">Talk</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            <a
              href="/"
              onClick={(e) => handleSmoothScroll(e, "/")}
              className={navLinkClass("/")}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, "#about")}
              className={navLinkClass("#about")}
            >
              About
            </a>
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "#features")}
              className={navLinkClass("#features")}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
              className={navLinkClass("#how-it-works")}
            >
              How it Works
            </a>
            <a
              href="#courses"
              onClick={(e) => handleSmoothScroll(e, "#courses")}
              className={navLinkClass("#courses")}
            >
              Courses
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className={navLinkClass("#contact")}
            >
              Contact Us
            </a>
          </nav>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white shadow-inner px-6 space-y-4 transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 visible py-4"
            : "max-h-0 opacity-0 invisible"
        } overflow-hidden`}
      >
        <a
          href="/"
          onClick={(e) => handleSmoothScroll(e, "/")}
          className={mobileNavLinkClass("/")}
        >
          Home
        </a>
        <a
          href="#about"
          onClick={(e) => handleSmoothScroll(e, "#about")}
          className={mobileNavLinkClass("#about")}
        >
          About
        </a>
        <a
          href="#features"
          onClick={(e) => handleSmoothScroll(e, "#features")}
          className={mobileNavLinkClass("#features")}
        >
          Features
        </a>
        <a
          href="#how-it-works"
          onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
          className={mobileNavLinkClass("#how-it-works")}
        >
          How it Works
        </a>
        <a
          href="#courses"
          onClick={(e) => handleSmoothScroll(e, "#courses")}
          className={mobileNavLinkClass("#courses")}
        >
          Courses
        </a>
        <a
          href="#contact"
          onClick={(e) => handleSmoothScroll(e, "#contact")}
          className={mobileNavLinkClass("#contact")}
        >
          Contact Us
        </a>
      </div>
    </header>
  );
};

export default Navbar;