import React, { useState, useMemo, useEffect, useContext } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import TypeFormModal from "./TypeFormModal";
import { PublicContext } from "../../../contexts/publicContext";
import typeService from "../../../services/api/typeService";
import { toast } from "react-toastify";
const TypeDashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const { types, setTypes } = useContext(PublicContext);
    const itemsPerPage = 5;

    const filteredTypes = useMemo(() => {
        return types.filter((type) =>
            type.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, types]);

    const paginatedTypes = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTypes.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTypes, currentPage]);

    const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);
    const handleOpenModal = (type) => {
        setSelectedType(type);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedType(null);
    };
    const handleSubmit = async (typeData) => {
        try {
            if (selectedType && selectedType._id) {
                // Update
                const res = await typeService.updateType(selectedType._id, typeData);
                if (res) {
                    setTypes((prev) =>
                        prev.map((t) => (t._id === selectedType._id ? res : t))
                    );
                    toast.success("Cập nhật loại thành công!");
                }
            } else {
                // Create
                const res = await typeService.createType(typeData);
                if (res) {
                    setTypes((prev) => [...prev, res]);
                    toast.success("Tạo loại mới thành công!");
                }
            }
            handleCloseModal();
            setSelectedType(null);
        } catch (error) {
            toast.error(error?.message || "Có lỗi xảy ra, vui lòng thử lại!");
            handleCloseModal();
            setSelectedType(null);
        }
    };
    // Delete type
    const handleDelete = async (type) => {
        try {
            if (window.confirm("Bạn có chắc chắn muốn xóa loại này?")) {
                const res = await typeService.deleteType(type._id);
                if (res) {
                    setTypes((prev) => prev.filter((t) => t._id !== type._id));
                    toast.success("Xóa loại thành công!");
                }
            }
        }
        catch (error) {
            toast.error(error?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Quản lý loại sân</h1>
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={() => handleOpenModal(null)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Type
                    </button>
                </div>
                {/* Search */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="relative w-full sm:w-64">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search types..."
                            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

      (=> handleDelete(type)} 
                        />
            </button>
        </div>
                  </td >
                </tr >
              ))}
            </tbody >
          </table >

    {/* Pagination */ }
    < div className = "px-4 py-3 flex justify-between border-t border-gray-200 bg-white" >
            <button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div >
        </div >
    {/* Modal for Create/Update Type */ }
    < TypeFormModal
isOpen = { isModalOpen }
onClose = { handleCloseModal }
onSubmit = { handleSubmit }
initialData = { selectedType }
    />
      </div >
    </div >
  );
};

export default TypeDashboard;
