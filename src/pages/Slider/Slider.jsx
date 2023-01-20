import React, { Component } from "react";
import Slider from 'react-slick';
import classes from "./Slider.module.css"

const Slide=(props)=>{
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
      speed: 3000,
      autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const settings1= {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      pauseOnHover: true,
      
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if(props?.Category==="image"){
    return (
      <div className={classes.container}>
        <Slider {...settings} style={{height:"60vh"}}>
          {
            props.data.map((slide, index)=>{
              return (
                <div key={index} >
                  <img src={slide} style={{margin:"auto"}} height="400vh"  width="90%"/>
                </div>
              )
            })
          }
        </Slider>
      </div>
    );
        }
        else{
          return (
            <div className={classes.container}>
              <Slider {...settings} style={{height:"40vw",margin:"auto"}}>
                {
                  props.data.map((slide, index)=>{
                    return (
                      <div key={index} >
                        <img src={slide} style={{margin:"auto"}}   width="85vw"/>
                      </div>
                    )
                  })
                }
              </Slider>
            </div>
          );
        }
  
  }
  export default Slide;