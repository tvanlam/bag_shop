import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Collapse, Spin, Alert } from "antd";
import {
  FETCH_PRODUCT_BY_CATEGORY,
} from "../../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import { selectProductsByCategory } from "../../redux/slices/ProductSlice";
import { FETCH_CATEGORIES, selectedCategories, selectedError, selectedLoading } from "../../redux/slices/CategorySlice";

const { Panel } = Collapse;

const ProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectedCategories);
  const loading = useSelector(selectedLoading);
  const error = useSelector(selectedError);
  const productsByCategory = useSelector(selectProductsByCategory);
  // eslint-disable-next-line no-unused-vars
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    dispatch(FETCH_CATEGORIES());
  }, [dispatch]);

  const handleExpand = (categoryId) => {
    if (!productsByCategory[categoryId]) {
      dispatch(FETCH_PRODUCT_BY_CATEGORY(categoryId));
    }
    setExpandedKeys((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  if (loading) return <Spin size="large" className="flex justify-center items-center h-64" />;
  if (error) return <Alert message="Lỗi tải bộ sưu tập" description={error} type="error" showIcon className="mb-4" />;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Quản lý bộ sưu tập sản phẩm</h1>
      <Collapse accordion>
        {categories.map((category) => (
          <Panel
            header={
              <div className="flex items-center space-x-4 cursor-pointer" onClick={() => handleExpand(category.id)}>
                <img src={category.imageUrl} alt={category.name} className="w-12 h-12 object-cover rounded" />
                <span className="text-lg font-semibold text-gray-800">{category.name}</span>
              </div>
            }
            key={category.id}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {Array.isArray(productsByCategory[category.id]?.products) &&
                productsByCategory[category.id].products.map((product) => (
                  <Card
                    key={product.id}
                    hoverable
                    cover={<img alt={product.name} src={product.images?.[0]?.url} className="h-40 object-cover" />}
                    onClick={() => navigate(`/admin/details-product/${product.id}`)}
                    className="cursor-pointer transition hover:shadow-md"
                  >
                    <Card.Meta title={product.name} />
                  </Card>
                ))}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default ProductManagement;
