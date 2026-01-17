import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import jsonData from "../../data/data.json";

export default function FeaturedArticles() {
  const zx9 = jsonData.find(item => item.name === "ZX9 Speaker");
  const zx7 = jsonData.find(item => item.name === "ZX7 Speaker");
  const yx1 = jsonData.find(item => item.slug === "yx1-earphones");

  // Refs and state for Intersection Observer
  const zx9Ref = useRef(null);
  const zx7Ref = useRef(null);
  const yx1Ref = useRef(null);

  const [zx9Visible, setZx9Visible] = useState(false);
  const [zx7Visible, setZx7Visible] = useState(false);
  const [yx1Visible, setYx1Visible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === zx9Ref.current) setZx9Visible(entry.isIntersecting);
          if (entry.target === zx7Ref.current) setZx7Visible(entry.isIntersecting);
          if (entry.target === yx1Ref.current) setYx1Visible(entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    if (zx9Ref.current) observer.observe(zx9Ref.current);
    if (zx7Ref.current) observer.observe(zx7Ref.current);
    if (yx1Ref.current) observer.observe(yx1Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ZX9 Speaker */}
      <div
        ref={zx9Ref}
        className={`mx-auto bg-orange-400 flex rounded-lg flex-col items-center justify-center mt-24
          transition-all duration-700 ease-out
          ${zx9Visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"}
        `}
      >
        <div className="py-14 text-center px-6 flex flex-col items-center sm:w-full lg:flex-row lg:overflow-hidden bg-[url('/assets/home/desktop/pattern-circles.svg')] bg-top bg-cover">
          <img src="/assets/shared/desktop/image-category-thumbnail-speakers.png" className="h-auto lg:-mb-56" />
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start lg:text-left">
            <h2 className="uppercase text-white font-bold text-4xl">
              zx9<br />speaker
            </h2>
            <p className="text-white text-base mt-6">
              Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
            </p>
            <Link to={`details/${zx9.id}`}>
              <button className="tracking-wider bg-slate-950 hover:bg-slate-800 text-slate-50 py-3.5 px-7 mt-10 uppercase">
                see product
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ZX7 Speaker */}
      <div
        ref={zx7Ref}
        className={`mx-auto flex flex-col items-start justify-center my-6
          transition-all duration-700 ease-out
          ${zx7Visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"}
        `}
      >
        <div className="px-6 sm:pl-10 py-24 w-full rounded-lg bg-[url('/assets/home/mobile/image-speaker-zx7.jpg')] 
                        sm:bg-[url('/assets/home/tablet/image-speaker-zx7.jpg')] 
                        lg:bg-[url('/assets/home/desktop/image-speaker-zx7.jpg')] bg-cover bg-center">
          <h2 className="uppercase text-slate-950 font-bold text-3xl">zx7 speaker</h2>
          <Link to={`details/${zx7.id}`}>
            <button className="tracking-wider bg-transparent border border-slate-950 font-bold uppercase text-slate-950 py-3.5 px-7 mt-10 hover:bg-slate-950 hover:text-white">
              see product
            </button>
          </Link>
        </div>
      </div>

      {/* YX1 Earphones */}
      <section
        ref={yx1Ref}
        className={`flex flex-col sm:flex-row justify-center gap-4
          transition-all duration-700 ease-out
          ${yx1Visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"}
        `}
      >
        <div className="py-24 sm:py-40 w-full sm:w-1/2 rounded-lg bg-[url('/assets/home/mobile/image-earphones-yx1.jpg')] 
                        sm:bg-[url('/assets/home/tablet/image-earphones-yx1.jpg')] 
                        lg:bg-[url('/assets/home/desktop/image-earphones-yx1.jpg')] bg-cover bg-center">
        </div>
        <div className="px-6 sm:pl-10 py-9 sm:py-24 w-full rounded-lg bg-zinc-100 sm:w-1/2">
          <h2 className="uppercase text-slate-950 font-bold text-3xl">YX1 earphones</h2>
          <Link to={`details/${yx1.id}`}>
            <button className="tracking-wider bg-transparent border border-slate-950 font-bold uppercase text-slate-950 py-3.5 px-7 mt-10 hover:bg-slate-950 hover:text-white">
              see product
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
