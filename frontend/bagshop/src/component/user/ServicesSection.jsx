import React from "react";

const ServicesSection = () => {
  const services = {
    title: "Dịch Vụ Độc Đáo",
    subtitle: "Khám phá trải nghiệm mua sắm túi xách cao cấp với những dịch vụ đẳng cấp và tiện ích vượt trội tại BagShop.",
    items: [
      {
        id: 1,
        title: "Tùy Chỉnh Túi",
        description: "Thiết kế túi riêng theo phong cách cá nhân, làm nổi bật cá tính của bạn.",
        buttonText: "Thiết Kế Ngay",
        icon: "🎨"
      },
      {
        id: 2,
        title: "Vận Chuyển Toàn Cầu",
        description: "Giao hàng nhanh chóng và an toàn đến mọi miền đất nước, kết nối thế giới thời trang toàn cầu.",
        buttonText: "Kiểm Tra Ngay",
        icon: "🌍"
      },
      {
        id: 3,
        title: "Bảo Hành",
        description: "Cam kết chất lượng với chế độ bảo hành dài hạn, đảm bảo sự hài lòng tối đa cho khách hàng.",
        buttonText: "Chi Tiết Bảo Hành",
        icon: "🛡️"
      }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 py-24">
      <div className="container mx-auto px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {services.title}
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            {services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.items.map((service) => (
            <div
              key={service.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="text-4xl mb-6 text-center">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                {service.description}
              </p>
              
              {/* Button */}
              <div className="text-center">
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  {service.buttonText} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
