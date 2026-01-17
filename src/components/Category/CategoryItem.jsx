import { useState, useEffect, useRef } from "react";
import SeeProductBtn from "../Shared/SeeProductBtn";
import { Link } from "react-router-dom";

export default function CategoryItem({
  mobile,
  tablet,
  desktop,
  name,
  description,
  index,
  id,
  category,
}) {
  const [currentSize, setCurrentSize] = useState("base");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Media queries
  const mediaQueries = {
    tablet: "(min-width: 640px)",
    desktop: "(min-width: 1024px)",
  };

  // Responsive image logic
  useEffect(() => {
    const updateSize = () => {
      if (window.matchMedia(mediaQueries.desktop).matches) {
        setCurrentSize("desktop");
      } else if (window.matchMedia(mediaQueries.tablet).matches) {
        setCurrentSize("tablet");
      } else {
        setCurrentSize("base");
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 🔥 POPUP SCROLL ANIMATION (same as ArticlesSection)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Background image
  const backgroundStyle = {
    backgroundImage: `url('${
      currentSize === "desktop"
        ? desktop.slice(1)
        : currentSize === "tablet"
        ? tablet.slice(1)
        : mobile.slice(1)
    }')`,
  };

  const rowType = index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse";

  return (
    <div
      ref={sectionRef}
      className={`
        w-full mt-16 mb-20 flex flex-col items-center
        text-center lg:gap-8 ${rowType}

        transition-all duration-700 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
        }
      `}
    >
      {/* IMAGE */}
      <div
        className="h-[22rem] lg:h-[28rem] w-full rounded-lg bg-cover bg-center lg:w-1/2"
        style={backgroundStyle}
      />

      {/* CONTENT */}
      <div className="flex flex-col items-start gap-6 mt-6 lg:w-1/2 text-left">
        {id === 4 && (
          <p className="text-orange-400 text-sm font-normal uppercase tracking-[10px]">
            NEW PRODUCT
          </p>
        )}
        <h2>{name}</h2>
        <p className="text-base opacity-50">{description}</p>

        <Link
          to={`/details/${id}`}
          state={{ category }}
        >
          <SeeProductBtn />
        </Link>
      </div>
    </div>
  );
}
