import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Alert, Empty, Card, DatePicker } from "antd";
import dayjs from "dayjs";
import { FETCH_REVIEWS, selectReviews, selectLoading, selectError } from "../../redux/slices/ReviewSlice";

const ReviewManagement = () => {
  const dispatch = useDispatch();

  const reviews = useSelector(selectReviews);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [selectedDate, setSelectedDate] = useState(dayjs().format("DD/MM/YYYY"));

  useEffect(() => {
    dispatch(FETCH_REVIEWS());
  }, [dispatch]);

  const filteredReviews = reviews
    .filter((r) => r.createDate === selectedDate)
    .sort((a, b) => {
      const timeA = dayjs(`${a.createDate} ${a.createTime}`, "DD/MM/YYYY HH:mm");
      const timeB = dayjs(`${b.createDate} ${b.createTime}`, "DD/MM/YYYY HH:mm");
      return timeB - timeA;
    });

  if (loading) return <Spin size="large" className="flex justify-center items-center h-64" />;
  if (error) return <Alert message="Lỗi" description={error} type="error" showIcon className="mb-4" />;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b">
        Quản lý đánh giá sản phẩm
      </h1>

      <div className="mb-4">
        <span className="mr-2 font-medium">Chọn ngày:</span>
        <DatePicker
          format="DD/MM/YYYY"
          defaultValue={dayjs()}
          onChange={(date) => setSelectedDate(date.format("DD/MM/YYYY"))}
        />
      </div>

      {filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((review) => (
            <Card
              key={review.id}
              title={`Sản phẩm ID: ${review.productId}`}
              className="shadow-md border border-gray-200"
            >
              <p className="text-sm text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-500">Người dùng ID: {review.accountId}</p>
              <p className="text-sm text-gray-500">Rating: {"★".repeat(review.rating)}</p>
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
          className="py-8"
        />
      )}
    </div>
  );
};

export default ReviewManagement;
