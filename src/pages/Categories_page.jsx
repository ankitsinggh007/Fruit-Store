import { ClassNames } from '@emotion/react'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import classes from "./Categories_pages.module.css";
import BestSelling from '../Component/Data/BestSellingbook';
import { MdFavoriteBorder } from "react-icons/md"
import { User } from '../App';
import { doc, updateDoc } from "firebase/firestore";
import db from '../Component/Firbase';
import {MdLocalOffer} from "react-icons/md"
import {TbTruckDelivery} from "react-icons/tb"
import {MdOutlineProductionQuantityLimits} from "react-icons/md"
import {FaMapMarkerAlt} from "react-icons/fa"
import Swal from 'sweetalert2';
function Categories_page() {
  const { LoggedInUserData, setLoggedInUserData } = useContext(User)
  const Navigate = useNavigate();

  const API_KEY = `AIzaSyCFwMBb4r146zfcv-IrdUn-vk8_asDkvck`;
  const [Data, setData] = useState([]);
  const params = useParams();
  const [Like, setLike] = useState("");
  console.log(params)
  useEffect(() => {

    const array = BestSelling.filter(obj => obj.category == params.params);
    setData([...array]);
  }, []);
  const AddToCart = async (obj, e) => {
    if(LoggedInUserData.isAuthrized){
    const obj1 = {
      ...LoggedInUserData, Cart: [...LoggedInUserData.Cart, obj]
    }
    setLoggedInUserData({ ...obj1 });
    const washingtonRef = doc(db, "User", LoggedInUserData.id);
    await updateDoc(washingtonRef, {
      Cart: obj1.Cart,
    });}
    else{
      await Swal.fire({
        position: 'center',
        icon: 'error',
        title: `please Login`,
        showConfirmButton: true,
      })
      Navigate("/login")
    }
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }} >{params.params}</h1>
      <div className={classes.Categories_container}>
        {Data.length != 0 &&
          Data.map((obj, index) => {

            return (
              <div className={classes.card}>
                <img src={obj.image} width="150px"  height="240px" />
                <span className={classes.title}>{obj.title}</span>
                {obj.categories && <span className={classes.Discount}><MdLocalOffer fill="yellow"/> &nbsp;20% off</span>}
                <span className={classes.author}><FaMapMarkerAlt/>{obj.origin}</span>
                {obj.categories && <span className={classes.Deliver}><TbTruckDelivery fill="black"/>same day delivered</span>}

                <span className={classes.price}>₹ {obj.price}</span>
                {obj.categories && <span className={classes.Qantity}><MdOutlineProductionQuantityLimits/> {obj.categories[2]}</span>}

                <span className={classes.Action}>
                  <span className={classes.hover} onClick={(e) => AddToCart(obj, e)} >ADD TO CART</span>
                </span>

              </div>
            )

          })
        }
      </div>
    </>

  )
}

export default Categories_page