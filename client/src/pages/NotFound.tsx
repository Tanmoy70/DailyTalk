import { Home, ArrowLeft, Search, MessageCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Large Text*/}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={80} className="text-indigo-300 animate-pulse" />
          </div>
        </div>

        {/* Main Message For 404 */}
        <div className="mb-8 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for seems to have wandered off. Let's get you back on track!
          </p>
        </div>

        {/* Decorative Element for 404 */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
            <MessageCircle 
              size={64} 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <Home size={20} className="group-hover:scale-110 transition-transform" />
            <span>Go to Homepage</span>
          </a>

          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg border border-gray-200 hover:bg-gray-50 transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/connect"
              className="text-indigo-600 hover:text-purple-600 font-medium transition-colors cursor-pointer hover:underline"
            >
              Start Talking
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="/"
              className="text-indigo-600 hover:text-purple-600 font-medium transition-colors cursor-pointer hover:underline"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8">
          <p className="text-xs text-gray-400">
            © 2025 <span className="font-semibold text-indigo-600">Daily<span className="text-rose-500">Talk</span></span> - All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;