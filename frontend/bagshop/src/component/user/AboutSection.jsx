import React from "react";

const AboutSection = () => {
  return (
    <div className="py-24 min-h-screen" style={{ backgroundColor: "#0C0600" }}>
      <div className="container mx-auto px-20">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Túi Xách Việt Nam
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
            Khám phá nghệ thuật thiết kế túi xách đầy sáng tạo, nơi mỗi đường
            chi tiết đều là câu chuyện của sự khéo léo và đam mê từ những bàn
            tay người thợ Việt Nam
          </p>
        </div>

        {/* Content Section - Image and Text */}
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Left - Image */}
          <div className="flex-1 ">
            <img
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=400&fit=crop"
              alt="Túi xách Việt Nam"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right - Content */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl text-white mb-6">
              Nghệ Thuật Túi Xách Việt Nam
            </h2>

            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Chúng tôi không chỉ tạo ra những chiếc túi, mà còn là những tác
                phẩm nghệ thuật ai dùng, kết hợp phần truyền thống bậc phẩm nghệ
                thuật của Việt Nam
              </p>
              <p>
                Mỗi thiết kế đều mang trong mình câu chuyện về sự sáng tạo và
                nhẫn trù bài của nghệ nhân, sử dụng tay và nhẫn trù bài của nghệ
                nhân, Việt Nam, hiện mỗi chiếc túi thành một nghệ thuật độc đáo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
