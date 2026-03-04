import Header from "./Header";
import Separator from "./Separator";
import Scrollimage from "./Scrollimage"
import '@fortawesome/fontawesome-free/css/all.min.css';
import Works from "./Works";
import gsap from "gsap";
import SplitType from "split-type";
import {  useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function  Home (){
    const [timeTick, SetTimeTick] = useState({s:null, h:null, m: null});
    const text_ref1 = useRef(null);
    const text_ref2 = useRef(null);
    const text_ref3 = useRef(null);
    const text_ref4 = useRef(null);
  

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            SetTimeTick({
            s: date.getSeconds(),
            h: date.getHours(),
            m: date.getMinutes(),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
      

    useEffect(() => {
        const split = new SplitType(text_ref1.current, {
        types: "words, chars",
        });
        
        gsap.set(split.chars, {
            color: "#535353", 
        });

        gsap.to(split.chars, {
            color: "#ffffff",
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
            scrollTrigger: {
                trigger: text_ref1.current,
                start: "top 80%",
            },
        });

        return () => {
        split.revert(); // important cleanup
        };
    }, []);
    useEffect(() => {
        const split = new SplitType(text_ref2.current, {
        types: "words, chars",
        });

        
            gsap.set(split.chars, {
                color: "#535353", 
            });
        setTimeout(()=>{
            gsap.to(split.chars, {
                color: "#ffffff",
                duration: 0.4,
                stagger: 0.02,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: text_ref2.current,
                    start: "top 80%",
                },
            });
        }, 600);

        return () => {
        split.revert(); // important cleanup
        };
    }, []);
    useEffect(() => {
        const split = new SplitType(text_ref3.current, {
        types: "words, chars",
        });
        
        gsap.set(split.chars, {
            color: "#535353", 
        });

        gsap.to(split.chars, {
            color: "#ffffff",
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
            scrollTrigger: {
                trigger: text_ref3.current,
                start: "top 80%",
            },
        });

        return () => {
        split.revert(); // important cleanup
        };
    }, []);
    useEffect(() => {
        const split = new SplitType(text_ref4.current, {
        types: "words, chars",
        });
        
        gsap.set(split.chars, {
            color: "#535353", 
        });

        gsap.to(split.chars, {
            color: "#ffffff",
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
            scrollTrigger: {
                trigger: text_ref4.current,
                start: "top 60%",
            },
        });
        ScrollTrigger.refresh();
        return () => {
        split.revert(); // important cleanup
        };
    }, []);
    

    
    
    return(
        <div>
            <section >    
                <Header/>
                <section className='hero_bg' id="hero">
                    <div className='hero_cnt_bg'>
                        <div className="hero_cnt_one" >
                            <p className="ptmy font_changa" ref={text_ref1}>Pleased to meet ya, I'm a</p>
                            <p className="fed font_changa" >Front - End Developer</p>
                            <p className="ieb font_changa" ref={text_ref2}>I enjoy building everything across the full stack, but what I'm most 
                            passionate about is creating something</p>
                            
                            <div className="iau_bg font_changa">
                                <p className="iau_i font_changa">IMPACTFUL</p>
                                <p className="iau_a font_changa">&</p>
                                <p className="iau_uf font_changa">USER-FACING</p>
                            </div>
                        </div>
                    </div>
                    
                    
                </section>


            </section>
            <section id="about">
                <div className="container " >
                    <div className="au_bg" >
                        <div className="au" >
                            <p className="au_cnt font_readex text_ani" ref={text_ref3}>Hey I’m Vijai working as a  frontend web developer with 
                                1 year of hands-on experience building responsive, user-focused web applications using 
                                HTML, CSS, and JavaScript. Alongside my professional work, I’ve independently learned  
                                MERN stack and built  full-stack projects.</p>
                        </div>
                    </div>
                </div>
            </section>


            <Separator />
            <section id="work">
                <div className="container" >
                    <div className="seperat_title_bg">
                        <h2  className="font_changa  seperat_title" >
                            PROFESSIONAL WORK
                        </h2>
                    </div>
                    <div className="pw_container">
                        <p className="au_cnt font_readex">
                            {/* These projects were built as part of my professional role as a Frontend Web Developer.  */}
                            {/* They reflect real-world requirements, collaboration with teams, and production-level 
                            constraints, with a focus on performance, usability, and clean UI implementation. */}
                            </p>
                    </div>
                    <Works/>
                </div>
            </section>
            {/* <Scrollimage/> */}
            <Separator/>
            <section>
                <div className="container">
                    <div className="seperat_title_bg">
                        <h2 className="font_changa  seperat_title" >
                            Full Stack Projects
                        </h2>
                    </div>
                    <div className="pw_container" >
                        <p className="au_cnt font_readex" ref={text_ref4}>While I primarily work as a frontend developer, I actively 
                        build MERN stack projects to deepen my full-stack understanding and deliver better 
                        end-to-end solutions.</p>
                    </div>
                    <div className="mern_bg">
                        <div>
                            <a href="https://geofy-client.onrender.com/" target="_blank">
                            <img src="../assets/geofy-img.png" alt="" />
                            </a>
                        </div>
                        <div>
                            <p className="mern_prj_desc font_readex" >Geofy is a full-stack Geofencing and Real-time Tracking application designed 
                            to monitor field agents as they visit specific properties. The system automates
                            the "Check-in" and "Check-out" process by detecting when an agent enters a 
                            50-meter radius of a target location using GPS coordinates.</p>
                            <p className="mern_tech_title font_readex">Technical Stack:</p>
                            <ul className="mern_tech_list font_readex">
                                <li>
                                    <p>Frontend: React.js, Leaflet.js (Maps), Axios, CSS3.</p>
                                </li>
                                <li>
                                    <p>Backend: Node.js, Express.js.</p>
                                </li>
                                <li>
                                    <p>Database: MongoDB (using 2dsphere indexing for geospatial calculations).</p>
                                </li>
                                <li className="mern_lnkbg">
                                    <a href="../assets/geofy documentation.pdf" target="_blank">Case Study</a>
                                    <a href="https://geofy-client.onrender.com/" target="_blank">Live Link</a>
                                    <a href="https://github.com/vijai-developer14/Geofy" target="_blank">Git Hub</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Separator />
            <section id="contact">
                <div className="container" >
                    <div className="seperat_title_bg">
                        <h2 className="font_changa  seperat_title" >
                            LETS WORK <br/>
                            <span className="lwt_span">TOGETHER</span>
                        </h2>
                    </div>
                    <div className="footer_bg">
                        <div className="footer_txt_bg">
                            <p className="au_cnt font_readex ft_cnt">Have a project, a deadline, or a bug that’s been staring at you for weeks?</p>
                            <p className="au_cnt font_readex ft_txt_2">I build clean interfaces, fix broken layouts, and turn JavaScript problems into working solutions..</p>
                        </div>
                        <div className="footer_links_bg">
                            <ul>
                                <li>
                                    <a href="mailto:vijaiv383@gmail.com" target="_blank" className="font_readex" >MAIL</a>
                                </li>
                                <li>
                                    <a href="www.linkedin.com/in/vijai-ranga-rajan" target="_blank" className="font_readex">LINKEDIN</a>
                                </li>
                                <li>
                                    <a href="https://github.com/vijai-developer14" target="_blank" className="font_readex">GIT HUB</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer_name">
                        <h1 className="font_changa">vijai</h1>
                    </div>
                    <div className="footer_foot_bg">
                        <a href="" className="tm">
                            <p  className="font_readex">CHENNAI, TN - { timeTick.h} : {timeTick.m} : {timeTick.s}</p>
                        </a>
                        
                        <p  className="font_readex dv">DEVELOPMENT - VIJAI</p>
                        
                        <a href="#hero"  className="font_readex">
                            <div className="uparrow_bg">
                                <FontAwesomeIcon icon={faArrowUp} size="1x"  />
                            </div>
                        </a>
                    </div>
                </div>
            </section>

        <div className="cv_bg">
            <a href="../assets/vijai_resume.pdf" className="font_changa" target="_blank">CV</a>
        </div>
        </div>
    );
}