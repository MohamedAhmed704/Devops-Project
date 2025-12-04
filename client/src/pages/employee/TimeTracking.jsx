import React, { useState, useEffect } from 'react';
import { Clock, Coffee, LogOut, Play, Pause, Calendar, TrendingUp } from 'lucide-react';
import Button from '../../utils/Button';
import apiClient from '../../api/apiClient';
import { useLoading } from '../../contexts/LoaderContext';
import { useToast } from '../../hooks/useToast';

const TimeTracking = () => {
  // --- States ---
  const [todayStatus, setTodayStatus] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [summaryStats, setSummaryStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Inputs ---
  const [clockOutNotes, setClockOutNotes] = useState('');
  const [breakNotes, setBreakNotes] = useState('');
  const [location, setLocation] = useState('Office');

  // --- Hooks ---
  const { show: showGlobalLoading, hide: hideGlobalLoading } = useLoading();
  const { success, error: showError } = useToast();

  // --- Fetch Functions ---
  const fetchTodayStatus = async () => {
    try {
      const response = await apiClient.get('/api/employee/attendance/today-status');
      setTodayStatus(response.data.data);
    } catch (error) {
      console.error('Error fetching today status:', error);
    }
  };

  const fetchAttendanceHistory = async () => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const response = await apiClient.get('/api/employee/attendance', {
        params: {
          start_date: startOfMonth.toISOString().split('T')[0],
          end_date: today.toISOString().split('T')[0],
          limit: 30
        }
      });

      setAttendanceHistory(response.data.data?.records || []);
    } catch (error) {
      console.error('Error fetching attendance history:', error);
    }
  };

  const fetchSummaryStats = async () => {
    try {
      const response = await apiClient.get('/api/attendance/my-summary');
      setSummaryStats(response.data);
    } catch (error) {
      console.error('Error fetching summary stats:', error);
    }
  };

  // --- Initial Load ---
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchTodayStatus(),
          fetchAttendanceHistory(),
          fetchSummaryStats()
        ]);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // --- Action Handlers ---

  const handleClockIn = async () => {
    try {
      showGlobalLoading();
      await apiClient.post('/api/attendance/clock-in', { location, notes: "" });
      await fetchTodayStatus();
      success('Clocked in successfully!');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to clock in');
    } finally {
      hideGlobalLoading();
    }
  };

  const handleClockOut = async () => {
    try {
      showGlobalLoading();
      await apiClient.post('/api/attendance/clock-out', { notes: clockOutNotes });
      // تحديث كل البيانات
      await Promise.all([
        fetchTodayStatus(),
        fetchAttendanceHistory(),
        fetchSummaryStats()
      ]);
      setClockOutNotes('');
      success('Clocked out successfully!');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to clock out');
    } finally {
      hideGlobalLoading();
    }
  };

  const handleStartBreak = async () => {
    try {
      showGlobalLoading();
      await apiClient.post('/api/attendance/break/start', { notes: breakNotes });

      // ✅ تحديث السجل اليومي والحالة فوراً
      await Promise.all([
        fetchTodayStatus(),
        fetchAttendanceHistory() // هذا مهم لتحديث isOnBreak
      ]);

      setBreakNotes('');
      success('Break started! Enjoy your time ☕');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to start break');
    } finally {
      hideGlobalLoading();
    }
  };

  const handleEndBreak = async () => {
    try {
      showGlobalLoading();
      await apiClient.post('/api/attendance/break/end', { notes: breakNotes });

      // ✅ تحديث السجل اليومي والحالة فوراً
      await Promise.all([
        fetchTodayStatus(),
        fetchAttendanceHistory() // هذا مهم لتحديث isOnBreak
      ]);

      setBreakNotes('');
      success('Break ended! Welcome back 💪');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to end break');
    } finally {
      hideGlobalLoading();
    }
  };

  // --- Helpers ---
  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const calculateDuration = (startTime) => {
    if (!startTime) return '0h 0m';
    const start = new Date(startTime);
    const end = new Date();
    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // --- Derived State Logic ---

  // 1. البحث عن سجل اليوم في التاريخ
  const todayRecord = attendanceHistory.find(r =>
    new Date(r.date).toDateString() === new Date().toDateString()
  );

  // 2. التحقق مما إذا كان هناك بريك مفتوح (بدأ ولم ينته) في سجل اليوم
  // نستخدم todayRecord المحدث من fetchAttendanceHistory
  const isOnBreak = todayRecord?.breaks?.some(b => b.start && !b.end);

  // 3. وقت بداية البريك الحالي (لعرض العداد)
  const activeBreakStart = todayRecord?.breaks?.find(b => b.start && !b.end)?.start;

  const stats = {
    totalHours: summaryStats?.this_week?.total_hours?.toFixed(1) || "0.0",
    totalOvertime: summaryStats?.this_week?.total_overtime?.toFixed(1) || "0.0",
    presentDays: summaryStats?.this_week?.present_days || 0,
    totalDays: summaryStats?.this_week?.total_days || 0
  };

  const weeklyStats = stats;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="text-right w-full sm:w-auto">
          <p className="text-sm text-gray-500">Current Time</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </p>
        </div>
      </div>

      {/* Main Time Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Clock In/Out */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Time Tracking</h2>

            {todayStatus ? (
              <div className="space-y-4">
                {/* Current Status */}
                <div className={`p-4 rounded-lg ${todayStatus.clocked_in ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Status</p>
                      <p className={`text-lg font-bold ${todayStatus.clocked_in ? 'text-green-600' : 'text-gray-600'
                        }`}>
                        {todayStatus.clocked_in ? 'Clocked In' : 'Not Clocked In'}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${todayStatus.clocked_in ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                      <Clock size={24} className={todayStatus.clocked_in ? 'text-green-600' : 'text-gray-400'} />
                    </div>
                  </div>
                </div>

                {/* Time Details */}
                {todayStatus.check_in_time && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Check In</p>
                      <p className="font-semibold text-blue-600">
                        {formatTime(todayStatus.check_in_time)}
                      </p>
                    </div>

                    {todayStatus.check_out_time && (
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Check Out</p>
                        <p className="font-semibold text-orange-600">
                          {formatTime(todayStatus.check_out_time)}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Current Shift */}
                {todayStatus.current_shift && (
                  <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">Current Shift</p>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-sky-600" />
                      <span className="font-medium text-sky-900">
                        {formatTime(todayStatus.current_shift.start_date_time)} -
                        {formatTime(todayStatus.current_shift.end_date_time)}
                      </span>
                    </div>
                    {todayStatus.current_shift.title && (
                      <p className="text-sm text-gray-700 mt-1">{todayStatus.current_shift.title}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No attendance data for today</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              {!todayStatus?.clocked_in ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      type="text"
                      placeholder="Notes (optional)"
                      value={clockOutNotes}
                      onChange={(e) => setClockOutNotes(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleClockIn}
                    disabled={loading}
                  >
                    <Play size={16} />
                    Clock In
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Notes for clock out (optional)"
                    value={clockOutNotes}
                    onChange={(e) => setClockOutNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleClockOut}
                    disabled={loading}
                  >
                    <LogOut size={16} />
                    Clock Out
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Break Management */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Break Management</h2>

            {todayStatus?.clocked_in ? (
              <div className="space-y-4">
                {!isOnBreak ? (
                  <div className="text-center py-6">
                    <Coffee size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 mb-4">No active break</p>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Break notes (optional)"
                        value={breakNotes}
                        onChange={(e) => setBreakNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleStartBreak}
                        disabled={loading}
                      >
                        <Coffee size={16} />
                        Start Break
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Break Started</p>
                        <p className="font-semibold text-yellow-600">
                          {formatTime(activeBreakStart)}
                        </p>
                      </div>
                      <Coffee size={24} className="text-yellow-600" />
                    </div>

                    <div className="text-center mb-3">
                      <p className="text-2xl font-bold text-yellow-700">
                        {calculateDuration(activeBreakStart)}
                      </p>
                      <p className="text-sm text-gray-600">Break Duration</p>
                    </div>

                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={handleEndBreak}
                      disabled={loading}
                    >
                      <Pause size={16} />
                      End Break
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Coffee size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Clock in first to manage breaks</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-blue-600">{weeklyStats.totalHours}h</p>
            </div>
            <Clock size={24} className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overtime</p>
              <p className="text-2xl font-bold text-orange-600">{weeklyStats.totalOvertime}h</p>
            </div>
            <TrendingUp size={24} className="text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Present Days</p>
              <p className="text-2xl font-bold text-green-600">{weeklyStats.presentDays}</p>
            </div>
            <Calendar size={24} className="text-green-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-600">{weeklyStats.totalDays}</p>
            </div>
            <Calendar size={24} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-semibold text-gray-800">Attendance History (Last 30 Days)</h2>
        </div>
        {attendanceHistory.length === 0 ? (
          <div className="text-center py-8"><p className="text-gray-500">No attendance records found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white text-gray-500 border-b">
                <tr>
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">Check In</th>
                  <th className="py-3 px-4 font-medium">Check Out</th>
                  <th className="py-3 px-4 font-medium">Hours</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {attendanceHistory.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-gray-700">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                    <td className="py-3 px-4 font-mono text-gray-600">{formatTime(record.check_in)}</td>
                    <td className="py-3 px-4 font-mono text-gray-600">{formatTime(record.check_out)}</td>
                    <td className="py-3 px-4 font-bold text-slate-700">{record.total_hours ? `${record.total_hours}h` : '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${record.status === 'present' ? 'bg-green-100 text-green-700' :
                          record.status === 'late' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                        }`}>{record.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatBox = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
    <div><p className="text-xs font-bold text-gray-500 uppercase">{title}</p><p className="text-xl font-bold text-gray-900 mt-1">{value}</p></div>
    <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
  </div>
);

export default TimeTracking;