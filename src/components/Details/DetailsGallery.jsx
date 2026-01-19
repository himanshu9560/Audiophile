import { useState, useEffect, useRef } from "react";
import SeeProductBtn from "../Shared/SeeProductBtn";
import { Link } from "react-router-dom";
import jsonData from "../../data/data.json";

export default function DetailsGallery({ product, gallery, others }) {
  const [currentSize, setCurrentSize] = useState("base");

  // --- RECENTLY VIEWED TRACKING ---
  useEffect(() => {
    if (!product) return;

    const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    // Remove current product if already in array
    const filtered = viewed.filter((p) => p.id !== product.id);

    // Add current product to the beginning
    filtered.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });

    // Keep only the latest 5
    const latest = filtered.slice(0, 5);

    // Save back to localStorage
    localStorage.setItem("recentlyViewed", JSON.stringify(latest));
  }, [product]);
  // --- END RECENTLY VIEWED ---

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

  // ... rest of your existing code (background styles, otherElements, rendering)
}
