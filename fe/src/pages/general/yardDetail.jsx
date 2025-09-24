import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRestroom, FaParking, FaWifi, FaShower } from "react-icons/fa";
import { MdSecurity, MdSportsSoccer } from "react-icons/md";
import sportFieldService from "../../services/api/sportFieldService";
import { feedbackService } from '../../services/api/feedbackService';
import Feedback from '../../components/Feedback/Feedback';
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const amenityIcons = {
    restrooms: FaRestroom,
    parking: FaParking,
    wifi: FaWifi,
    showers: FaShower,
    security: MdSecurity,
};

const YardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fieldData, setFieldData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFieldData = async () => {
            setLoading(true);
            try {
                const response = await sportFieldService.getSportFieldById(id);
                if (response) {
                    setFieldData(response);
                } else {
                    console.error("Field data not found");
                }
            } catch (error) {
                console.error("Error fetching field data:", error);
            }
            setLoading(false);
        };
        fetchFieldData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex justify-center">
                <div className="w-full max-w-7xl space-y-8">
                    <Skeleton variant="rectangular" height={60} className="rounded-xl" />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-4">
                            <Skeleton variant="rectangular" height={500} className="rounded-xl" />
                            <div className="grid grid-cols-3 gap-4">
                                <Skeleton variant="rectangular" height={96} className="rounded-lg" />
                                <Skeleton variant="rectangular" height={96} className="rounded-lg" />
                                <Skeleton variant="rectangular" height={96} className="rounded-lg" />
                            </div>
                        </div>
                        <div className="lg:col-span-4 space-y-6">
                            <Skeleton variant="rectangular" height={250} className="rounded-xl" />
                            <Skeleton variant="rectangular" height={250} className="rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (!fieldData) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
                <p className="text-xl text-gray-400">Không tìm thấy thông tin sân.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex justify-center">
            <div className="w-full max-w-7xl">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap">
                        <div>
                            <h1 className="text-4xl font-bold text-teal-500 flex items-center gap-2 mb-2">
                                <MdSportsSoccer className="text-green-500" />
                                {fieldData?.type?.name || "Soccer Field"}
                            </h1>
                            <h2 className="text-2xl font-semibold text-gray-100">{fieldData?.name}</h2>
                        </div>
                        <span className={`mt-4 lg:mt-0 px-4 py-2 rounded-full text-sm font-semibold ${fieldData?.status === "available" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                            {fieldData?.status}
                        </span>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                    <div className="lg:col-span-8">
                        <div className="bg-gray-800 p-2 rounded-3xl shadow-xl">
                            <img
                                src={fieldData?.images && fieldData?.images.length > 0 ? fieldData?.images[0] : "https://images.unsplash.com/photo-1518604666860-9ed391f76460?ixlib=rb-4.0.3"}
                                alt="Main field view"
                                className="w-full h-[500px] object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1518604666860-9ed391f76460?ixlib=rb-4.0.3";
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {fieldData?.images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Field view ${index + 1}`}
                                    className="h-24 w-full object-cover rounded-lg shadow-md cursor-pointer hover:opacity-75 transition-opacity"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1518604666860-9ed391f76460?ixlib=rb-4.0.3";
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Information Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-gray-800 rounded-3xl shadow-xl p-6">
                            <h3 className="text-xl font-semibold mb-4 text-teal-400">Thông tin chung</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Sức chứa tối đa:</span>
                                    <span className="font-semibold text-gray-50">{fieldData?.capacity} người</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Giá mỗi giờ:</span>
                                    <span className="text-2xl font-bold text-green-500">{fieldData?.pricePerHour?.toLocaleString()} VNĐ</span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (fieldData?.type?._id) {
                                        navigate(`/booking/${fieldData.type._id}`);
                                    } else {
                                        alert("Không tìm thấy loại sân!");
                                    }
                                }}
                                className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg"
                            >
                                Đặt sân ngay
                            </button>
                        </div>
                        <div className="bg-gray-800 rounded-3xl shadow-xl p-6">
                            <h3 className="text-xl font-semibold mb-4 text-teal-400">Tiện ích</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {fieldData?.amenities?.map((amenity, index) => {
                                    const Icon = amenityIcons[amenity.toLowerCase()];
                                    return (
                                        <div key={index} className="flex items-center space-x-2 text-gray-300">
                                            {Icon && <Icon className="text-green-500 text-xl" />}
                                            <span className="capitalize">{amenity}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                       
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-8 bg-gray-800 rounded-3xl shadow-xl p-6">
                    <h3 className="text-2xl font-semibold mb-6 text-teal-400 border-b border-gray-700 pb-4">Đánh giá khách hàng</h3>
                    {fieldData?._id && (
                        <Feedback fieldId={fieldData._id} />
                    )}
                </div>

                {/* Related Fields Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-100 border-l-4 border-teal-600 pl-4 py-2">Sân tương tự gần đó</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(fieldData?.similarFields || []).map((field, index) => (
                            <div key={field._id || index} className="bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                                <img
                                    src={field.images && field.images.length > 0 ? field.images[0] : "https://images.unsplash.com/photo-1518604666860-9ed391f76460?ixlib=rb-4.0.3"}
                                    alt={field.name}
                                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="p-4">
                                    <h4 className="font-semibold text-lg mb-2 text-gray-100">{field.name}</h4>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-green-500 font-bold">{field.pricePerHour?.toLocaleString()}đ/hr</span>
                                        {field.rating && (
                                            <span className="flex items-center text-yellow-400">
                                                ★ {field.rating}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YardDetail;