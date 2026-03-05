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

        document.querySelectorAll(".work_img").forEach((x)=>{
            x.addEventListener("mouseenter", mouseEnter);
        });
        document.querySelectorAll(".work_img").forEach((x)=>{
            x.addEventListener("mouseleave", mouseLeave);
        });
        
        return () => {
            window.removeEventListener("mousemove", mouseMove);
                document.querySelectorAll(".work_img").forEach((x)=>{
                x.removeEventListener("mouseenter", mouseEnter);
            });
          
        }
    },[]);



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
            {/* {
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
            }  */}
            
                
                    <div className="proff_work_bg" >
                        
                            <div className="proff_work_cnt_bg box1">
                                <div className="work_img_bg">
                                    <a href="https://i5housing.com/" target="_blank">
                                        <img src="../assets/work-i5-housing.png"
                                         alt="Work - i5 Housing"  className="work_img"/>
                                    </a>
                                </div>
                                <div className="prof_wrk_name_bg">
                                    <p className="font_readex" >i5Housing and Properties</p>
                                    <a href="https://i5housing.com/" className="font_readex" target="_blank">Live Link</a>
                                    
                                </div>
                                <p className="font_readex tech_stack">(HTML5, CSS3, JavaScript E6+)</p>
                            </div>  

                            <div className="proff_work_cnt_bg box2">
                                <div className="work_img_bg">
                                    <a href="https://www.radiancerealty.in/" target="_blank">
                                        <img src="../assets/work-radiance.png"
                                         alt="Work - i5 Housing"  className="work_img"/>
                                    </a>
                                </div>
                                <div className="prof_wrk_name_bg">
                                    <p className="font_readex" >Radiance Realty</p>
                                    <a href="https://www.radiancerealty.in/" className="font_readex" target="_blank">Live Link</a>
                                    
                                </div>
                                <p className="font_readex tech_stack">(HTML5, CSS3, JavaScript E6+)</p>
                            </div> 

                            <div className="proff_work_cnt_bg box3">
                                <div className="work_img_bg">
                                    <a href="https://vgraohomes.in/" target="_blank">
                                        <img src="../assets/work-vgrao-homes.png"
                                         alt="Work - i5 Housing"  className="work_img"/>
                                    </a>
                                </div>
                                <div className="prof_wrk_name_bg">
                                    <p className="font_readex" >VG Rao Homes</p>
                                    <a href="https://vgraohomes.in/" className="font_readex" target="_blank">Live Link</a>
                                    
                                </div>
                                <p className="font_readex tech_stack">(HTML5, CSS3, JavaScript E6+)</p>
                            </div> 

                            <div className="proff_work_cnt_bg box4">
                                <div className="work_img_bg">
                                    <a href="https://www.chennailand.com/" target="_blank">
                                        <img src="../assets/work-chennailand.png"
                                         alt="https://www.chennailand.com/"  className="work_img"/>
                                    </a>
                                </div>
                                <div className="prof_wrk_name_bg">
                                    <p className="font_readex" >Chennailand</p>
                                    <a href="https://www.chennailand.com/" className="font_readex" target="_blank">Live Link</a>
                                    
                                </div>
                                <p className="font_readex tech_stack">(HTML5, CSS3, JavaScript E6+)</p>
                            </div> 
                        
                    </div>
                
            
            
        </div>
    );
}