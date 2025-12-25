import { useState } from "react";
import { Video, Phone, Clock, MessageSquare, Star, X, Globe, Award, UserPlus, Flag } from "lucide-react";

//Type definition for call history entry
type CallHistory = {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  callType: "Audio" | "Video";
  duration: string;
  topic: string;
  date: string;
  partnerLevel: "Beginner" | "Intermediate" | "Advanced";
  gender?: "Male" | "Female" | "Other";
  country?: string;
};

// Dummy data for call history
const dummyCallHistory: CallHistory[] = [
  {
    id: "1",
    partnerName: "Ariana",
    partnerAvatar: "/src/assets/images/testimonial1.png",
    callType: "Video",
    duration: "24m 32s",
    topic: "Travel Conversations",
    date: "Oct 10, 2025",
    partnerLevel: "Beginner",
    gender: "Female",
    country: "USA",
  },
  {
    id: "2",
    partnerName: "David",
    partnerAvatar: "/src/assets/images/testimonial2.png",
    callType: "Audio",
    duration: "17m 12s",
    topic: "Daily Routine Talk",
    date: "Oct 8, 2025",
    partnerLevel: "Intermediate",
    gender: "Male",
    country: "India",
  },
  {
    id: "3",
    partnerName: "Sophie",
    partnerAvatar: "/src/assets/images/testimonial3.png",
    callType: "Video",
    duration: "32m 45s",
    topic: "Interview Practice",
    date: "Oct 5, 2025",
    partnerLevel: "Advanced",
    gender: "Female",
    country: "UK",
  },
];

// Main Call History Section Component
const CallHistorySection = () => {
  const [favoriteRequests, setFavoriteRequests] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<CallHistory | null>(null);

  const handleFavorite = (id: string) => {
    if (!favoriteRequests.includes(id)) {
      setFavoriteRequests([...favoriteRequests, id]);
    }
  };

  // Helper to get level color classes
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-blue-100 text-blue-700";
      case "Advanced":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pt-20 lg:pt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Call History
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {dummyCallHistory.map((call) => (
          <div
            key={call.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
            onClick={() => setSelectedUser(call)}
          >
            <div className="flex items-center gap-4 p-5 border-b border-gray-100">
              <img
                src={call.partnerAvatar}
                alt={call.partnerName}
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {call.partnerName}
                </h3>
                <p
                  className={`text-xs px-3 py-0.5 mt-1 rounded-full inline-block ${getLevelColor(
                    call.partnerLevel
                  )}`}
                >
                  {call.partnerLevel}
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                  {call.callType === "Video" ? (
                    <Video className="text-purple-500" size={18} />
                  ) : (
                    <Phone className="text-blue-500" size={18} />
                  )}
                  <span className="text-sm font-medium">
                    {call.callType} Call
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">{call.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MessageSquare className="text-green-500" size={16} />
                <span className="text-sm">Topic: {call.topic}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-3">
                <p className="text-xs text-gray-500">{call.date}</p>

                <button
                  className={`flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full transition ${
                    favoriteRequests.includes(call.id)
                      ? "bg-yellow-100 text-yellow-600 cursor-default"
                      : "bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:scale-105"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(call.id);
                  }}
                  disabled={favoriteRequests.includes(call.id)}
                >
                  <Star
                    size={14}
                    className={
                      favoriteRequests.includes(call.id)
                        ? "text-yellow-500"
                        : "text-white"
                    }
                  />
                  {favoriteRequests.includes(call.id)
                    ? "Request Sent"
                    : "Send Favorite Request"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          isFavorite={favoriteRequests.includes(selectedUser.id)}
          onFavorite={() => handleFavorite(selectedUser.id)}
        />
      )}
    </div>
  );
};

// User Profile Modal Component
const UserProfileModal = ({
  user,
  onClose,
  isFavorite,
  onFavorite,
}: {
  user: CallHistory;
  onClose: () => void;
  isFavorite: boolean;
  onFavorite: () => void;
}) => {
  const [isBlocked, setIsBlocked] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-blue-100 text-blue-700";
      case "Advanced": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const userStats = {
    totalCalls: Math.floor(Math.random() * 100) + 20,
    totalHours: Math.floor(Math.random() * 50) + 10,
    rating: (Math.random() * 2 + 3).toFixed(1),
    joined: "March 2024",
  };

  const userPreferences = {
    topics: ["Business", "Travel", "Culture", "Technology"],
    goals: ["Fluency", "Grammar", "Pronunciation"],
    languages: ["English", "Spanish"],
    availability: "Evenings (UTC+0)",
  };

  const badges = [
    { emoji: "🏆", name: "Top Caller", unlocked: true },
    { emoji: "⭐", name: "5-Star", unlocked: true },
    { emoji: "🎯", name: "Goal Achiever", unlocked: true },
    { emoji: "🔥", name: "Streak Master", unlocked: true },
    { emoji: "💬", name: "Great Chat", unlocked: true },
    { emoji: "🌍", name: "World Traveler", unlocked: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"></div>

        <div className="px-8 pb-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-6">
            <div className="relative">
              <img
                src={user.partnerAvatar}
                alt={user.partnerName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              />
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.partnerName}</h1>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start items-center">
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getLevelColor(user.partnerLevel)}`}>
                  {user.partnerLevel}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold text-gray-800">{userStats.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer">
              <Video size={18} />
              Video Call
            </button>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer">
              <Phone size={18} />
              Audio Call
            </button>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer">
              <MessageSquare size={18} />
              Message
            </button>
            <button
              onClick={onFavorite}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer ${
                isFavorite
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gradient-to-r from-yellow-400 to-orange-400 text-white"
              }`}
            >
              <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
              {isFavorite ? "Favorited" : "Favorite"}
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Globe className="text-blue-500" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Country</p>
                  <p className="font-semibold text-gray-800">{user.country || "Unknown"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <UserPlus className="text-green-500" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="font-semibold text-gray-800">{user.gender || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Award className="text-purple-500" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="font-semibold text-gray-800">{userStats.joined}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Statistics</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center">
                  <p className="text-3xl font-bold text-blue-600">{userStats.totalCalls}</p>
                  <p className="text-xs text-gray-600 mt-1">Total Calls</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl text-center">
                  <p className="text-3xl font-bold text-purple-600">{userStats.totalHours}h</p>
                  <p className="text-xs text-gray-600 mt-1">Hours Practiced</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl text-center">
                  <p className="text-3xl font-bold text-green-600">{userStats.rating}</p>
                  <p className="text-xs text-gray-600 mt-1">Avg Rating</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl text-center">
                  <p className="text-3xl font-bold text-orange-600">95%</p>
                  <p className="text-xs text-gray-600 mt-1">Response Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learning Preferences */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Learning Preferences</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Topics</label>
                  <div className="flex flex-wrap gap-2">
                    {userPreferences.topics.map((topic) => (
                      <span key={topic} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Practice Goals</label>
                  <div className="flex flex-wrap gap-2">
                    {userPreferences.goals.map((goal) => (
                      <span key={goal} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {userPreferences.languages.map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Badges & Achievements */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="text-yellow-500" size={20} />
                Badges & Achievements
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-3 rounded-xl ${
                      badge.unlocked ? "bg-white" : "bg-gray-200 opacity-50"
                    }`}
                  >
                    <span className="text-3xl mb-1">{badge.unlocked ? badge.emoji : "🔒"}</span>
                    <p className="text-xs text-center font-semibold text-gray-700">{badge.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-xl font-semibold hover:bg-blue-100 transition cursor-pointer">
              <UserPlus size={18} />
              Send Friend Request
            </button>
            <button
              onClick={() => setIsBlocked(!isBlocked)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition cursor-pointer ${
                isBlocked
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-red-50 text-red-700 hover:bg-red-100"
              }`}
            >
              <Flag size={18} />
              {isBlocked ? "Unblock User" : "Block User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallHistorySection;