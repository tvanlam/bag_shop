import React from "react";

const AboutSection = () => {
  const descriptions = [
    "bagShop ra đời với khát khao mang đến những chiếc túi xa hoa, tinh tế được chế tác bằng tay tài hoa của những nghệ nhân Việt Nam với tình yêu và sự tỉ mỉ đến từng chi tiết nhỏ.",
    "Chúng tôi không chỉ đơn thuần là một thương hiệu túi xách mà còn là cầu chuyển về sự sang trọng truyền thống kết hợp với thiết kế hiện đại, sang trọng và đẳng cấp quốc tế.",
    "Mỗi sản phẩm của chúng tôi đều chứa đựng hơn cả của nghệ thuật chế tác, tinh thần Việt Nam và khát vọng mang đến trải nghiệm thời trang đích thực cho khách hàng.",
  ];

  return (
    <div className="bg-gray-100 py-24">
      <div className="container mx-auto px-20">
        <div className="flex items-start justify-between gap-16">
          {/* Left Content - Title */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-700 ">
              Khám Phá Nghệ Thuật Túi Xách Việt Nam Đích Thực
            </h1>
          </div>

          {/* Right Content - Description */}
          <div className="flex-1 space-y-6">
            {descriptions.map((description, index) => (
              <p key={index} className="text-lg text-gray-700 leading-relaxed">
                {description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
