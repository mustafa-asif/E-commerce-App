import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { getDatabase,ref, child, get,push } from "firebase/database";
import { CircularProgress ,Stack,Button,TextField, Typography } from "@mui/material";
import Cart from './Cart';
import './Home.css';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const navigate=useNavigate();
  const [productData, setProductData] = useState([]);
  // const [productKeysArray,setProductKeysArray]=useState({});
  useEffect(()=>{
    getProducts();
    
  },[]);

  const getProducts= async()=>{
    try {
      const dbRef = ref(getDatabase());
      const response=await get(child(dbRef, `products/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        // setProductData(snapshot.val());
        const data=snapshot.val();
        setProductData(data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    } catch (error) {
      console.log(error);
      
    }
  }
  console.log(productData);
  const productkeys=Object.keys(productData);
  console.log(productkeys);
  // console.log(productData.length);

  const addToCartHandler=()=>{
    navigate('/cart');
    <Cart/>
    
    
  }
  
  
  
  

  



  return <Stack > 
    <Stack>

  <Navbar/>
    </Stack>
  <Stack flexDirection={'row'} display={'flex'} flexWrap={'wrap'} gap={8}sx={{
    sm :'12',
    xs :'12',
    md:'6',
    lg:'3',
    
  }} >
    {
      productkeys.map((e,i)=>{
        return(<div    className='cards' key={i}>
          <Stack  flexDirection={'column'}  sx={{
            width:'100%',
            marginLeft:'10px',
            
            
            
            
            // m:'5px',
            borderRadius:'10px',
            boxShadow:'5px 5px 30px gray',
            
            p:'10px',
            
            
            
            
          } }  >

          <Stack width={'100%'} >
            <img src={productData[e].imageUrl} alt="image"  />
          </Stack>
          <Stack>
            <Typography borderBottom={"1px solid black"} mt={'9px'} fontWeight={'bold'}  >
              Product Title : {
              productData[e].title
            }
            </Typography>

            <Typography sx={{
              m: '5px ',
              width:'100%',
              overflowWrap:'anywhere',
              fontWeight:'bold'
              
              
            
            }}>
              Description :  {
              productData[e].description
            }
            </Typography>
          </Stack>
         
         
          <Stack  justifyContent={'end'} alignItems={'end'} >
            <Button onClick={addToCartHandler} variant='contained' p={'10px 20px'} sx={{
              
              width:'100px'
              
            }} >
              $ 
              {
              productData[e].price
            }
            
            </Button>
          </Stack>

            </Stack>

          
          
          
          
          
          
           </div>)
           
      })
    }
  </Stack>
  
  
  



  
 

  </Stack>
  
}

export default Home