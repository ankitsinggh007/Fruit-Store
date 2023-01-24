import React from 'react'
import classes from "./MainBody.module.css"
import TBC from "../Media/TBC.png"
import banner from "../Media/banner.png";
import {Button, TextField} from "@mui/material"
import Creative from "../Media/freshF.webp"
import Bio from "../Media/vegetableF.webp"
import Story from "../Media/Story.svg"
import { NavLink } from 'react-router-dom';
import Novel from "../Media/Novel.svg"
import Kids from "../Media/Kids.svg"
import Horror from "../Media/Horror.svg"
import Crime from "../Media/Crime.svg"
import Romance from "../Media/exoticF.webp"
import health from "../Media/organicF.webp"
import Food from "../Media/organicV.webp"
import Religion from "../Media/Religion.svg"
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import { positions } from '@mui/system';
import Slider from "./Slider"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import {Link, useNavigate} from "react-router-dom";
import  Slider1 from "../pages/Slider"

export const categories=[
  {
    id:1,
    color:"2,176,78",
    icon:Creative,
    subtitle:"Fresh Fruits ",
  },
  
  {
    id:2,
    color:"239,32,77",
    icon:Romance,
    subtitle:"Exotic Fruits",
  },
  
  {
    id:4,
    color:`226,145,168`,
    icon:health,
    subtitle:"Organic Fruits",
  },
  
];

function MainBody() {
  const navigate=useNavigate();
const data=["https://www.bigbasket.com/media/uploads/banner_images/L1-YXNP10931-1200X300-30thDEC22.jpg","https://www.bigbasket.com/media/uploads/banner_images/L1-YXNP11127-1200X300-16thJAN23.jpg","https://www.bigbasket.com/media/uploads/banner_images/L1-YXNP8603-1200X300-5thDEC22.jpg"]
  const obj=categories.filter((obj,index)=>index<5);
  
  return (
    <>
    <div className={classes.section1}>
      <Slider1 Category="image" data={data}  />
    </div>
    <div className={classes.section2}>
      <div className={classes.header}><span style={{fontSize:"2rem"}}>Categories</span><Link to={"/categories"} style={{textDecoration:"none", color:"black"}}><span className={classes.link} style={{fontSize:"1rem",display:"flex",cursor:"pointer"}}><span>All Categories</span><span><ArrowForwardIosTwoToneIcon /></span></span></Link></div>
      <div className={classes.categories}>
        {
          obj.map((obj,index)=>{
        return(
               <div className={classes.cat_items} onClick={()=>navigate(`/categories/${obj.subtitle}`)} style={{backgroundColor: `rgba(${obj.color} ,.60)`}}>
                <img className={classes.cat_items_icons} src={obj.icon} width="35%"/>
                <h2>{obj.subtitle}</h2>
                <h3 >Shop Now</h3>
                </div>
                
              )
          })
        }
      </div>
    </div>
    <Slider/>
    <hr/>
    
    <div className={classes.footer}>
      <div className={classes.details}>
        <div className={classes.image}></div>
        <div>Nikita & Mantesh</div>
<div className={classes.contact}><div>mmbetgari05@gmail.com</div>
<div>8095498152</div></div>
      </div>
      <div style={{alignSelf:"flex-end"}}><span>	&#169; 2022-2023 The fruit Avenue|All  right reserved</span></div>
      <div className={classes.Explore}>
      <h3>Explore</h3>
        <NavLink to="/login" style={{textDecoration:"none",color:"black"}}>Signin/join</NavLink>
      </div>
      <div className={classes.Categories}>
        <h3>Categories</h3>
        <NavLink style={{textDecoration:"none",color:"black"}} to="/categories/Fresh Fruits">Fresh Fruits</NavLink>
        <NavLink to="/categories/Exotic Fruits" style={{textDecoration:"none",color:"black"}}>Exotics Fruits</NavLink>
        <NavLink to="/categories/Organic Fruits" style={{textDecoration:"none",color:"black"}}>Organic Fruit</NavLink>
      </div>
    </div>
    </>
  )
}

export default MainBody;