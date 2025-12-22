import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  const [activeSection, setActiveSection] = useState("/");

  // Smooth scroll function (same as Navbar)
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

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

  // Detect active section on scroll (same as Navbar)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "features", "how-it-works", "courses", "contact"];
      const scrollPosition = window.scrollY + 100;

      if (window.scrollY < 100) {
        setActiveSection("/");
        return;
      }

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

  const linkClass = (section: string) =>
    `hover:text-indigo-600 transition ${
      activeSection === section ? "text-indigo-600 font-medium" : ""
    }`;

  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <Link
              to="/"
              onClick={(e) => handleSmoothScroll(e, "/")}
              className="text-2xl font-extrabold text-indigo-700 tracking-wide"
            >
              Daily<span className="text-rose-500">Talk</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Improve your English communication every day with real-time
              speaking practice, courses, and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleSmoothScroll(e, "/")}
                  className={linkClass("/")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, "#about")}
                  className={linkClass("#about")}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleSmoothScroll(e, "#features")}
                  className={linkClass("#features")}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
                  className={linkClass("#how-it-works")}
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  onClick={(e) => handleSmoothScroll(e, "#courses")}
                  className={linkClass("#courses")}
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                  className={linkClass("#contact")}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#help"
                  onClick={(e) => handleSmoothScroll(e, "#help")}
                  className={linkClass("#help")}
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => handleSmoothScroll(e, "#privacy")}
                  className={linkClass("#privacy")}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => handleSmoothScroll(e, "#terms")}
                  className={linkClass("#terms")}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={(e) => handleSmoothScroll(e, "#blog")}
                  className={linkClass("#blog")}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleSmoothScroll(e, "#faq")}
                  className={linkClass("#faq")}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#community"
                  onClick={(e) => handleSmoothScroll(e, "#community")}
                  className={linkClass("#community")}
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
            <p className="text-sm mb-2">Email: support@dailytalk.app</p>
            <p className="text-sm mb-2">Phone: +91 98765 43210</p>
            <div className="flex space-x-4 mt-3">
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 transition"
                aria-label="GitHub"
              >
                <i className="fab fa-github" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 transition"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
          © {new Date().getFullYear()} DailyTalk. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
