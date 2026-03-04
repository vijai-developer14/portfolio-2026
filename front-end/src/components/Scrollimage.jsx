import { useEffect, useRef, useState } from "react";

export default function ScrollImage() {
  const [imgHeight, setImgHeight] = useState(100);
  const [activateScale, setActivateScale] = useState(false);
  const prjContainer = useRef(null);

  useEffect(() => {
    // 1. Intersection Observer to trigger activation
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActivateScale(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (prjContainer.current) observer.observe(prjContainer.current);

    // 2. Optimized Scroll Handler
    const onScrollScale = () => {
      if (!activateScale) return;

      // Get the element's position relative to the viewport
      const rect = prjContainer.current.getBoundingClientRect();
      
      // Calculate growth based on how much of the element has scrolled past
      // window.innerHeight - rect.top gives us a relative scroll value
      const scrollDelta = Math.max(0, window.innerHeight - rect.top);
      
      // Update state (adjust the 0.1 multiplier to change speed)
      setImgHeight(100 + scrollDelta * 0.1);
    };

    window.addEventListener("scroll", onScrollScale, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollScale);
    };
  }, [activateScale]); // Re-run effect when activation status changes

  return (
    <div style={{ height: "150vh", paddingTop: "50vh" }}> {/* Spacer for testing */}
      <img
        ref={prjContainer}
        src="./assets/cursor-trail-3.png"
        alt="Scrolling effect"
        style={{
          height: `${imgHeight}px`,
          width: "auto",
          transition: "height 0.3s ease-out", // Smooths the "jagged" scroll updates
          willChange: "height" // Tells browser to optimize for this change
        }}
      />
    </div>
  );
}