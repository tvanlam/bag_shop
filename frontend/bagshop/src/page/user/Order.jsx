import React, { useState, useEffect, useCallback } from "react";
import { Tabs, Tag, Spin, Empty, Divider, Button, Modal, Badge } from "antd";
import {
  ShoppingOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserLayout from "./UserLayout/UserLayout";
import CheckoutService from "../../service/CheckoutService";

// ─── Cấu hình trạng thái đơn hàng ───────────────────────────────────────────
const STATUS_CONFIG = {
  PENDING: { label: "Chờ xác nhận", color: "orange" },
  CONFIRMED: { label: "Đã xác nhận", color: "blue" },
  PROCESSING: { label: "Đang xử lý", color: "processing" },
  SHIPPING: { label: "Đang giao", color: "cyan" },
  DELIVERED: { label: "Đã giao", color: "success" },
  CANCELLED: { label: "Đã hủy", color: "error" },
};

const PAYMENT_LABELS = {
  COD: "Tiền mặt khi nhận hàng",
  VNPAY: "VNPay",
  MOMO: "MoMo",
};

const TAB_ITEMS = [
  { key: "ALL", label: "Tất cả" },
  { key: "PENDING", label: "Chờ xác nhận" },
  { key: "PROCESSING", label: "Đang xử lý" },
  { key: "SHIPPING", label: "Đang giao" },
  { key: "DELIVERED", label: "Đã giao" },
  { key: "CANCELLED", label: "Đã hủy" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price || 0,
  );

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// ─── OrderCard ────────────────────────────────────────────────────────────────
const OrderCard = ({ order, onViewDetail, onCancel }) => {
  const statusCfg = STATUS_CONFIG[order.status] || {
    label: order.status,
    color: "default",
  };
  const items = order.orderItems || order.items || [];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* ── Header card ── */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ShoppingOutlined className="text-blue-400" />
          <span className="font-semibold text-gray-700">
            Đơn hàng&nbsp;#{order.id || "—"}
          </span>
          <span className="text-gray-300">|</span>
          <CalendarOutlined />
          <span>{formatDate(order.createdAt || order.orderDate)}</span>
        </div>
        <Tag
          color={statusCfg.color}
          className="rounded-full px-3 py-0.5 font-semibold text-sm m-0"
        >
          {statusCfg.label}
        </Tag>
      </div>

      {/* ── Danh sách sản phẩm ── */}
      <div className="px-6 py-4">
        {items.length > 0 ? (
          <div className="space-y-3">
            {items.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingOutlined className="text-gray-400 text-xl" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">
                    {item.productName || item.name || "Sản phẩm"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {item.color && (
                      <span className="mr-2">Màu: {item.color}</span>
                    )}
                    <span>x{item.quantity}</span>
                  </p>
                </div>
                <p className="font-semibold text-gray-800 whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
            {items.length > 2 && (
              <button
                onClick={() => onViewDetail(order)}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium"
              >
                +{items.length - 2} sản phẩm khác...
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">
            Không có thông tin sản phẩm
          </p>
        )}
      </div>

      {/* ── Footer card ── */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CreditCardOutlined className="text-gray-400" />
          <span>
            {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod || "—"}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="text-xs text-gray-400">Tổng tiền</p>
            <p className="font-bold text-base text-blue-600">
              {formatPrice(order.totalPrice || order.total)}
            </p>
          </div>
          <div className="flex gap-2">
            {order.status === "PENDING" && (
              <Button
                danger
                size="small"
                icon={<CloseCircleOutlined />}
                onClick={() => onCancel(order.id)}
                className="rounded-lg"
              >
                Hủy
              </Button>
            )}
            <Button
              type="primary"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => onViewDetail(order)}
              className="rounded-lg"
              style={{ background: "#111", borderColor: "#111" }}
            >
              Chi tiết
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Order = () => {
  const accountId = useSelector((state) => state.auth.accountId);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch danh sách đơn hàng
  const fetchOrders = useCallback(async () => {
    if (!accountId) return;
    try {
      setLoading(true);
      const res = await CheckoutService.getOrders();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Xem chi tiết đơn hàng
  const handleViewDetail = async (order) => {
    setDetailVisible(true);
    setDetailLoading(true);
    try {
      const res = await CheckoutService.getOrderById(order.id);
      setSelectedOrder(res.data);
    } catch {
      setSelectedOrder(order);
    } finally {
      setDetailLoading(false);
    }
  };

  // Hủy đơn hàng
  const handleCancelOrder = (orderId) => {
    Modal.confirm({
      title: "Hủy đơn hàng",
      content: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
      okText: "Hủy đơn",
      cancelText: "Giữ lại",
      okType: "danger",
      onOk: async () => {
        try {
          await CheckoutService.deleteOrder(orderId);
          toast.success("Đã hủy đơn hàng thành công");
          fetchOrders();
        } catch {
          toast.error("Hủy đơn hàng thất bại, vui lòng thử lại");
        }
      },
    });
  };

  // Lọc đơn hàng theo tab
  const filteredOrders =
    activeTab === "ALL" ? orders : orders.filter((o) => o.status === activeTab);

  // Build items cho Tabs kèm count
  const tabsWithCount = TAB_ITEMS.map((t) => ({
    key: t.key,
    label: (
      <span className="font-medium">
        {t.label}
        <span className="ml-1 text-xs text-gray-400">
          (
          {t.key === "ALL"
            ? orders.length
            : orders.filter((o) => o.status === t.key).length}
          )
        </span>
      </span>
    ),
  }));

  return (
    <UserLayout>
      <div className="space-y-4">
        {/* ── Tiêu đề ── */}
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <ShoppingOutlined className="text-blue-500 text-lg" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 m-0">
              Đơn hàng của tôi
            </h2>
            <p className="text-sm text-gray-400 m-0">
              Theo dõi tất cả đơn hàng của bạn
            </p>
          </div>
        </div>

        {/* ── Tabs lọc trạng thái ── */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="order-tabs px-2"
            items={tabsWithCount}
          />
        </div>

        {/* ── Danh sách đơn hàng ── */}
        {loading ? (
          <div className="flex justify-center items-center py-24 bg-white rounded-xl shadow-md">
            <Spin size="large" tip="Đang tải đơn hàng..." />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md py-20">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="text-gray-400">
                  {activeTab === "ALL"
                    ? "Bạn chưa có đơn hàng nào"
                    : "Không có đơn hàng ở trạng thái này"}
                </span>
              }
            />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetail={handleViewDetail}
                onCancel={handleCancelOrder}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modal chi tiết ── */}
      <OrderDetailModal
        visible={detailVisible}
        loading={detailLoading}
        order={selectedOrder}
        onClose={() => {
          setDetailVisible(false);
          setSelectedOrder(null);
        }}
      />
    </UserLayout>
  );
};

// ─── OrderDetailModal ─────────────────────────────────────────────────────────
const OrderDetailModal = ({ visible, loading, order, onClose }) => {
  const statusCfg = STATUS_CONFIG[order?.status] || {
    label: order?.status,
    color: "default",
  };
  const items = order?.orderItems || order?.items || [];

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={
        <Button
          onClick={onClose}
          style={{ background: "#111", borderColor: "#111", color: "#fff" }}
          className="rounded-lg"
        >
          Đóng
        </Button>
      }
      width={640}
      title={
        <div className="flex items-center gap-2">
          <ShoppingOutlined className="text-blue-500" />
          <span className="font-bold">Chi tiết đơn hàng&nbsp;#{order?.id}</span>
        </div>
      }
    >
      {loading ? (
        <div className="flex justify-center py-14">
          <Spin size="large" />
        </div>
      ) : order ? (
        <div className="space-y-4 pt-1">
          {/* ── Thông tin chung ── */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl">
            <InfoItem
              icon={<CalendarOutlined />}
              label="Ngày đặt"
              value={formatDate(order.createdAt || order.orderDate)}
            />
            <InfoItem
              icon={<CreditCardOutlined />}
              label="Thanh toán"
              value={
                PAYMENT_LABELS[order.paymentMethod] ||
                order.paymentMethod ||
                "—"
              }
            />
            <InfoItem
              icon={<InfoCircleOutlined />}
              label="Trạng thái"
              value={
                <Tag color={statusCfg.color} className="m-0">
                  {statusCfg.label}
                </Tag>
              }
            />
          </div>

          {/* ── Địa chỉ giao hàng ── */}
          {(order.shippingAddress || order.address) && (
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <EnvironmentOutlined className="text-blue-500 mt-0.5 text-base flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700 text-sm mb-0.5">
                  Địa chỉ giao hàng
                </p>
                <p className="text-gray-600 text-sm m-0">
                  {order.shippingAddress || order.address}
                </p>
              </div>
            </div>
          )}

          {/* ── Danh sách sản phẩm ── */}
          <Divider plain className="!my-1">
            <span className="text-gray-500 text-xs font-semibold">
              Sản phẩm ({items.length})
            </span>
          </Divider>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-14 h-14 object-cover rounded-lg border flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingOutlined className="text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate m-0">
                    {item.productName || item.name || "Sản phẩm"}
                  </p>
                  <p className="text-xs text-gray-400 m-0">
                    {item.color && `Màu: ${item.color} • `}x{item.quantity} •{" "}
                    {formatPrice(item.price)}/cái
                  </p>
                </div>
                <p className="font-semibold text-gray-700 whitespace-nowrap text-sm">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* ── Tổng tiền ── */}
          <Divider className="!my-1" />
          <div className="space-y-1.5 text-sm px-1">
            {order.subtotal != null && (
              <div className="flex justify-between text-gray-500">
                <span>Tạm tính</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
            )}
            {order.shippingFee != null && (
              <div className="flex justify-between text-gray-500">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(order.shippingFee)}</span>
              </div>
            )}
            {order.discount != null && order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá (voucher)</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
              <span>Tổng cộng</span>
              <span className="text-blue-600">
                {formatPrice(order.totalPrice || order.total)}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

// ─── InfoItem helper ──────────────────────────────────────────────────────────
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span className="text-gray-400 mt-0.5 text-base">{icon}</span>
    <div>
      <p className="text-xs text-gray-400 m-0">{label}</p>
      <p className="font-medium text-gray-700 text-sm m-0">{value}</p>
    </div>
  </div>
);

export default Order;
