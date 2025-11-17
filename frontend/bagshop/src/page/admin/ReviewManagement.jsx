import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Alert, Empty, Card, DatePicker } from "antd";
import dayjs from "dayjs";
import {
  FETCH_REVIEWS,
  FETCH_REVIEW_BY_DATE,
  selectLoading,
  selectError,
  selectReviewByDate,
  selectReviews,
} from "../../redux/slices/ReviewSlice";

const ReviewManagement = () => {
  const dispatch = useDispatch();

  const reviews = useSelector(selectReviews);
  const reviewsByDate = useSelector(selectReviewByDate);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [selectedDate, setSelectedDate] = useState(null);

  // Lần đầu load tất cả review
  useEffect(() => {
    dispatch(FETCH_REVIEWS());
  }, [dispatch]);

  // Khi chọn ngày thì gọi API lấy review theo ngày
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.format("YYYY/MM/DD");
      dispatch(FETCH_REVIEW_BY_DATE(formattedDate));
    } else {
      setSelectedDate(null);
    }
  };

  // Hàm sắp xếp review theo thời gian mới nhất
  const getSortedReviews = (data) =>
    [...data].sort((a, b) => {
      const timeA = dayjs(`${a.createDate} ${a.createTime}`, "DD/MM/YYYY HH:mm");
      const timeB = dayjs(`${b.createDate} ${b.createTime}`, "DD/MM/YYYY HH:mm");
      return timeB - timeA;
    });

  // Nếu có selectedDate thì dùng reviewsByDate, ngược lại dùng reviews
  const displayReviews = selectedDate ? reviewsByDate : reviews;
  const sortedReviews = getSortedReviews(displayReviews);

  if (loading)
    return (
      <Spin size="large" className="flex justify-center items-center h-64" />
    );
  if (error)
    return (
      <Alert
        message="Lỗi"
        description={error}
        type="error"
        showIcon
        className="mb-4"
      />
    );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b">
        Quản lý đánh giá sản phẩm
      </h1>

      <div className="mb-6 flex items-center gap-4">
        <span className="font-medium text-gray-700">Chọn ngày:</span>
        <DatePicker
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded-md shadow-sm hover:border-blue-400 transition-all"
        />
      </div>

      {sortedReviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReviews.map((review) => (
            <Card
              key={review.id}
              title={`Sản phẩm ID: ${review.productId}`}
              className="shadow-md border border-gray-200 hover:border-blue-300 transition-all"
            >
              <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
              <p className="text-sm text-gray-500 mb-1">
                Người dùng ID: {review.accountId}
              </p>
              <p className="text-sm text-yellow-500 mb-1">
                Rating: {"★".repeat(review.rating)}
              </p>
              <p className="text-xs text-gray-400">
                {review.createDate} {review.createTime}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không có review cho ngày này"
          className="py-12"
        />
      )}
    </div>
  );
};

export default ReviewManagement;
