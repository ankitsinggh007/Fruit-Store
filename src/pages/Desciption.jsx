import React,{useState,useEffect,useContext} from 'react';
import { useParams,Link } from 'react-router-dom';
import classes from "./Desciption.module.css"
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { doc, updateDoc } from "firebase/firestore";
import { User } from '../App';
import db from '../Component/Firbase';


function Desciption() {
    const API_KEY=`AIzaSyCFwMBb4r146zfcv-IrdUn-vk8_asDkvck`;
  const {LoggedInUserData,setLoggedInUserData} = useContext(User)

    const [Data, setData] = useState([]);

    const { name } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&maxResults=40&key=${API_KEY}`);
            const data = await response.json();
            console.log(data, "data")
            const result = data?.items?.filter(obj => (obj.volumeInfo && obj.volumeInfo.imageLinks && obj.volumeInfo.imageLinks.thumbnail && obj.volumeInfo.title && obj.volumeInfo.authors && obj.volumeInfo.description));
            console.log(result);
            setData(result[0])


        }
        fetchData();
    }, [])
const addToCart=async(Data)=>{
    if(LoggedInUserData.isAuthrized){
        const obj={
          thumbnail:Data?.volumeInfo?.imageLinks?.thumbnail,
          title:Data?.volumeInfo?.title,
          author:Data?.volumeInfo?.authors[0],
          language:"English",
          price:"200",
        }
        setLoggedInUserData({...LoggedInUserData,Cart:[...LoggedInUserData.Cart,obj],isbpn_Cart:[...LoggedInUserData.isbpn_Cart,Data?.volumeInfo?.title]});
        // setLike("s");
        const washingtonRef = doc(db, "User", LoggedInUserData.id);
      
      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        Cart:LoggedInUserData.Cart,
        isbpn_Cart:LoggedInUserData.isbpn_Cart
      });
      }
}

    return (
        <div className={classes.container}>
        <div>
        {
            Data.length!=0 &&
            
            <div className={classes.Deatils}>
                <h1 className={classes.header}>{name}</h1>
            <div className={classes.image} style={{backgroundImage:`url(${Data?.volumeInfo?.imageLinks?.thumbnail})`}} />
            <div className={classes.author}>{Data.volumeInfo.authors[0]}</div>
            <div className={classes.price}></div>
            <div className={classes.rating}>Rating:{Math.floor(Math.random() * (5 - 3 + 1)) + 3}/5</div>
            <div className={classes.description}>
                <span className={classes.header}>Description</span>
                <p className={classes.paragraph}>{Data.volumeInfo.description}</p>
            </div>
        </div>
        }
        </div>
        <div className={classes.action}>
{
    !LoggedInUserData.isbpn_Cart.includes(Data?.volumeInfo?.title) &&
       <Button onClick={()=>addToCart(Data)} variant="contained" style={{backgroundColor:"#161619",padding:"15px",fontSize:"1.2rem"}}><ShoppingCartIcon/>&nbsp; Add To Cart</Button>

}
{
    LoggedInUserData.isbpn_Cart.includes(Data?.volumeInfo?.title) &&
       <Button onClick={()=>addToCart(Data)} variant="contained" style={{backgroundColor:"#161619",padding:"15px",fontSize:"1.2rem"}}><ShoppingCartIcon/>&nbsp; In Cart</Button>

}
        </div>

        </div>
    )
}

export default Desciption