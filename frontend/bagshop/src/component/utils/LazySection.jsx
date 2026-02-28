import React, { useState, useEffect, useRef } from "react";

/**
 * Chỉ render children khi section lọt vào viewport (lazy load cho trang chủ).
 * Dùng Intersection Observer, có placeholder tối thiểu để tránh layout shift.
 */
const LazySection = ({ children, minHeight = "200px", rootMargin = "100px" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: `${rootMargin} 0px`, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazySection;
