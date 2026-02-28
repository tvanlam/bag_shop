import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const ServicesSection = () => {
  const services = {
    title: "Dịch Vụ Độc Quyền Của BagShop - Nâng Tầm Phong Cách Túi Của Bạn",
    items: [
      {
        id: 1,
        title: "Thiết Kế Tùy Chỉnh",
        description:
          "Biến ước mơ về chiếc túi hoàn hảo của bạn thành hiện thực ngay hôm nay",
        buttonText: "Thiết Kế Ngay",
      },
      {
        id: 2,
        title: "Sửa Chữa Chuyên Nghiệp",
        description:
          "Chuyên phục hồi và làm mới những chiếc túi yêu thích của bạn một cách hoàn hảo.",
        buttonText: "Kiểm Tra Ngay",
      },
      {
        id: 3,
        title: "Bảo Hành",
        description:
          "Cam kết chất lượng với chế độ bảo hành dài hạn, đảm bảo sự hài lòng tối đa cho khách hàng.",
        buttonText: "Chi Tiết Bảo Hành",
      },
    ],
  };

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 xl:px-52">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-6 max-w-4xl mx-auto px-2 sm:px-4">
            {services.title}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.items.map((service) => (
            <div
              key={service.id}
              className="border-2 rounded-xl p-8 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Button */}
              <div>
                <button className="bg-amber-800 text-white px-6 py-3 font-semibold hover:bg-amber-900 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  {service.buttonText} <FaLongArrowAltRight />
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
