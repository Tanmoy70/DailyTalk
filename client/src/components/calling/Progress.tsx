import { Video, Clock, Award, TrendingUp } from "lucide-react";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';

type ProgressData = {
  totalCalls: number;
  totalHours: number;
  streak: number;
  level: string;
  weeklyProgress: { day: string; minutes: number; calls: number }[];
};

const progressData: ProgressData = {
  totalCalls: 47,
  totalHours: 23.5,
  streak: 12,
  level: "Intermediate",
  weeklyProgress: [
    { day: "Mon", minutes: 45, calls: 3 },
    { day: "Tue", minutes: 60, calls: 4 },
    { day: "Wed", minutes: 30, calls: 2 },
    { day: "Thu", minutes: 75, calls: 5 },
    { day: "Fri", minutes: 50, calls: 3 },
    { day: "Sat", minutes: 90, calls: 6 },
    { day: "Sun", minutes: 40, calls: 2 },
  ],
};

const ProgressSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pt-20 lg:pt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Progress</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Video size={32} />
            <span className="text-3xl font-bold">{progressData.totalCalls}</span>
          </div>
          <p className="text-blue-100">Total Calls</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock size={32} />
            <span className="text-3xl font-bold">{progressData.totalHours}h</span>
          </div>
          <p className="text-purple-100">Practice Hours</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Award size={32} />
            <span className="text-3xl font-bold">{progressData.streak}</span>
          </div>
          <p className="text-orange-100">Day Streak 🔥</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={32} />
            <span className="text-3xl font-bold">{progressData.level}</span>
          </div>
          <p className="text-green-100">Current Level</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Weekly Activity</h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={progressData.weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              style={{ fontSize: '14px', fontWeight: '600' }}
            />
            <YAxis 
              yAxisId="left"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Calls', angle: 90, position: 'insideRight' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />
            <Bar 
              yAxisId="left"
              dataKey="minutes" 
              fill="url(#colorMinutes)" 
              radius={[8, 8, 0, 0]}
              name="Practice Minutes"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="calls" 
              stroke="#f97316" 
              strokeWidth={3}
              dot={{ fill: '#f97316', r: 5 }}
              name="Total Calls"
            />
            <defs>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white rounded-xl p-3">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-semibold text-gray-800">First Call</p>
                <p className="text-sm text-gray-500">Make your first video call</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-3">
              <span className="text-3xl">⭐</span>
              <div>
                <p className="font-semibold text-gray-800">Week Warrior</p>
                <p className="text-sm text-gray-500">7-day practice streak</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-3 opacity-50">
              <span className="text-3xl">💎</span>
              <div>
                <p className="font-semibold text-gray-800">100 Calls Club</p>
                <p className="text-sm text-gray-500">Complete 100 calls (47/100)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Learning Insights</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Speaking Fluency</span>
                <span className="text-sm font-bold text-blue-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Vocabulary</span>
                <span className="text-sm font-bold text-purple-600">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Confidence</span>
                <span className="text-sm font-bold text-green-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;