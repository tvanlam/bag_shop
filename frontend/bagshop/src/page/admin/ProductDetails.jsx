import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Descriptions, Spin, Alert, List, Rate } from "antd";
import {
  fetchProductById,
  fetchReviewByProduct,
  selectProduct,
  selectProductLoading,
  selectProductError,
  selectReviews,
} from "../../redux/slices/ProductSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProduct);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const reviews = useSelector(selectReviews);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchReviewByProduct(id));
  }, [dispatch, id]);

  const handleEdit = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleBack = () => {
    navigate("/admin/products");
  };

  if (loading)
    return (
      <Spin size="large" className="flex justify-center items-center h-64" />
    );
  if (error)
    return (
      <Alert
        message="Lỗi tải sản phẩm"
        description={error}
        type="error"
        showIcon
        className="mb-4"
      />
    );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <div className="mb-4">
        <Button
          onClick={handleBack}
          className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 rounded transition duration-200"
          icon={<span className="mr-2">←</span>}
          type="text"
        >
          Trở về
        </Button>
      </div>

      <Descriptions
        title="Thông tin sản phẩm"
        bordered
        column={1}
        className="mb-6 bg-gray-50 rounded-md p-4 shadow-inner"
      >
        <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
        <Descriptions.Item label="Tên">{product.name}</Descriptions.Item>
        <Descriptions.Item label="Mô tả">
          {product.description}
        </Descriptions.Item>
        <Descriptions.Item label="Giá cơ bản">
          {product.basePrice || product.price}₫
        </Descriptions.Item>
        <Descriptions.Item label="Tồn kho">
          {product.totalStockQuantity || product.stockQuantity}
        </Descriptions.Item>
        <Descriptions.Item label="Danh mục">
          {product.categoryName || product.categoryId}
        </Descriptions.Item>
      </Descriptions>

      <div className="mb-6">
        <Button
          type="primary"
          onClick={handleEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Chỉnh sửa sản phẩm
        </Button>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Đánh giá từ khách hàng
      </h2>
      <List
        itemLayout="vertical"
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item key={review.id}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-700">
                {review.comment}
              </span>
              <Rate disabled defaultValue={review.rating} />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductDetails;
