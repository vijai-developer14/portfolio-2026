import axios from "axios";
import {useState, useEffect, useRef} from "react";

export default function Works(){
    const [projectData, SetProjectData] = useState([]);
    const [mouseCoords, SetMouseCoords] = useState({x:0, y:0});
    const [isWorkCursor, SetIsWorkCursor] = useState(false);
    const [imgScale, SetImgScale] = useState({y:0});
    const [activateScale, SetActivateScale] = useState(false)
    const prjContainer = useRef();

    useEffect(()=>{
        const mouseMove = e=>SetMouseCoords({ x: e.clientX, y: e.clientY });
        const mouseEnter = ()=>{SetIsWorkCursor(true);}
        const mouseLeave = ()=>{SetIsWorkCursor(false);}
        
        window.addEventListener("mousemove", mouseMove);

        if(projectData.length !== 0){
        document.querySelectorAll(".work_img").forEach((x)=>{
            x.addEventListener("mouseenter", mouseEnter);
        });
        document.querySelectorAll(".work_img").forEach((x)=>{
            x.addEventListener("mouseleave", mouseLeave);
        });
        }
        return () => {
            window.removeEventListener("mousemove", mouseMove);
            document.querySelectorAll(".work_img").forEach((x)=>{
            x.removeEventListener("mouseenter", mouseEnter);
            });
          
        }
    },[projectData]);

    // onscroll scale
    // useEffect(()=>{
    //     const observer = new IntersectionObserver((entries)=>{
    //         entries.forEach((entry)=>{
    //             if(entry.isIntersecting){
    //                 SetActivateScale(true)
    //             }
    //         })
    //     },{threshold: 0.4});
    //     observer.observe(prjContainer.current) 
            
    //     const onScrollScale = ()=>{
    //         SetImgScale({y:window.scrollY});

    //     }
    //     window.addEventListener("scroll", onScrollScale)
    //     return()=>{
    //         observer.disconnect();
    //         window.removeEventListener("scroll", onScrollScale)
    //     }
    // },[projectData])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/work-projects-get-client`)
        .then((response)=>{
            SetProjectData(response.data)
        });
        
    },[])

    return(
        <div>
            {
                <div className="work_cursor" style={{ 
                    transform: `translate3d(${mouseCoords.x - 10}px, ${mouseCoords.y + 30}px, 0)`,
                    opacity:isWorkCursor ? 1 : 0 ,
                    transition: "transform 0.2s ease-out, opacity 0.3s ease-in" 
                    }}>
                    <p className="font_readex">• View Work</p>
                </div>
            }
            {
                projectData.length > 0 && ( 
                    <div className="proff_work_bg" >
                        {
                            projectData.map((item)=>(
                              <div className="proff_work_cnt_bg" key={item._id}>
                                <div className="work_img_bg">
                                    <a href={item.link} target="_blank">
                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`} alt=""  className="work_img"
                                        
                                        />
                                    </a>
                                </div>
                                <div className="prof_wrk_name_bg">
                                    <p className="font_readex" >{item.name}</p>
                                    <a href={item.link} className="font_readex" target="_blank">Live Link</a>
                                    
                                </div>
                                <p className="font_readex tech_stack">{item.stack}</p>
                            </div>  
                            ))
                        }
                    </div>
                )
            } 
        </div>
    );
}