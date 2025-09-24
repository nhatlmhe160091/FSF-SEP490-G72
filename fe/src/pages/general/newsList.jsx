import React, { useEffect, useState } from "react";
import newsService from "../../services/api/newsService";
import { useNavigate } from "react-router-dom";
import { 
    FaInstagram, 
    FaTwitter, 
    FaFacebook 
} from "react-icons/fa";
import { Skeleton } from "@mui/material";

const NewsList = () => {
    const [email, setEmail] = useState("");
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsService.getAllNews();
                setNews(Array.isArray(response) ? response : response.data);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleSubscribe = () => {
        alert(`Bạn đã đăng ký nhận bản tin với email: ${email}`);
        setEmail("");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-50 mb-6 border-l-4 border-teal-600 pl-4 py-2">
                        📢 Tin tức & Sự kiện
                    </h1>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="bg-gray-800 rounded-3xl shadow-xl p-4 animate-pulse">
                                    <Skeleton variant="rectangular" height={192} className="rounded-t-lg" />
                                    <div className="mt-4 space-y-2">
                                        <Skeleton variant="text" height={24} />
                                        <Skeleton variant="text" height={40} />
                                        <div className="flex justify-between items-center mt-2">
                                            <Skeleton variant="text" width="50%" />
                                            <Skeleton variant="rectangular" width={100} height={40} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : news.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-xl text-gray-400">Không có tin tức nào.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
                                >
                                    <img
                                        src={item.thumbnail || item.image || "https://via.placeholder.com/400x200?text=No+Image"}
                                        alt={item.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="p-6 flex flex-col justify-between flex-grow">
                                        <h2 className="text-xl font-semibold text-gray-100 mb-2">{item.title}</h2>
                                        <p className="text-gray-400 text-sm flex-grow line-clamp-3">
                                            {item.content}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Ngày đăng:{" "}
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                        <button
                                            onClick={() => navigate(`/news/${item._id}`)}
                                            className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors w-full"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-10 border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* About */}
                        <div>
                            <h3 className="text-lg font-bold mb-3 text-teal-400">Về chúng tôi</h3>
                            <p className="text-gray-400 text-sm">
                                Nền tảng đáng tin cậy của bạn để đặt sân bóng và cập nhật tin tức thể thao.
                            </p>
                        </div>
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-3 text-teal-400">Liên kết nhanh</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Về chúng tôi</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">Liên hệ</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                        {/* Social */}
                        <div>
                            <h3 className="text-lg font-bold mb-3 text-teal-400">Theo dõi chúng tôi</h3>
                            <div className="flex space-x-4">
                                <FaFacebook className="text-2xl cursor-pointer hover:text-teal-400 transition-colors" />
                                <FaTwitter className="text-2xl cursor-pointer hover:text-teal-400 transition-colors" />
                                <FaInstagram className="text-2xl cursor-pointer hover:text-teal-400 transition-colors" />
                            </div>
                        </div>
                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-bold mb-3 text-teal-400">Đăng ký nhận tin</h3>
                            <div className="flex rounded-xl overflow-hidden shadow-md">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Nhập email của bạn"
                                    className="px-4 py-2 bg-gray-700 text-white w-full outline-none placeholder-gray-400"
                                />
                                <button 
                                    onClick={handleSubscribe}
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 transition duration-300"
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
                        © 2025 Football Pitch Booking. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NewsList;