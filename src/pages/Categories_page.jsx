import { ClassNames } from '@emotion/react'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import classes from "./Categories_pages.module.css";
import BestSelling from '../Component/Data/BestSellingbook';
import { MdFavoriteBorder } from "react-icons/md"
import { User } from '../App';
import { doc, updateDoc } from "firebase/firestore";
import db from '../Component/Firbase';
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
    const obj1 = {
      ...LoggedInUserData, Cart: [...LoggedInUserData.Cart, obj]
    }
    setLoggedInUserData({ ...obj1 });
    const washingtonRef = doc(db, "User", LoggedInUserData.id);
    await updateDoc(washingtonRef, {
      Cart: obj1.Cart,
    });
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }} >{params.params}</h1>
      <div className={classes.Categories_container}>
        {Data.length != 0 &&
          Data.map((obj, index) => {

            return (
              <div className={classes.card}>
                <img src={obj.image} width="150px" height="240px" />
                <span className={classes.title}>{obj.title}</span>
                <span className={classes.author}>{obj.origin}</span>
                <span className={classes.price}>₹ {obj.price}</span>
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