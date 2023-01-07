import React,{useState} from 'react'
import Carousel from 'react-multi-carousel';
import WithStyles from "react-multi-carousel"
import classes from "./Slider.module.css"
import BestSellingData from './Data/BestSellingbook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';

import image from "../Media/image.jpg"
function Slider() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const [BestSelling, setBestSelling] = useState(BestSellingData);
  console.log(BestSelling)
  return (
    <div>
      <div className={classes.heading}><span style={{fontSize:"2rem"}} >In-Demand</span><span style={{display:"flex"}}><span className={classes.link} style={{ fontSize:"1rem",display:"flex",cursor:"pointer"}}>View All</span><span><ArrowForwardIosTwoToneIcon /></span></span></div>
    <Carousel
    className={classes.crousal}
    swipeable={false}
    draggable={true}
    responsive={responsive}
    ssr={true} 
    infinite={true}
    autoPlaySpeed={1000}
    keyBoardControl={true}
    customTransition="all .5"
    transitionDuration={500}
    containerClass="carousel-container"
    itemClass="carousel-item-padding-40-px"
>
  {BestSelling.map((obj,index)=>{
     return(
      <div className={classes.card}>
      <img src={obj.coverpage} width="150px" height="240px"/>
      <span className={classes.title}>{obj.title}</span>
      <span className={classes.author}>{obj.author}</span>
      <span className={classes.price}>${obj.price}</span>
      <span className={classes.Action}>
        <span className={classes.hover}>ADD TO CART</span>
        <span><FavoriteBorderIcon className={classes.heart} fill="red" fontSize={"1.7rem"}  /></span>
      </span>
  
      </div>
     )
  })}
</Carousel>
</div>
  )
}

export default Slider