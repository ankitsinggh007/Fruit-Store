import React,{useContext, useState} from 'react'
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
const [Contact, setContact] = useState({
  Phone:"",
  Address:""
})
const Navigate=useNavigate()
let price=0;
for(let i=0;i<LoggedInUserData.Cart.length;i++){
  console.log(LoggedInUserData.Cart[i].price)
  console.log(LoggedInUserData.Cart[i])
  price= +(LoggedInUserData.Cart[i].price) + (price);
}
const Purchase=async()=>{
  if(LoggedInUserData.isAuthrized){
    
    if(Contact.Address==""||Contact.Phone.length<10){
      await Swal.fire({
        position: 'center',
        icon: 'sucess',
        title: `pleases fill all required Field  correclty`,
        showConfirmButton: true,
      })
    }
    else{
      await Swal.fire({
        position: 'center',
        icon: 'sucess',
        title: `Order is on your way to your ${Contact.Address} address and confirmation will be send to ${Contact.Phone} no.`,
        showConfirmButton: true,

      })
      const obj1 = {
        ...LoggedInUserData, Cart: []
      }
      setLoggedInUserData({ ...obj1 });
      const washingtonRef = doc(db, "User", LoggedInUserData.id);
      await updateDoc(washingtonRef, {
        Cart:[],
      });
      Navigate("/")
    }
  }
  else{
    await Swal.fire({
      position: 'center',
      icon: 'error',
      title: `Please log in to continue`,
      showConfirmButton: true,
    })
    Navigate("/login")
  }
}
return (
    <div className={classes.cont}>
    <div className={classes.cart_container}>

      {LoggedInUserData.Cart.length!==0&&
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
      {
        LoggedInUserData.Cart.length==0 &&
        <div className={classes.nodata}>
          <span>Add Something to it</span>
        </div>
      }
    </div>
   
    <div className={classes.inut}>
    <div className={classes.total}>
      <h2>Subtotal:</h2>
      <h1 style={{marginTop:"15px"}}>₹ {price}</h1>
    </div>
      <label>Address</label>
      <input type="text" value={Contact.Address} onChange={e => setContact({...Contact,Address:e.target.value})}/>
      <label>Phone no.</label>
      <input type="text" value={Contact.Phone} onChange={e => setContact({...Contact,Phone:e.target.value})}/>
      <Button onClick={Purchase} style={{backgroundColor:"black",color:"white",padding:"10px 0px",borderRadius:"5px" }}><span style={{transform: "rotate(90deg)"}}>Purchase</span></Button>

    </div>
      
  </div>
  )
}

export default Cart