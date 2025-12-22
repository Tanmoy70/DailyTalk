import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // handle API request here
  };

  return (
    <section id="contact" className="bg-gradient-to-br from-indigo-50 to-white py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Info */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
            Get in <span className="text-rose-500">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Have a question, suggestion, or feedback? We'd love to hear from you. Reach out and our team will get back to you shortly.
          </p>
          <ul className="space-y-4 text-gray-700 text-base">
            <li>
              <i className="fas fa-envelope text-indigo-500 mr-2" />
              support@dailytalk.com
            </li>
            <li>
              <i className="fas fa-phone text-indigo-500 mr-2" />
              +91 98765 43210
            </li>
            <li>
              <i className="fas fa-map-marker-alt text-indigo-500 mr-2" />
              Kolkata, India
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
