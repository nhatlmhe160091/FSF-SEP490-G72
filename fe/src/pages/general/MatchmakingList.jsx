import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import matchmakingService from '../../services/api/matchmakingService';
import { useAuth } from '../../contexts/authContext';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const MatchmakingList = () => {
  const [matchmakings, setMatchmakings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const fetchOpenMatchmakings = async () => {
    setLoading(true);
    try {
      const res = await matchmakingService.getOpenMatchmakings();
      if (res && res.data) {
        setMatchmakings(res.data);
      } else {
        setMatchmakings([]);
      }
    } catch (error) {
      console.error("Failed to fetch matchmakings", error);
      toast.error('Có lỗi xảy ra khi tải danh sách ghép trận.');
      setMatchmakings([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOpenMatchmakings();
  }, []);

  const handleJoin = async (id, isJoined) => {
    if (!currentUser?._id) {
      toast.error('Bạn cần đăng nhập để ghép trận');
      return;
    }
    const confirmed = window.confirm('Bạn chắc chắn muốn ghép vào phòng này?');
    if (!confirmed) return;

    try {
      const res = await matchmakingService.joinMatchmaking(id, currentUser._id);
      if (res && res.data) {
        toast.success('Ghép trận thành công!');
        fetchOpenMatchmakings();
      } else {
        toast.error(res?.message || 'Ghép trận thất bại!');
      }
    } catch (error) {
      toast.error('Ghép trận thất bại!');
    }
  };

  const handleFieldClick = (fieldId) => {
    if (fieldId) {
      navigate(`/yard-detail/${fieldId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 flex justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50 border-l-4 border-teal-600 pl-4 py-2">
          Danh sách phòng ghép trận đang mở
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="hidden lg:grid grid-cols-5 gap-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">
              <div className="col-span-1">Người tạo</div>
              <div className="col-span-1">Sân</div>
              <div className="col-span-2">Thời gian</div>
              <div className="col-span-1">Số người cần thêm</div>
              <div className="col-span-1">Hành động</div>
            </div>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 animate-pulse">Đang tải...</p>
              </div>
            ) : matchmakings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xl text-gray-500 dark:text-gray-400">Không có phòng ghép nào đang mở</p>
              </div>
            ) : (
              matchmakings.map(m => (
                <div
                  key={m._id}
                  className="grid grid-cols-1 lg:grid-cols-5 gap-4 py-4 lg:py-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="col-span-1 font-medium">{m.userId?.fname} {m.userId?.lname}</div>
                  <div className="col-span-1">
                    <a
                      onClick={() => handleFieldClick(m.bookingId?.fieldId?._id || m.bookingId?.fieldId)}
                      className="text-teal-600 dark:text-teal-400 font-semibold hover:underline cursor-pointer"
                    >
                      {m.bookingId?.fieldName || m.bookingId?.fieldId?.name}
                    </a>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">
                    {m.bookingId?.startTime && m.bookingId?.endTime
                      ? `${dayjs(m.bookingId.startTime).format('HH:mm DD/MM/YYYY')} - ${dayjs(m.bookingId.endTime).format('HH:mm DD/MM/YYYY')}`
                      : 'N/A'}
                  </div>
                  <div className="col-span-1">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      {m.requiredPlayers} người
                    </span>
                  </div>
                  <div className="col-span-1">
                    {currentUser?._id !== m.userId?._id ? (
                      <button
                        onClick={() => handleJoin(m._id)}
                        disabled={!m.requiredPlayers || (currentUser && m.userId && currentUser._id === m.userId._id)}
                        className={`w-full py-2 rounded-xl text-white font-semibold transition-colors duration-200
                          ${!m.requiredPlayers ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-md'}
                        `}
                      >
                        Ghép trận
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                        Phòng của bạn
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchmakingList;