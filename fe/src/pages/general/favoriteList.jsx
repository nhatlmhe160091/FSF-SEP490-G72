import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { favoriteService } from "../../services/api/favoriteService";
import { useAuth } from "../../contexts/authContext";
import { FaRestroom, FaChair, FaHeart } from "react-icons/fa";
import { MdOutlineLocalParking, MdShower, MdWifi } from "react-icons/md";
import { Skeleton } from "@mui/material";
import Footer from "../../components/footers/footers";

const ListFavorite = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?._id) {
      fetchFavorites();
    }
  }, [currentUser]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await favoriteService.getFavorites(currentUser._id);
      setFavorites(res?.data || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách yêu thích:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (fieldId) => {
    try {
      await favoriteService.toggleFavorite({
        userId: currentUser._id,
        fieldId,
      });
      fetchFavorites();
    } catch (err) {
      console.error("Lỗi toggle yêu thích:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-600";
      case "unavailable":
        return "bg-red-600";
      case "maintenance":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "parking":
        return <MdOutlineLocalParking className="text-gray-300" />;
      case "showers":
        return <MdShower className="text-gray-300" />;
      case "wifi":
        return <MdWifi className="text-gray-300" />;
      case "restrooms":
        return <FaRestroom className="text-gray-300" />;
      case "seating":
        return <FaChair className="text-gray-300" />;
      default:
        return null;
    }
  };

  if (!currentUser?._id) {
    return (
      <>
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex items-center justify-center">
          <div className="text-center bg-gray-800 p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Bạn chưa đăng nhập.</h2>
            <p className="text-gray-400">Vui lòng đăng nhập để xem danh sách yêu thích của bạn.</p>
          </div>
        </div>
        <Footer /> {/* 👈 Thêm Footer */}
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
          <h1 className="text-3xl font-bold mb-6 border-l-4 border-teal-600 pl-4 py-2">
            ❤️ Sân yêu thích của bạn
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-3xl shadow-xl p-4 animate-pulse">
                <Skeleton variant="rectangular" height={192} className="rounded-t-xl" />
                <div className="mt-4 space-y-2">
                  <Skeleton variant="text" height={24} />
                  <Skeleton variant="text" width="80%" />
                  <div className="flex justify-between items-center mt-2">
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="30%" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer /> {/* 👈 Thêm Footer */}
      </>
    );
  }

  if (favorites.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex items-center justify-center">
          <div className="text-center bg-gray-800 p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Bạn chưa có sân thể thao nào trong danh sách yêu thích.</h2>
            <p className="text-gray-400 mb-4">Hãy khám phá các sân và thêm vào danh sách của bạn!</p>
            <button
              className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 transition-colors"
              onClick={() => navigate("/sportfields")}
            >
              Khám phá sân
            </button>
          </div>
        </div>
        <Footer /> {/* 👈 Thêm Footer */}
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-50 mb-6 border-l-4 border-teal-600 pl-4 py-2">
          ❤️ Sân yêu thích của bạn
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((fav) => {
            const field = fav.fieldId;
            return (
              <div
                key={fav._id}
                className="bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition cursor-pointer relative"
                onClick={() => navigate(`/yard-detail/${field._id}`)}
              >
                <div className="relative h-48">
                  <img
                    src={field.images?.[0] || "https://images.unsplash.com/photo-1560272564-c83b66b1ad12"}
                    alt={field.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className={`absolute top-4 left-4 px-3 py-1 text-xs text-white rounded-full font-semibold ${getStatusColor(field.status)}`}>
                    {field.status || "unknown"}
                  </div>
                  <div
                    className="absolute top-4 right-4 text-red-500 text-2xl cursor-pointer bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(field._id);
                    }}
                  >
                    <FaHeart />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-100">{field.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{field.location}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-sm">Sức chứa: {field.capacity}</span>
                    <span className="text-green-500 font-bold text-lg">{field.pricePerHour?.toLocaleString()}đ/giờ</span>
                  </div>
                  <div className="flex space-x-2">
                    {field.amenities?.map((a, i) => (
                      <div key={i} className="p-2 bg-gray-700 rounded-full">
                        {getAmenityIcon(a)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListFavorite;
