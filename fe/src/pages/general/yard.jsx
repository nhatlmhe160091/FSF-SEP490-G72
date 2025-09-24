import React, { useState, useContext, useEffect } from "react";
import {
    FaHeart, FaRegHeart, FaFutbol, FaBasketballBall, FaVolleyballBall, FaSwimmer,
    FaRunning, FaTableTennis, FaRestroom, FaChair,
} from "react-icons/fa";
import { MdSportsTennis, MdOutlineLocalParking, MdShower, MdWifi } from "react-icons/md";
import { GiCricketBat } from "react-icons/gi";
import ReactPaginate from "react-paginate";
import { PublicContext } from "../../contexts/publicContext";
import { useNavigate } from "react-router-dom";
import { favoriteService } from "../../services/api/favoriteService";
import { useAuth } from "../../contexts/authContext";
import Footer from "../../components/footers/footers"; // Import Footer component

const Yard = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedField, setSelectedField] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 300000]);
    const [currentPage, setCurrentPage] = useState(0);
    const { types, sportFields } = useContext(PublicContext);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (currentUser?._id) {
                    const res = await favoriteService.getFavorites(currentUser._id);
                    setFavorites(res?.data || []);
                }
            } catch (err) {
                console.error("Lỗi khi tải danh sách yêu thích:", err);
            }
        };

        fetchFavorites();
    }, [currentUser]);

    const categories = [
        { id: "all", name: "All Sports", icon: FaRunning },
        { id: "bóng đá", name: "Bóng đá", icon: FaFutbol },
        { id: "bóng rổ", name: "Bóng rổ", icon: FaBasketballBall },
        { id: "pickleball", name: "Pickleball", icon: FaTableTennis },
        { id: "tennis", name: "Tennis", icon: MdSportsTennis },
        { id: "cầu lông", name: "Cầu lông", icon: GiCricketBat },
    ];

    const filteredFields = sportFields
        .filter(field =>
            (selectedCategory === "all" || field.type?.name?.toLowerCase() === selectedCategory) &&
            field.pricePerHour >= priceRange[0] &&
            field.pricePerHour <= priceRange[1]
        );

    const pageCount = Math.ceil(filteredFields.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentFields = filteredFields.slice(offset, offset + itemsPerPage);

    const getStatusColor = (status) => {
        switch (status) {
            case "available": return "bg-green-500";
            case "unavailable": return "bg-red-500";
            case "maintenance": return "bg-yellow-500";
            default: return "bg-gray-500";
        }
    };

    const getAmenityIcon = (amenity) => {
        switch (amenity) {
            case "parking": return <MdOutlineLocalParking className="text-gray-600" />;
            case "showers": return <MdShower className="text-gray-600" />;
            case "wifi": return <MdWifi className="text-gray-600" />;
            case "seating": return <FaRestroom className="text-gray-600" />;
            case "restrooms": return <FaChair className="text-gray-600" />;
            default: return null;
        }
    };

    const toggleFavorite = async (fieldId) => {
        try {
            if (!currentUser?._id) {
                alert("Bạn cần đăng nhập để thực hiện thao tác này.");
                return;
            }
            await favoriteService.toggleFavorite({
                userId: currentUser._id,
                fieldId,
            });
            const res = await favoriteService.getFavorites(currentUser._id);
            setFavorites(res?.data || []);
        } catch (err) {
            console.error("Lỗi toggle yêu thích:", err);
        }
    };

    const isFavorite = (fieldId) => {
        return favorites.some(fav => fav.fieldId?._id === fieldId);
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 flex flex-col">
            <div className="flex flex-1">
                {/* Sidebar with Filters */}
                <div className="w-64 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl mr-8 h-fit sticky top-8 transition-colors duration-300">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">Filters</h2>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Categories</h3>
                        <div className="space-y-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center w-full p-3 rounded-xl transition-all duration-200
                                        ${selectedCategory === category.id
                                            ? "bg-teal-600 text-white shadow-lg transform scale-105"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                                        }`}
                                >
                                    <category.icon className="mr-3 text-xl" />
                                    <span className="text-sm font-medium">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Price Range</h3>
                        <div className="space-y-2">
                            <input
                                type="range"
                                min="0"
                                max="300000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                                style={{ '--tw-range-thumb-color': 'rgb(5 150 105)' }}
                            />
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content with Field Cards */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
                        {currentFields.map((field) => (
                            <div
                                key={field.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                                onClick={() => setSelectedField(field)}
                            >
                                <div className="relative h-48">
                                    <img
                                        src={field.images && field.images.length > 0 ? field.images[0] : "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"}
                                        alt={field.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80";
                                        }}
                                    />
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(field.status)}`}>
                                        {field.status}
                                    </div>
                                    <div
                                        className="absolute bottom-4 right-4 text-3xl cursor-pointer z-10 text-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(field._id);
                                        }}
                                    >
                                        {isFavorite(field._id) ? (
                                            <FaHeart className="text-red-500 transition-colors" />
                                        ) : (
                                            <FaRegHeart className="hover:text-red-500 transition-colors" />
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{field.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{field.location}</p>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600 dark:text-gray-300">Capacity: {field.capacity}</span>
                                        <span className="text-teal-600 font-bold text-xl">${field.pricePerHour}/hr</span>
                                    </div>
                                    <div className="flex space-x-3 mb-4">
                                        {field.amenities.map((amenity, index) => (
                                            <div key={index} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                                {getAmenityIcon(amenity)}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className="w-full bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-700 transition-colors duration-200 shadow-md"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/yard-detail/${field._id}`);
                                        }}
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        containerClassName="flex justify-center items-center space-x-2 text-gray-600 dark:text-gray-400"
                        previousLinkClassName="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        nextLinkClassName="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        pageLinkClassName="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        activeLinkClassName="bg-teal-600 text-white hover:bg-teal-700 dark:hover:bg-teal-700 transition-colors"
                        disabledClassName="opacity-50 cursor-not-allowed"
                    />

                    {/* Modal for Field Details */}
                    {selectedField && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300">
                                <div className="relative h-64">
                                    <img
                                        src={selectedField.images && selectedField.images.length > 0 ? selectedField.images[0] : "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"}
                                        alt={selectedField.name}
                                        className="w-full h-full object-cover rounded-t-3xl"
                                    />
                                    <button
                                        onClick={() => setSelectedField(null)}
                                        className="absolute top-4 right-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-lg font-bold"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{selectedField.name}</h2>
                                    <div className="space-y-4">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{selectedField.location}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-300">Capacity: {selectedField.capacity}</span>
                                            <span className="text-teal-600 font-bold text-2xl">${selectedField.pricePerHour}/hr</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-600 dark:text-gray-300">Status:</span>
                                            <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(selectedField.status)}`}>
                                                {selectedField.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-600 dark:text-gray-300">Amenities:</span>
                                            <div className="flex space-x-2">
                                                {selectedField.amenities.map((amenity, index) => (
                                                    <div key={index} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                                        {getAmenityIcon(amenity)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Yard;
