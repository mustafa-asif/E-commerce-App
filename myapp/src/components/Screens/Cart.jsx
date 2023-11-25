import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/FirebaseAuth';
import { Stack,Typography } from '@mui/material'


const Cart = () => {

    const [cartItems, setCartItems] = useState({});
    const [productIds,setProductIds] = useState([]);
    const [display,setDisplay] = useState()
    const [data,setData] = useState()
    const db = getDatabase();
  const productsRef = ref(db, 'products/');
  
  


  const navigation = useNavigate();
  const [uid,setUid] = useState('')
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        navigation('/login')
      }
    });
    getData();
  
  },[])
  

  useEffect(()=>{
      console.log('object')
      // setDisplay(Object.keys(cartItems));
    return data && setProductIds(Object.keys(data));},[data])
    console.log(productIds);
    
    
    const getData =()=>{
        
        onValue(productsRef, (snapshot) => {
             setData(() => snapshot.val());
      });
   

    
    
}
useEffect(()=>{
    setCartItems(JSON.parse(localStorage.getItem('/products')))
    
    },[]);
    console.log(cartItems);



    console.log(data);
    console.log(display);
  return (
    <div>
      <Navbar />
      <Stack margin={'0px 2px'}>

    {productIds && productIds.map((e,i)=><Stack key={i} flexDirection={'row'} sx={{
        alignItems: 'center',
        gap:2,
        border: '1px solid black',
        boxShadow:'0px 0px 10px gray',
        py:1,

    }}>
        <Stack sx={{
            width:150,
            height:150,
            overflow: 'hidden',
            marginTop:2,
            
        }}>
            <img src={data[e].imageUrl} alt="" />
        </Stack>
        <Stack>
            <Typography fontWeight={'bolder'}>{data[e].title}</Typography>
            <Typography>{data[e].description}</Typography>
            <Typography>Rs.{data[e].price}</Typography>
            {/* <Typography>Qty:{cartItems[e]}</Typography> */}
        </Stack>
    </Stack>)}  

            </Stack>

    </div>
  )
}

export default Cart