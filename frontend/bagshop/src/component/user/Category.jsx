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
    <div className="bg-[#F4F0EB] min-h-screen  px-20 py-24">
      <div className="flex gap-6 text-center mb-8 ">
        <h1 className="text-5xl font-bold text-black">BỘ SƯU TẬP</h1>
        <p className=" mt-2 ">
          Khám phá những chiếc túi xa hoa, chuến nghệp và phong cách độc đáo để
          làm nổi bật cá tính riêng của bạn
        </p>
      </div>
      <div className="flex gap-2 justify-center items-start">
        {bags.map((bag, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-1/4 h-80 ${
              index % 2 === 0 ? "mt-8" : ""
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
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
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
