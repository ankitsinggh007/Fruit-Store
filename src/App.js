import { createUserWithEmailAndPassword , getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Route,Routes,Navigate, useNavigate } from "react-router-dom";
import MainBody from "./Component/MainBody";
import { query, where,getDoc } from "firebase/firestore";
import Navbar from "./Component/Navbar";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Categories from "./pages/Categories"
import { useState,useEffect, createContext } from "react";
import { collection, addDoc } from "firebase/firestore";  
import DataBase from "./Component/Firbase"
import { getDocs } from 'firebase/firestore';
import Categories_page from "./pages/Categories_page";
import Desciption from "./pages/Desciption";
import Wishlist from "./pages/Wishlist";
export const User=createContext({});
function App() {
 const [Data, setData] = useState();
 const API_KEY=`AIzaSyCFwMBb4r146zfcv-IrdUn-vk8_asDkvck`;
  const Navigate=useNavigate();
  const [Creadential, setCreadential] = useState({fname:"",lname:"",email:"",Gender:"",Password:""});
  const [LoggedInUserData, setLoggedInUserData] = useState({id:"",firstName:"",lastName:"",email:"",Gender:"",isAuthrized:false,Cart:[]});

 const auth = getAuth();
//  Fetch Data
const FetchData= async (email)=>{
  const citiesRef = collection(DataBase, "User");
  const q = query(citiesRef, where("email", "==", `${email}`));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setLoggedInUserData({...LoggedInUserData,...doc.data(),isAuthrized:true,id:doc.id});
  });
}
// Creat user in DataBase
   const CreateUserInDataBase = async ()=>{
  console.log("Data saved in datbase,before")
console.log(Creadential)
    const DocRef= await addDoc(collection(DataBase,"User"),{
    email:Creadential.email,
    firstName:Creadential.fname,
    lastName:Creadential.lname,
  }); 
  console.log("Data saved in datbase,after")

  alert("Registration successful!");
  Navigate("/login")
 }
// Create User
const createUser=async (email,password)=>{
     createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Data saved in authentication")
      CreateUserInDataBase();

  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setCreadential({...Creadential,message:errorCode.split("/")[1]})
      alert(`${errorCode.split("/")[1]}`);
      
  }); 
}
// Login User
const verifyCredential=async()=>{
   const res= await signInWithEmailAndPassword(auth, Creadential.email, Creadential.Password)
    .then((userCredential) => {
      const user = userCredential.user;
      FetchData(user.email);
      alert("logged in success")
      Navigate("/")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setCreadential({...Creadential,message:errorCode.split("/")[1]})
      alert(`${errorCode.split("/")[1]}`);


    });
  
}
 
  return (
    <User.Provider value={{Creadential,setCreadential,createUser,verifyCredential,LoggedInUserData,setLoggedInUserData}}>
      <Navbar/>
      <Routes>
      { !Creadential.isAuthrized && <Route path={'/login'} element={<Login/>}/>}
      {!Creadential.isAuthrized && <Route path={'/Signup'} element={<Signup/>}/>}
      <Route path={'/'} element={<MainBody/>}/>
      <Route path={'/cart'} element={<Cart/>}/>
      <Route path={'/categories'} element={<Categories/>}/>
      <Route path={'/wishlist'} element={<Wishlist />}/>
      <Route path={'/*'} element={<Navigate to={"/"}/>}/>
      <Route path={'/categories/:params'} element={<Categories_page/>}/>
      <Route path={'/categories/:params/:name'} element={<Desciption/>}/>
      
      </Routes>
    </User.Provider>
  );
}

export default App;
