import React,{useContext} from 'react'
import classes from  "./Cart.module.css"
import { User } from '../App'
import { doc, updateDoc } from "firebase/firestore";

function Cart() {
  const {LoggedInUserData,setLoggedInUserData} = useContext(User)
console.log(LoggedInUserData,"LoggedinUser")
  return (
    <div className={classes.cont}>
    <div className={classes.cart_container}>

      {
        LoggedInUserData.Cart.map((obj,index)=>{
        return(
          <div className={classes.item}>
        <img src={obj.thumbnail} height={"100%"} width="150px" />
        <div className={classes.spec}>
        <h3>{obj.title}</h3>
        <h4>{obj.author}</h4>
        <h5>₹200</h5>
        </div>
      </div>
        )
        })
      }
    </div>
    <div className={classes.total}>
      <h2>Subtotal:</h2>
      <h1 style={{marginTop:"15px"}}>₹{LoggedInUserData.Cart.length*200}</h1>
    </div>
  </div>
  )
}

export default Cart