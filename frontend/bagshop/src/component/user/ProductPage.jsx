import React from "react";
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ProductPage = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumber = () => {
    const page = [];
    const maxPageToShow = 5;
    if (totalPages <= maxPageToShow) {
      for (let i = 1; i <= totalPages; i++) {
        page.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      for (let i = startPage; i <= endPage; i++) {
        page.push(i);
      }
    }
    return page;
  };
  const pageNumbers = getPageNumber();
  return (
    <div className="flex flex-col items-center gap-4 mt-8 mb-8">
      <div className="text-sm text-gray-600">
        Trang
        <span className="font-semibold text-blue-600">
          {currentPage}
        </span> / {totalPages}
      </div>
      <div className="flex items-center gap-2">
        {/* nút về trang đầu */}
        <button
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(1);
            }
          }}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white border border-gray-300 shadow-sm cursor-pointer"
          }`}
        >
          <MdKeyboardArrowLeft size={20} />
        </button>

        {/* Hiển thị trang 1 nếu cần */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-blue-600 hover:text-white border border-gray-300 shadow-sm transition-all cursor-pointer"
            >
              1
            </button>
            <span className="px-2 text-gray-400">...</span>
          </>
        )}

        {/* Các số trang */}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white font-semibold"
                : "bg-white text-gray-700 hover:bg-blue-100 border border-gray-300 shadow-sm"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Hiển thị trang cuối nếu cần */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-blue-600 hover:text-white border border-gray-300 shadow-sm transition-all cursor-pointer"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* next button */}
        <button
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white border border-gray-300 shadow-sm cursor-pointer"
          }`}
        >
          <GoArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
