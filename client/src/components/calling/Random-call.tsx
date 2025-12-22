import { useState } from "react";
import { Video, Phone } from "lucide-react";

type User = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  onCall: boolean;
  level: "Beginner" | "Intermediate" | "Advanced";
  gender: "Male" | "Female" | "Other";
  country: string;
};

const dummyUsers: User[] = [
  { id: "1", name: "Ariana", avatar: "/src/assets/images/testimonial1.png", isOnline: true, onCall: false, level: "Beginner", gender: "Female", country: "USA" },
  { id: "2", name: "David", avatar: "/src/assets/images/testimonial2.png", isOnline: true, onCall: true, level: "Intermediate", gender: "Male", country: "India" },
  { id: "3", name: "Sophie", avatar: "/src/assets/images/testimonial3.png", isOnline: false, onCall: false, level: "Advanced", gender: "Female", country: "UK" },
  { id: "4", name: "Carlos", avatar: "/src/assets/images/testimonial1.png", isOnline: true, onCall: false, level: "Intermediate", gender: "Male", country: "Spain" },
];

const VideoCallSection = () => {
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [callMode, setCallMode] = useState<"audio" | "video">("audio");

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (genderFilter === "All" || user.gender === genderFilter) &&
      (levelFilter === "All" || user.level === levelFilter) &&
      (countryFilter === "All" || user.country === countryFilter)
  );

  const handleCall = (userId: string, type: "audio" | "video") => {
    console.log(`${type} call to:`, userId);
  };

  const handleRandomCall = () => {
    console.log(`Random ${callMode} call initiated.`);
  };

  const getStatusColor = (user: User) => {
    if (!user.isOnline) return "bg-gray-400";
    if (user.onCall) return "bg-red-500";
    return "bg-green-500";
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-full px-4 gap-6 py-6 pt-20 lg:pt-6">
      <div className="w-full lg:w-2/3 flex flex-col gap-6 items-center justify-start">
        {/* Call Mode Selector */}
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Choose Your Call Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Audio Call Option - FREE */}
            <button
              onClick={() => setCallMode("audio")}
              className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                callMode === "audio"
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${callMode === "audio" ? "bg-blue-500" : "bg-gray-200"}`}>
                    <Phone size={24} className={callMode === "audio" ? "text-white" : "text-gray-600"} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-gray-800">Audio Call</h4>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mt-1">
                      FREE
                    </span>
                  </div>
                </div>
                {callMode === "audio" && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 text-left">
                Practice speaking English with voice calls. Perfect for beginners and advanced learners.
              </p>
            </button>

            {/* Video Call Option - PREMIUM */}
            <button
              onClick={() => setCallMode("video")}
              className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                callMode === "video"
                  ? "border-purple-500 bg-purple-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-purple-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${callMode === "video" ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-200"}`}>
                    <Video size={24} className={callMode === "video" ? "text-white" : "text-gray-600"} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-gray-800">Video Call</h4>
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold rounded-full mt-1">
                      PREMIUM
                    </span>
                  </div>
                </div>
                {callMode === "video" && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 text-left">
                Face-to-face conversations for better learning. Upgrade to premium to unlock this feature.
              </p>
            </button>
          </div>
        </div>

        {/* Video Call Premium Banner */}
        {callMode === "video" && (
          <div className="w-full max-w-5xl bg-gradient-to-r from-yellow-400 via-pink-400 to-red-400 text-white px-6 py-4 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold mb-1">
                  🎥 Upgrade to Premium for Video Calling
                </h2>
                <p className="text-sm md:text-base">
                  Talk face-to-face with strangers and enhance your learning experience.
                </p>
              </div>
              <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-semibold hover:scale-105 transition whitespace-nowrap cursor-pointer">
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Call Area */}
        <div className="w-full flex-1 max-w-5xl flex items-center justify-center">
          <div className={`w-full h-full min-h-[400px] border shadow-2xl rounded-3xl backdrop-blur-sm flex items-center justify-center p-6 ${
            callMode === "video" 
              ? "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200" 
              : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
          }`}>
            <div className="text-center">
              {callMode === "audio" ? (
                <>
                  <div className="mb-4 p-6 bg-blue-500 rounded-full inline-block">
                    <Phone size={48} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">Audio Call Ready</h3>
                  <p className="text-gray-600">Select a user or start a random call to begin practicing!</p>
                </>
              ) : (
                <>
                  <div className="mb-4 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full inline-block opacity-50">
                    <Video size={48} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">Video Call - Premium Feature</h3>
                  <p className="text-gray-600 mb-4">Upgrade your account to enable video calling</p>
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer">
                    Get Premium Access
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Random Call and Filters */}
        <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-md">
          <div className="flex flex-col gap-4">
            <button
              onClick={handleRandomCall}
              disabled={callMode === "video"}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition font-semibold ${
                callMode === "video"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:scale-100"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer"
              }`}
            >
              {callMode === "audio" ? <Phone size={20} /> : <Video size={20} />}
              {callMode === "audio" ? "🎲 Talk to a Random Stranger (Audio)" : "🔒 Random Video Call (Premium Only)"}
            </button>

            <div className="border-t pt-4">
              <div className="flex flex-wrap gap-3 items-center">
                <h4 className="text-sm font-semibold text-gray-700">Filter Users:</h4>
                <select
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                >
                  <option value="All">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <select
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="All">All Countries</option>
                  <option value="USA">USA</option>
                  <option value="India">India</option>
                  <option value="UK">UK</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Online Users Panel */}
      <div className="w-full lg:w-1/3 bg-white rounded-3xl shadow-lg p-6 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-700">🟢 Online Users</h3>
          <span className="text-sm text-gray-500">{filteredUsers.length} online</span>
        </div>

        <input
          type="text"
          placeholder="Search user..."
          className="px-4 py-2 border border-gray-300 rounded-full mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-gray-50 hover:bg-blue-50 transition p-3 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-white ${getStatusColor(user)}`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">
                        {user.level} • {user.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCall(user.id, "audio")}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium cursor-pointer"
                  >
                    <Phone size={14} />
                    Audio
                  </button>
                  <button
                    onClick={() => handleCall(user.id, "video")}
                    disabled
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-200 text-gray-400 px-3 py-2 rounded-lg cursor-not-allowed text-sm font-medium"
                    title="Premium feature"
                  >
                    <Video size={14} />
                    Video 🔒
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No users match the filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCallSection;