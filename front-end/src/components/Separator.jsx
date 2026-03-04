import { useEffect, useRef, useState } from "react";

export default function Separator (){
    const containerRef = useRef(null);

    useEffect(() => {
        const separatorAni = (container) => {
        const allBox = container.querySelectorAll(".colors_ani_bg span");
        allBox.forEach((box, boxIndex) => {
            setTimeout(() => {
            box.classList.add("colors_box_full_width");
            }, boxIndex * 0.3 * 300);
        });
        };

        // 3. Setup the Observer
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                separatorAni(entry.target);
                observer.unobserve(entry.target);
            }
            });
        },
        { threshold: 0.5 }
        );

        if (containerRef.current) {
        observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);
    return(
        <div>
            <section>
                <div className="colors_ani_bg" ref={containerRef}>
                    <span className="colors_box_1"></span>
                    <span className="colors_box_2"></span>
                    <span className="colors_box_3"></span>
                    <span className="colors_box_4"></span>
                    <span className="colors_box_5"></span>
                    <span className="colors_box_6"></span>
                    <span className="colors_box_7"></span>
                </div>
                
            </section>
        </div>
    );
}