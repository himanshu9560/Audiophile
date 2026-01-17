import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomeArticle({ name }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // Animate only once
        }
      },
      { threshold: 0.25 } // trigger when 25% of the card is visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`
        w-full flex flex-col bg-gray-100 text-center rounded-lg mt-20 md:mt-0 p-6
        transition-transform transition-opacity duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"}
      `}
    >
      <Link to={`/category/${name}`}>
        <img
          alt={name}
          className="mx-auto w-40 h-auto -mt-20 md:-mt-24"
          src={`/assets/shared/desktop/image-category-thumbnail-${name}.png`}
          style={{ color: "transparent" }}
        />

        <div className="mt-auto">
          <h3 className="heading-3 uppercase tracking-widest">{name}</h3>

          <a href="">
            <button
              type="button"
              className="flex items-center gap-1 mx-auto px-4 py-2 text-dark-900 font-bold tracking-wider subtitle opacity-50 hover:text-primary-700 hover:opacity-100"
            >
              SHOP
              <img
                alt="Arrow Icon"
                width={8}
                height={16}
                decoding="async"
                data-nimg={1}
                className="inline"
                style={{ color: "transparent" }}
                src="/assets/shared/desktop/icon-arrow-right.svg"
              />
            </button>
          </a>
        </div>
      </Link>
    </div>
  );
}
