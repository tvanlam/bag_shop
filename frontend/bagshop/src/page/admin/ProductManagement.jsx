import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Collapse, Spin, Alert, Empty } from "antd";
import { FETCH_PRODUCT_BY_CATEGORY } from "../../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import { selectProductsByCategory } from "../../redux/slices/ProductSlice";
import {
  FETCH_CATEGORIES,
  selectedCategories,
  selectedError,
  selectedLoading,
} from "../../redux/slices/CategorySlice";
import { ShopOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const ProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectedCategories);
  const loading = useSelector(selectedLoading);
  const error = useSelector(selectedError);
  const productsByCategory = useSelector(selectProductsByCategory);

  const sortedCategories = [...categories].sort((a, b) => a.id - b.id);

  useEffect(() => {
    dispatch(FETCH_CATEGORIES());
  }, [dispatch]);

  const handlePanelChange = (key) => {
    const categoryId = Number(key);
    if (categoryId && !productsByCategory[categoryId]) {
      dispatch(FETCH_PRODUCT_BY_CATEGORY(categoryId));
    }
  };

  if (loading) return <Spin size="large" className="flex justify-center items-center h-64" />;
  if (error) return <Alert message="Lỗi" description={error} type="error" showIcon />;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b">
        Quản lý bộ sưu tập sản phẩm
      </h1>

      <Collapse accordion onChange={handlePanelChange}>
        {sortedCategories.map((category) => {
          const data = productsByCategory[category.id] || {};
          const products = Array.isArray(data.products) ? data.products : [];
          const isLoading = data.loading;

          return (
            <Panel
              key={category.id}
              header={
                <div className="flex items-center gap-3">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <span className="text-lg font-medium text-gray-800">
                    {category.name}
                  </span>
                </div>
              }
            >
              {/* 3 card/hàng, cuộn dọc */}
              <div className="max-h-96 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    <div className="col-span-full flex justify-center py-8">
                      <Spin size="small" />
                    </div>
                  ) : products.length > 0 ? (
                    products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => navigate(`/admin/details-product/${product.id}`)}
                        className="cursor-pointer transition-all hover:shadow-md rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300"
                      >
                        {/* Ảnh hoặc icon */}
                        <div className="h-48 bg-gray-50 flex items-center justify-center">
                          {product.images && product.images[0]?.imageUrl ? (
                            <img
                              src={product.images[0].imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ShopOutlined className="text-6xl text-gray-300" />
                          )}
                        </div>

                        {/* Tên sản phẩm */}
                        <div className="p-3 bg-white">
                          <p className="text-sm font-medium text-gray-800 line-clamp-2">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full">
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Chưa có sản phẩm"
                        className="py-8"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default ProductManagement;