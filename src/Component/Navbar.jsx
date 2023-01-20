import { Button } from '@mui/material'
import React,{useState,useContext} from 'react'
import {Avatar} from '@mui/material';
import { User } from '../App';
import {TextField} from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {SearchIcon} from '@mui/icons-material';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import classes from "./Navbar.module.css"
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import tbc from "../Media/TBC.png"
import { Link } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import { display } from '@mui/system';
function Navbar() {
const {LoggedInUserData, setLoggedInUserData,createUser}=useContext(User);
  console.log(LoggedInUserData)
  const [Style, setStyle] = useState("none");

  const Toggle=()=>{
    if(LoggedInUserData?.isAuthrized){
      if(Style=="none"){
        setStyle("");

      }
      else if(Style==""){
        setStyle("none")
      }
    }

  }
  const Logout=()=>{
      setLoggedInUserData(
        {id:"",firstName:"",lastName:"",email:"",Gender:"",isAuthrized:false,Liked:[],Cart:[],isbpn:[],isbpn_Cart:[]}
      ) 
  }





  return (
    <div className={classes.container}>
     <Link to="/" style={{color:"black",textDecoration:"none"}}><div className={classes.Logo} >
     <span className={classes.logo}><img src={tbc} className={classes.image} /></span>
        <span className={classes.Name}> &nbsp;The Fruit Avenue</span>
     </div></Link>
     
     
     <span className={classes.cat}><Link to={"/categories"} style={{textDecoration:"none", color:"black"}}><span>Categories</span></Link></span>
     <Link to={"/cart"} className={classes.cart}><Link to={"/cart"} style={{textDecoration:"none", color:"black"}}></Link><span><AddShoppingCartIcon className={classes.Shopping} /><div className={classes.CartNo}>{LoggedInUserData.Cart.length===0?"":`${LoggedInUserData.Cart.length}`}</div></span></Link>
    
{
  !LoggedInUserData.isAuthrized && 

<Link to={"/signup"}><Button variant="contained" className={classes.reister} >Register</Button></Link>
}
{
  LoggedInUserData.isAuthrized && 
<div style={{positon:"relative"}}>
<Avatar
  onClick={Toggle}
  sx={{ bgcolor:pink[400] }}
  alt={LoggedInUserData.firstName}
  src="/broken-image.jpg"
></Avatar>
<div className={classes.impForm} style={{display:`${Style}`}}>
  <ul className={classes.line}>
    <li>hi, {LoggedInUserData.firstName}</li>
    <hr style={{width:"70%",margin:"auto"}}/>
    <li onClick={Logout} style={{cursor:"pointer"}}>Logout</li>
  </ul>
  </div>
</div>
}
    </div>

  )
}

export default Navbar