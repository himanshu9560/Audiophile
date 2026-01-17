import { useEffect, useRef, useState } from "react"
import HomeArticle from "./HomeArticle"

export default function ArticlesSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`
        mx-auto w-full flex flex-col items-center justify-center
        sm:flex-row sm:items-stretch sm:gap-3 sm:my-24

        transition-all duration-700 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-90"
        }
      `}
    >
      {/* CARD 1 */}
      <div className="w-full sm:flex-1 h-full">
        <div className="h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
          <HomeArticle name={"headphones"} />
        </div>
      </div>

      {/* CARD 2 */}
      <div className="w-full sm:flex-1 h-full">
        <div className="h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
          <HomeArticle name={"speakers"} />
        </div>
      </div>

      {/* CARD 3 */}
      <div className="w-full sm:flex-1 h-full">
        <div className="h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
          <HomeArticle name={"earphones"} />
        </div>
      </div>
    </section>
  )
}
