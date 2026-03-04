import React, {useEffect, useState} from "react";

export default function  Header ({getSound}){
    const [menuActive, SetmenuActive] = useState(false);
    const [menuReveal, SetmenuReveal] = useState(false);
    const menuClick = ()=>{
        if(menuActive){
            SetmenuReveal(false)
            setTimeout(()=>{
                SetmenuActive(false)
            },200)
        }
        else{
            SetmenuActive(true)
            setTimeout(()=>{
                SetmenuReveal(true)
            },200)
        }
    }
     const heroClick = ()=>{
            if(menuActive){
                SetmenuReveal(false)
                SetmenuActive(false);
                
            }
    }
    
    return(
        <div>
            <header id="navbar-example">
                <div className="container_header">
                    <div className="header_bg">  
                        <div className="logo_bg">
                            <a href="#hero">
                                <p className="font_changa" onClick={heroClick}  >VIJAI</p>
                            </a>
                        </div>
                        <div className="header_list">
                            <a href="#about" className="header_menu_hover">
                                <p className="font_readex " >ABOUT</p>
                                <p className="font_readex " >ABOUT</p>
                            </a>
                            <a href="#work" className="header_menu_hover">
                                <p className="font_readex ">WORK</p>
                                <p className="font_readex ">WORK</p>
                            </a>
                            <a href="#contact" className="header_menu_hover">
                                <p className="font_readex " >CONTACT</p>
                                <p className="font_readex " >CONTACT</p>
                            </a>
                            
                        </div>
                        <div className="header_list_mob">
                            <div className = {`menu_mob ${menuActive ? "menuActive" : ""}` } >
                                <div className="menu_mob_span" onClick={menuClick}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className="menu_list_mob">
                                    <a href="#about" onClick={menuClick}>
                                        <p className={`font_readex ${menuReveal ? "menu_list_mob_reveal" : null}`}>ABOUT</p>
                                    </a>
                                    <a href="#work" onClick={menuClick}>
                                        <p className={`font_readex ${menuReveal ? "menu_list_mob_reveal" : null}`}>WORK</p>
                                    </a>
                                    <a href="#contact" onClick={menuClick}>
                                        <p className={`font_readex ${menuReveal ? "menu_list_mob_reveal" : null}`}>CONTACT</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </header>
        </div>
    );
}