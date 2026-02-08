import { Video, Phone, Crown, Heart, MessageCircle, Star, Globe } from "lucide-react";

// Define Partner type
type Partner = {
  id: string;
  name: string;
  avatar: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  country: string;
  isPremium: boolean;
  rating?: number;
  totalCalls?: number;
  isOnline?: boolean;
};

// Dummy data for favorite partners
const dummyPartners: Partner[] = [
  {
    id: "1",
    name: "Sophia",
    avatar: "/src/assets/images/testimonial1.png",
    level: "Intermediate",
    country: "USA",
    isPremium: true,
    rating: 4.8,
    totalCalls: 47,
    isOnline: true,
  },
  {
    id: "2",
    name: "James",
    avatar: "/src/assets/images/testimonial2.png",
    level: "Advanced",
    country: "India",
    isPremium: false,
    rating: 4.9,
    totalCalls: 89,
    isOnline: false,
  },
  {
    id: "3",
    name: "Emily",
    avatar: "/src/assets/images/testimonial3.png",
    level: "Beginner",
    country: "UK",
    isPremium: true,
    rating: 4.7,
    totalCalls: 32,
    isOnline: true,
  },
];

// Main component
const FavoritePracticePartnerSection = () => {
  const currentUserIsPremium = true;

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white px-4 py-8 pt-20 lg:pt-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Favorite Partners</h2>
          <p className="text-gray-600">Your trusted practice companions</p>
        </div>
    
        {dummyPartners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Content */}
                <div className="p-5">
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <img
                        src={partner.avatar}
                        alt={partner.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                      {partner.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-800">{partner.name}</h3>
                        {partner.isPremium && (
                          <Crown size={14} className="text-yellow-500" fill="currentColor" />
                        )}
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getLevelColor(partner.level)}`}>
                        {partner.level}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Globe size={14} className="text-blue-500" />
                      <span>{partner.country}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                        <span className="font-semibold text-gray-800">{partner.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone size={12} />
                        <span>{partner.totalCalls}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* Audio Call - Free */}
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-all">
                      <Phone size={16} />
                      <span>Audio</span>
                    </button>

                    {/* Video Call - Premium */}
                    {currentUserIsPremium && partner.isPremium ? (
                      <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-all">
                        <Video size={16} />
                        <span>Video</span>
                      </button>
                    ) : (
                      <button 
                        disabled
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-400 px-3 py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
                      >
                        <Video size={16} />
                        <span>Video</span>
                      </button>
                    )}

                    {/* Message */}
                    <button className="flex items-center justify-center gap-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition">
                      <MessageCircle size={16} />
                    </button>
                  </div>

                  {/* Premium Notice */}
                  {!currentUserIsPremium && partner.isPremium && (
                    <div className="mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-xs text-center text-gray-700">
                        <Crown size={12} className="inline mr-1 text-yellow-600" />
                        Upgrade for video calls
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Favorite Partners Yet</h3>
            <p className="text-gray-500 mb-4">Start adding partners to your favorites!</p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
              Find Partners
            </button>
          </div>
        )}

        {/* Premium Banner */}
        {!currentUserIsPremium && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-lg p-6 text-white">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown size={24} fill="currentColor" />
                <h3 className="text-2xl font-bold">Unlock Video Calls</h3>
              </div>
              <p className="mb-4 text-white/90">Upgrade to Premium for unlimited video calls</p>
              <button className="bg-white text-orange-500 px-8 py-2 rounded-lg font-bold hover:scale-105 transition">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePracticePartnerSection;