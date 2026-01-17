import { useState, useEffect, useRef } from "react";
import SeeProductBtn from "../Shared/SeeProductBtn";
import { Link } from "react-router-dom";
import jsonData from "../../data/data.json";

export default function DetailsGallery({ gallery, others }) {
  const [currentSize, setCurrentSize] = useState("base");

  // Refs for animation
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const othersRef = useRef(null);

  const [firstVisible, setFirstVisible] = useState(false);
  const [secondVisible, setSecondVisible] = useState(false);
  const [thirdVisible, setThirdVisible] = useState(false);
  const [othersVisible, setOthersVisible] = useState(false);

  // Intersection Observer for all sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === firstRef.current) setFirstVisible(entry.isIntersecting);
          if (entry.target === secondRef.current) setSecondVisible(entry.isIntersecting);
          if (entry.target === thirdRef.current) setThirdVisible(entry.isIntersecting);
          if (entry.target === othersRef.current) setOthersVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    if (firstRef.current) observer.observe(firstRef.current);
    if (secondRef.current) observer.observe(secondRef.current);
    if (thirdRef.current) observer.observe(thirdRef.current);
    if (othersRef.current) observer.observe(othersRef.current);

    return () => observer.disconnect();
  }, []);

  // Media query detection
  const mediaQueries = {
    tablet: "(min-width: 640px)",
    desktop: "(min-width: 1024px)",
  };

  useEffect(() => {
    const updateSize = () => {
      if (window.matchMedia(mediaQueries.desktop).matches) setCurrentSize("desktop");
      else if (window.matchMedia(mediaQueries.tablet).matches) setCurrentSize("tablet");
      else setCurrentSize("base");
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Background styles
  const backgroundStyleFirst = {
    backgroundImage: `url('${
      currentSize === "desktop"
        ? gallery.first.desktop.slice(1)
        : currentSize === "tablet"
        ? gallery.first.tablet.slice(1)
        : gallery.first.mobile.slice(1)
    }')`,
  };

  const backgroundStyleSecond = {
    backgroundImage: `url('${
      currentSize === "desktop"
        ? gallery.second.desktop.slice(1)
        : currentSize === "tablet"
        ? gallery.second.tablet.slice(1)
        : gallery.second.mobile.slice(1)
    }')`,
  };

  const backgroundStyleThird = {
    backgroundImage: `url('${
      currentSize === "desktop"
        ? gallery.third.desktop.slice(1)
        : currentSize === "tablet"
        ? gallery.third.tablet.slice(1)
        : gallery.third.mobile.slice(1)
    }')`,
  };

  const otherStyles = others.map((item) => ({
    backgroundImage: `url('${
      currentSize === "desktop"
        ? item.image.desktop.slice(1)
        : currentSize === "tablet"
        ? item.image.tablet.slice(1)
        : item.image.mobile.slice(1)
    }')`,
  }));

  // Render "You may also like" cards with staggered animation
  const otherElements = others.map((item, index) => (
    <div
      key={`other${index}`}
      className="flex flex-col items-center w-full sm:w-1/3 gap-8 transition-all duration-700 ease-out"
      style={{
        opacity: othersVisible ? 1 : 0,
        transform: othersVisible
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.9)", // stronger animation
        transitionDelay: othersVisible ? `${index * 150}ms` : "0ms", // staggered
      }}
    >
      <div
        className="py-16 sm:py-44 w-full bg-cover bg-center rounded-lg"
        style={otherStyles[index]}
      ></div>
      <h2>{item.name}</h2>
      <Link
        to={`/details/${jsonData.filter((object) => object.slug === item.slug)[0].id}`}
        className="mb-14"
      >
        <SeeProductBtn />
      </Link>
    </div>
  ));

  return (
    <>
      {/* Main Gallery */}
      <div className="flex flex-col items-start gap-6 mt-6 mb-16 sm:mb-20 w-full sm:flex-row sm:items-stretch">
        <div className="w-full flex flex-col gap-6">
          <div
            ref={firstRef}
            className="w-full py-24 rounded-lg bg-cover bg-center transition-all duration-700 ease-out"
            style={{
              ...backgroundStyleFirst,
              opacity: firstVisible ? 1 : 0,
              transform: firstVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
            }}
          ></div>
          <div
            ref={secondRef}
            className="w-full py-24 rounded-lg bg-cover bg-center transition-all duration-700 ease-out"
            style={{
              ...backgroundStyleSecond,
              opacity: secondVisible ? 1 : 0,
              transform: secondVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
            }}
          ></div>
        </div>
        <div
          ref={thirdRef}
          className="w-full py-48 rounded-lg bg-cover bg-center transition-all duration-700 ease-out"
          style={{
            ...backgroundStyleThird,
            opacity: thirdVisible ? 1 : 0,
            transform: thirdVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
          }}
        ></div>
      </div>

      {/* You may also like */}
      <h2 className="my-10">You may also like</h2>
      <div
        ref={othersRef}
        className="flex flex-col items-center mt-6 mb-16 sm:mb-20 w-full sm:flex-row sm:items-stretch sm:gap-6"
      >
        {otherElements}
      </div>
    </>
  );
}
