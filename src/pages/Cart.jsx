import React,{useContext} from 'react'
import classes from  "./Cart.module.css"
import { User } from '../App'
import { doc, updateDoc } from "firebase/firestore";
import { Button } from 'reactstrap';
import db from '../Component/Firbase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const {LoggedInUserData,setLoggedInUserData} = useContext(User)
console.log(LoggedInUserData,"LoggedinUser")
const Navigate=useNavigate()
let price=0;
for(let i=0;i<LoggedInUserData.Cart.length;i++){
  console.log(LoggedInUserData.Cart[i].price)
  console.log(LoggedInUserData.Cart[i])
  price= +(LoggedInUserData.Cart[i].price) + (price);
}
const Purchase=async()=>{
  const obj1 = {
    ...LoggedInUserData, Cart: []
  }
  setLoggedInUserData({ ...obj1 });
  const washingtonRef = doc(db, "User", LoggedInUserData.id);
  await updateDoc(washingtonRef, {
    Cart:[],
  });
  await Swal.fire({
    position: 'center',
    icon: 'sucess',
    title: `Order is on your way`,
    showConfirmButton: true,
  })
  Navigate("/")
}
return (
    <div className={classes.cont}>
    <div className={classes.cart_container}>

      {
        LoggedInUserData.Cart.map((obj,index)=>{
        return(
          <div className={classes.item}>
        <img src={obj.image} height={"100%"} width="150px" />
        <div className={classes.spec}>
        <h3>{obj.title}</h3>
        <h4>{obj.origin}</h4>
        <h5>₹ {obj.price}</h5>
        </div>
      </div>
        )
        })
      }
    </div>
    <div className={classes.total}>
      <h2>Subtotal:</h2>
      <h1 style={{marginTop:"15px"}}>₹ {price}</h1>
    </div>
    <Button onClick={Purchase} style={{backgroundColor:"black",color:"white" }}><span style={{transform: "rotate(90deg)"}}>Purchase</span></Button>
  </div>
  )
}

export default Cart