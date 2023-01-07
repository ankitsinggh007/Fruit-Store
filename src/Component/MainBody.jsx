import React from 'react'
import classes from "./MainBody.module.css"
import TBC from "../Media/TBC.png"
import banner from "../Media/banner.png";
import {Button, TextField} from "@mui/material"
import Creative from "../Media/freshF.webp"
import Bio from "../Media/vegetableF.webp"
import Story from "../Media/Story.svg"
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
import {Link} from "react-router-dom";

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
    id:3,
    color:`254,131,77`,
    icon:Bio,
    subtitle:"Fresh Vegetables",
  },
  {
    id:4,
    color:`226,145,168`,
    icon:health,
    subtitle:"Organic Fruit",
  },
  {
    id:5,
    color:`255,213,158`,
    icon:Food,
    subtitle:"Organic Vegetables",
  },
  
  
];

function MainBody() {

  const obj=categories.filter((obj,index)=>index<5);
  
  return (
    <>
    <div className={classes.section1}>
        
    </div>
    <div className={classes.section2}>
      <div className={classes.header}><span style={{fontSize:"2rem"}}>Categories</span><Link to={"/categories"} style={{textDecoration:"none", color:"black"}}><span className={classes.link} style={{fontSize:"1rem",display:"flex",cursor:"pointer"}}><span>All Categories</span><span><ArrowForwardIosTwoToneIcon /></span></span></Link></div>
      <div className={classes.categories}>
        {
          obj.map((obj,index)=>{
        return(
               <div className={classes.cat_items} style={{backgroundColor: `rgba(${obj.color} ,.60)`}}>
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
        <div><img src={TBC} width="150"/></div>
        <div>1418 XXXXXYYYYYYY</div>
<div className={classes.contact}><div>as3824115@gmail.com</div>
<div>9784578456</div></div>
        <div className={classes.social}><FacebookIcon/><InstagramIcon/><YouTubeIcon/><TwitterIcon/></div>
      </div>
      <div className={classes.Explore}>
      <h3>Explore</h3>
        <div>About us</div>
        <div>Sitemap</div>
        <div>Bookmarks</div>
        <div>Signin/join</div>
      </div>
      <div className={classes.Categories}>
        <h3>Categories</h3>
        <div>Fresh Fruits</div>
        <div>Exotics Fruits</div>
        <div>fresh Vegetable</div>
        <div>Organic Fruit</div>
        <div>Organic Vegetable</div>
      </div>
    </div>
    </>
  )
}

export default MainBody;