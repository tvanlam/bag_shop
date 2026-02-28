import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      content:
        "Túi của bagShop không chỉ là phụ kiện mà còn là tuyên ngôn cá tính. Chất lượng vượt trội, thiết kế sáng tạo đích thực là điểm nhấn của tôi!",
      name: "Minh Nguyễn",
      position: "Nhà thiết kế",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      content:
        "Túi của bagShop không chỉ là phụ kiện mà còn là tuyên ngôn cá tính. Chất lượng vượt trội, thiết kế sáng tạo đích thực là điểm nhấn của tôi!",
      name: "Minh Nguyễn",
      position: "Nhà thiết kế",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      content:
        "Túi của bagShop không chỉ là phụ kiện mà còn là tuyên ngôn cá tính. Chất lượng vượt trội, thiết kế sáng tạo đích thực là điểm nhấn của tôi!",
      name: "Minh Nguyễn",
      position: "Nhà thiết kế",
    },
  ];

  return (
    <div className="container px-4 sm:px-8 lg:px-20 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16">
        <div className="flex-1 mb-6 md:mb-0">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800">
            Khách Hàng Nói Gì Về Chúng Tôi
          </div>
          <div className="py-6">
            <button className="bg-orange-300 rounded-md px-8 py-4 flex items-center gap-2">
              Xem thêm
              <MdArrowForwardIos />
            </button>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                loading="lazy"
              />
              <div className="space-y-2">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {testimonial.content}
                </p>
                <p className="font-bold text-gray-800">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
