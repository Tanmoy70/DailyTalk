import { Crown, Globe, Calendar, Mail, Award, Users } from "lucide-react";

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

type ProgressData = {
  totalCalls: number;
  totalHours: number;
  streak: number;
  level: string;
  weeklyProgress: { day: string; minutes: number; calls: number }[];
};

const dummyUsers: User[] = [
  { id: "1", name: "Ariana", avatar: "/src/assets/images/testimonial1.png", isOnline: true, onCall: false, level: "Beginner", gender: "Female", country: "USA" },
  { id: "2", name: "David", avatar: "/src/assets/images/testimonial2.png", isOnline: true, onCall: true, level: "Intermediate", gender: "Male", country: "India" },
  { id: "3", name: "Sophie", avatar: "/src/assets/images/testimonial3.png", isOnline: false, onCall: false, level: "Advanced", gender: "Female", country: "UK" },
];

const progressData: ProgressData = {
  totalCalls: 47,
  totalHours: 23.5,
  streak: 12,
  level: "Intermediate",
  weeklyProgress: [],
};

const currentUser = {
  name: "Alex Johnson",
  avatar: "/src/assets/images/testimonial1.png",
  email: "alex.johnson@email.com",
  level: "Intermediate",
  country: "USA",
  memberSince: "January 2024",
  isPremium: false,
};

const ProfileSection = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-blue-100 text-blue-700";
      case "Advanced": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pt-20 lg:pt-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-6">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              />
              <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">{currentUser.name}</h2>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getLevelColor(currentUser.level)}`}>
                  {currentUser.level}
                </span>
                {!currentUser.isPremium && (
                  <button className="flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-semibold hover:scale-105 transition cursor-pointer">
                    <Crown size={14} />
                    Upgrade to Premium
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Mail className="text-blue-500" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Globe className="text-green-500" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Country</p>
                  <p className="font-semibold text-gray-800">{currentUser.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Calendar className="text-purple-500" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="font-semibold text-gray-800">{currentUser.memberSince}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Quick Stats</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-600">{progressData.totalCalls}</p>
                  <p className="text-xs text-gray-600 mt-1">Total Calls</p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl text-center">
                  <p className="text-2xl font-bold text-purple-600">{progressData.totalHours}h</p>
                  <p className="text-xs text-gray-600 mt-1">Hours Practiced</p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl text-center">
                  <p className="text-2xl font-bold text-orange-600">{progressData.streak}</p>
                  <p className="text-xs text-gray-600 mt-1">Day Streak</p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-600">12</p>
                  <p className="text-xs text-gray-600 mt-1">Rooms Joined</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Learning Preferences</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Topics</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Business</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Travel</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Culture</span>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition cursor-pointer">+ Add</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Practice Goals</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">Fluency</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Grammar</span>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition cursor-pointer">+ Add</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer">
                Edit Profile
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition cursor-pointer">
                Account Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="text-yellow-500" size={20} />
            Badges & Achievements
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center p-3 bg-yellow-50 rounded-xl">
              <span className="text-3xl mb-1">🏆</span>
              <p className="text-xs text-center font-semibold text-gray-700">Early Bird</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-blue-50 rounded-xl">
              <span className="text-3xl mb-1">⭐</span>
              <p className="text-xs text-center font-semibold text-gray-700">Social Star</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-purple-50 rounded-xl">
              <span className="text-3xl mb-1">🎯</span>
              <p className="text-xs text-center font-semibold text-gray-700">Goal Getter</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-green-50 rounded-xl">
              <span className="text-3xl mb-1">🔥</span>
              <p className="text-xs text-center font-semibold text-gray-700">Streak King</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-pink-50 rounded-xl">
              <span className="text-3xl mb-1">💬</span>
              <p className="text-xs text-center font-semibold text-gray-700">Chatterbox</p>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-100 rounded-xl opacity-50">
              <span className="text-3xl mb-1">🔒</span>
              <p className="text-xs text-center font-semibold text-gray-700">Locked</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="text-blue-500" size={20} />
            Recent Connections
          </h3>
          <div className="space-y-3">
            {dummyUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.country}</p>
                  </div>
                </div>
                <button className="text-blue-500 text-sm font-semibold hover:underline cursor-pointer">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;