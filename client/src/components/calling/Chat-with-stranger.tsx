import { useState, useRef, useEffect } from "react";
import { Send, Video, Phone, Search, MoreVertical, Smile, Paperclip, Crown } from "lucide-react";

type UserType = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  level: "Beginner" | "Intermediate" | "Advanced";
  country: string;
  isPremium: boolean;
  lastMessage?: string;
  unreadCount?: number;
};

type Message = {
  id: string;
  sender: "me" | "partner";
  text: string;
  time: string;
};

const dummyUsers: UserType[] = [
  { id: "1", name: "Sophia", avatar: "/src/assets/images/testimonial1.png", isOnline: true, level: "Intermediate", country: "USA", isPremium: true, lastMessage: "Let's practice tomorrow!", unreadCount: 2 },
  { id: "2", name: "James", avatar: "/src/assets/images/testimonial2.png", isOnline: true, level: "Beginner", country: "India", isPremium: false, lastMessage: "Thanks for the tips!", unreadCount: 0 },
  { id: "3", name: "Emily", avatar: "/src/assets/images/testimonial3.png", isOnline: false, level: "Advanced", country: "UK", isPremium: true, lastMessage: "See you later", unreadCount: 0 },
  { id: "4", name: "Ryan", avatar: "/src/assets/images/testimonial1.png", isOnline: true, level: "Intermediate", country: "Canada", isPremium: false, lastMessage: "Great session today!", unreadCount: 1 },
];

const initialMessages: Message[] = [
  { id: "1", sender: "partner", text: "Hi! How are you?", time: "3:00 PM" },
  { id: "2", sender: "me", text: "I'm good! How about you?", time: "3:01 PM" },
  { id: "3", sender: "partner", text: "Doing great, practicing English!", time: "3:02 PM" },
  { id: "4", sender: "me", text: "That's awesome! What topics are you focusing on?", time: "3:03 PM" },
  { id: "5", sender: "partner", text: "Business conversations and presentation skills", time: "3:04 PM" },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner": return "bg-green-100 text-green-700";
    case "Intermediate": return "bg-blue-100 text-blue-700";
    case "Advanced": return "bg-purple-100 text-purple-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const ChatWithStrangersSection = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const currentUserIsPremium = true;

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
    setInputText("");

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredUsers = dummyUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white px-4 py-6 pt-20 lg:pt-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Messages</h2>
          <p className="text-gray-600">Connect and practice with learners worldwide</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Users Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition cursor-pointer border-b border-gray-50 ${
                    selectedUser?.id === user.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                    />
                    {user.isOnline && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                    {user.isPremium && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-1">
                        <Crown size={10} className="text-white" fill="currentColor" />
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                      {user.unreadCount! > 0 && (
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {user.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getLevelColor(user.level)}`}>
                        {user.level}
                      </span>
                      <span className="text-xs text-gray-400">{user.country}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          {selectedUser ? (
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow object-cover"
                    />
                    {selectedUser.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800">{selectedUser.name}</p>
                      {selectedUser.isPremium && (
                        <Crown size={14} className="text-yellow-500" fill="currentColor" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getLevelColor(selectedUser.level)}`}>
                        {selectedUser.level}
                      </span>
                      <span className="text-xs text-gray-500">{selectedUser.country}</span>
                      {selectedUser.isOnline && (
                        <span className="text-xs text-green-600 font-medium">• Online</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transition shadow-md">
                    <Phone size={18} />
                  </button>
                  {currentUserIsPremium && selectedUser.isPremium && (
                    <button className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:scale-105 transition shadow-md">
                      <Video size={18} />
                    </button>
                  )}
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <MoreVertical size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/30 to-white">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-fadeIn`}
                  >
                    <div className={`flex items-end gap-2 max-w-[70%] ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                      {msg.sender === "partner" && (
                        <img
                          src={selectedUser.avatar}
                          alt={selectedUser.name}
                          className="w-8 h-8 rounded-full border-2 border-gray-200 flex-shrink-0"
                        />
                      )}
                      <div>
                        <div
                          className={`px-4 py-3 rounded-2xl shadow-sm ${
                            msg.sender === "me"
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                              : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                        <span className={`text-xs text-gray-400 mt-1 block ${msg.sender === "me" ? "text-right" : "text-left"}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator for chat*/}
                {isTyping && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="flex items-end gap-2 max-w-[70%]">
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                      />
                      <div className="bg-white text-gray-800 border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area for chat*/}
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Paperclip size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Smile size={20} className="text-gray-600" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className={`p-3 rounded-xl transition shadow-lg ${
                      inputText.trim()
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={40} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Select a Conversation</h3>
                <p className="text-gray-500">Choose a user from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWithStrangersSection;