// Dữ liệu mẫu cho thumbnail images của các sản phẩm
export const productThumbnails = {
  // Sản phẩm 1 - Áo thun
  1: {
    mainImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=100&h=100&fit=crop"
    ]
  },

  // Sản phẩm 2 - Quần jeans
  2: {
    mainImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1506629905607-d405872a4d86?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop"
    ]
  },

  // Sản phẩm 3 - Giày sneaker
  3: {
    mainImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=100&h=100&fit=crop"
    ]
  },

  // Sản phẩm 4 - Áo hoodie
  4: {
    mainImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=100&h=100&fit=crop"
    ]
  },

  // Sản phẩm 5 - Váy
  5: {
    mainImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop"
    ]
  },

  // Sản phẩm 6 - Túi xách
  6: {
    mainImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop"
    ]
  },

  // Sản phẩm 7 - Đồng hồ
  7: {
    mainImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=100&h=100&fit=crop"
    ]
  },

  // Sản phẩm 8 - Kính mát
  8: {
    mainImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=100&h=100&fit=crop"
    ]
  }
};

// Hàm helper để lấy thumbnail theo product ID
export const getThumbnailsByProductId = (productId) => {
  return productThumbnails[productId] || {
    mainImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
    ]
  };
};

// Hàm helper để lấy tất cả ảnh của một sản phẩm (main + thumbnails)
export const getAllImagesByProductId = (productId) => {
  const productImages = productThumbnails[productId];
  if (!productImages) return [];
  
  return [productImages.mainImage, ...productImages.thumbnails];
};

// Hàm helper để lấy ảnh chính của sản phẩm
export const getMainImageByProductId = (productId) => {
  const productImages = productThumbnails[productId];
  return productImages ? productImages.mainImage : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop";
};

export default productThumbnails;
