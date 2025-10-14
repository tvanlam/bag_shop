// Dữ liệu sản phẩm cho ứng dụng
export const products = [
  {
    id: 1,
    name: "Túi Xách Cao Cấp Louis Vuitton",
    price: "25,000,000",
    image: "https://via.placeholder.com/300x300",
    category: "Luxury",
    sizes: ["S", "M", "L"],
    colors: ["black", "brown", "white"],
    description:
      "Túi xách cao cấp từ thương hiệu Louis Vuitton nổi tiếng thế giới. Được làm từ chất liệu da thật cao cấp, thiết kế tinh tế và sang trọng. Phù hợp cho các dịp quan trọng và thể hiện đẳng cấp của người sử dụng.",
  },
  {
    id: 2,
    name: "Túi Đeo Chéo Gucci",
    price: "18,500,000",
    image: "https://via.placeholder.com/300x300",
    category: "Designer",
    sizes: ["S", "M"],
    colors: ["green", "black"],
    description:
      "Túi đeo chéo thời trang từ Gucci với thiết kế hiện đại và tiện dụng. Chất liệu da cao cấp, đường may tỉ mỉ. Hoàn hảo cho phong cách năng động và cá tính.",
  },
  {
    id: 3,
    name: "Túi Tote Chanel",
    price: "32,000,000",
    image: "https://via.placeholder.com/300x300",
    category: "Luxury",
    sizes: ["M", "L"],
    colors: ["black", "beige"],
    description:
      "Túi tote kinh điển từ Chanel với logo CC đặc trưng. Thiết kế rộng rãi, tiện lợi cho công việc và du lịch. Chất liệu da quilted cao cấp, bền đẹp theo thời gian.",
  },
  {
    id: 4,
    name: "Túi Clutch Hermès",
    price: "45,000,000",
    image: "https://via.placeholder.com/300x300",
    category: "Premium",
    sizes: ["S"],
    colors: ["red", "black"],
    description:
      "Túi clutch sang trọng từ Hermès, thương hiệu xa xỉ hàng đầu thế giới. Thiết kế nhỏ gọn, tinh tế, hoàn hảo cho các buổi tiệc tối và sự kiện quan trọng.",
  },
  {
    id: 5,
    name: "Túi Backpack Prada",
    price: "22,000,000",
    image: "https://via.placeholder.com/300x300",
    category: "Designer",
    sizes: ["M", "L"],
    colors: ["black", "navy"],
    description:
      "Túi backpack thời trang từ Prada kết hợp giữa phong cách hiện đại và tính năng thực dụng. Chất liệu nylon cao cấp, nhẹ và bền. Phù hợp cho cả công việc và du lịch.",
  },
  {
    id: 6,
    name: "Túi Shoulder Dior",
    price: "28,000,000",
    image: "https://via.placeholder.com/300x300",
    category: "Luxury",
    sizes: ["S", "M"],
    colors: ["white", "pink"],
    description:
      "Túi vai thanh lịch từ Dior với thiết kế nữ tính và quyến rũ. Logo Dior tinh tế, chất liệu da cao cấp. Hoàn hảo cho phong cách công sở và dạo phố.",
  },
];

// Hàm helper để lấy sản phẩm theo ID
export const getProductById = (productId) => {
  return products.find((product) => product.id === parseInt(productId));
};

// Hàm helper để lấy sản phẩm theo category
export const getProductsByCategory = (category) => {
  return products.filter((product) => product.category === category);
};

// Hàm helper để tìm kiếm sản phẩm theo tên
export const searchProducts = (searchTerm) => {
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Color mapping cho UI
export const colorMap = {
  black: "bg-black",
  brown: "bg-amber-800",
  white: "bg-white border border-gray-300",
  green: "bg-green-600",
  beige: "bg-amber-200",
  red: "bg-red-600",
  navy: "bg-blue-900",
  pink: "bg-pink-400",
};

// Size mapping cho UI
export const sizeMap = {
  XS: "text-xs",
  S: "text-sm",
  M: "text-base",
  L: "text-lg",
  XL: "text-xl",
  XXL: "text-2xl",
};

export default products;
