import React,{useContext} from 'react'
import classes from "./Wishlist.module.css"
import { User } from '../App'
function Wishlist() {
  const {LoggedInUserData,setLoggedInUserData} = useContext(User)

  return (
    <div className={classes.Wishlist}>
        <h1 style={{textDecoration:"underline"}}>Wishlist</h1>
        <div className={classes.containers}>
            {
                LoggedInUserData.Liked.map((obj,index)=>{
                    return(
                        <div className={classes.items}>
                            <img src={obj.thumbnail}/>
                            <h2>{obj.title}</h2>
                            <h2 style={{color:"grey"}}>{obj.author}</h2>
                            <h3>₹200</h3>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Wishlist