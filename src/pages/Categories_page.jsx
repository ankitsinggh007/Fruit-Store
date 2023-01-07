import { ClassNames } from '@emotion/react'
import React,{useState,useEffect,useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import classes from "./Categories_pages.module.css";
import BestSelling from '../Component/Data/BestSellingbook';
import {MdFavoriteBorder} from "react-icons/md"
import { User } from '../App';
import { doc, updateDoc } from "firebase/firestore";
import db from '../Component/Firbase';
function Categories_page() {
  const {LoggedInUserData,setLoggedInUserData} = useContext(User)
  const Navigate=useNavigate();

const API_KEY=`AIzaSyCFwMBb4r146zfcv-IrdUn-vk8_asDkvck`;
const [Data, setData] = useState([]);
const params=useParams();
 const [Like, setLike] = useState("");
useEffect( () => {
  const fetchData= async ()=>{
    const response=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${params.params}&maxResults=40&key=${API_KEY}`);
  const data=await response.json();
      console.log(data,"data")
  const result=data?.items?.filter(obj=>(obj.volumeInfo &&obj.volumeInfo.imageLinks &&obj.volumeInfo.imageLinks.thumbnail &&obj.volumeInfo.title && obj.volumeInfo.authors && obj.volumeInfo.description ));
  // setData(result);.
  console.log(result);
  setData(result)



  }
  fetchData();
}, [])

const LikedBook=async(data)=>{
if(LoggedInUserData.isAuthrized){
  const obj={
    thumbnail:data?.imageLinks?.thumbnail,
    title:data?.title,
    author:data?.authors[0],
    language:"English",
    price:"200",
  }
  setLoggedInUserData({...LoggedInUserData,Liked:[...LoggedInUserData.Liked,obj],isbpn:[...LoggedInUserData.isbpn,data.title]});
  // setLike("s");
  const washingtonRef = doc(db, "User", LoggedInUserData.id);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  Liked:LoggedInUserData.Liked,
  isbpn:LoggedInUserData.isbpn
});
}
}
console.log(Data)
    return (
<>
<h1 style={{textAlign:"center"}} >{params.params}</h1>
<div className={classes.Categories_container}>
       {Data.length!=0 &&
        Data.map((Data,index)=>{
          
          return(
            <div className={classes.Categories_items}>
<span onClick={()=>LikedBook(Data?.volumeInfo)} >
<MdFavoriteBorder className={classes.icon} fontSize={"1.6rem"}    fill={LoggedInUserData.isbpn.includes(`${Data?.volumeInfo?.title}`)?"red":"blue"}/>

</span>
            <div className={classes.Categories_img}  onClick={()=>Navigate(`/categories/${params.params}/${Data.volumeInfo.title}`)} style={{backgroundImage:`url(${Data?.volumeInfo?.imageLinks?.thumbnail})`}} />
            <div className={classes.deatils}>
            <span style={{fontSize:"1.2rem"}}>{Data.volumeInfo.title}</span>
            <span style={{fontSize:"1rem",color:"grey"}}>{Data?.volumeInfo?.authors[0]}</span>
            <span style={{color:"grey"}}><span style={{color:"black"}}>Language:</span>{Data.volumeInfo.language?"English":"Hindi"}</span>
            <span>₹{200}</span>
            </div>
            </div>
          )

        })
       }
        </div>
        </>

  )
}

export default Categories_page