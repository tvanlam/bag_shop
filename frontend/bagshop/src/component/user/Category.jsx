import React from "react";

const Category = () => {
  const bags = [
    {
      name: "Túi Casual",
      // image: "https://via.placeholder.com/300x400",
      size: "large",
    },
    {
      name: "Túi Văn Phòng",
      // image: "https://via.placeholder.com/300x300",
      size: "medium",
    },
    {
      name: "Túi Đa Hơi",
      // image: "https://via.placeholder.com/300x350",
      size: "medium",
    },
    {
      name: "Túi Sang Trọng",
      // image: "https://via.placeholder.com/300x300",
      size: "medium",
    },
    {
      name: "Túi Thiết Kế",
      // image: "https://via.placeholder.com/300x350",
      size: "medium",
    },
  ];

  return (
    <div className="bg-[#F4F0EB] min-h-[60vh] px-4 sm:px-8 lg:px-20 py-16 md:py-24">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
          BỘ SƯU TẬP
        </h1>
        <p className="mt-2 text-gray-700 max-w-xl mx-auto md:mx-0">
          Khám phá những chiếc túi xa hoa, chuến nghêp và phong cách độc đáo để
          làm nổi bật cá tính riêng của bạn
        </p>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
        {bags.map((bag, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full h-64 sm:h-72 ${
              index % 2 === 0 ? "mt-4 md:mt-8" : ""
            }`}
          >
            {bag.image ? (
              <img
                src={bag.image}
                alt={bag.name}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                {bag.name}
              </div>
            )}
            <div className="p-4 text-center">
              <p className="text-lg font-medium text-gray-800">{bag.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
