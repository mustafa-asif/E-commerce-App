import {useState,useEffect,}from 'react';
import { CircularProgress ,Stack,Button,TextField, Typography } from "@mui/material";

import {  onAuthStateChanged } from "firebase/auth";
import { auth} from '../config/FirebaseAuth';
import { getDatabase, ref, set,push } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
// import { Storage } from '../config/FirebaseAuth';
import {uploadBytes,ref as reference,getDownloadURL,getStorage} from "firebase/storage";



const Sell = () => {

  const [image,setImage]=useState('')
  const [uid, setUid] = useState('');

  // state for sending image to database storage;
  const [uploadImage, setUploadImage] = useState('');
  
    
    let imageMetaData;
    const ImageHandler=(e)=>{
      imageMetaData=URL.createObjectURL(e.target.files[0]);
      console.log(imageMetaData);
        setImage(imageMetaData);
      }
      
      const navigate=useNavigate();
        useEffect(()=>{
          onAuthStateChanged(auth, (user) => {
            if (user) {
                
              
                const uid = user.uid;
               setUid(uid);
              console.log(uid);
            } else {
              console.log("nouser")
              navigate('/login')

            }
          });

        },[])
        // console.log(uid);
       
        
        
        const sendDataToDatabaseHandler=async()=>{
          try {
            
            const db=getDatabase();
            const Storage=getStorage();
            
            console.log(db);
            const keyRef=ref(db);
            console.log(uid);
            const newPostKey=push(keyRef).key;
            
            console.log(newPostKey);
            const imageRef=reference(Storage,`images/.${uploadImage.name}jpeg/png`+newPostKey);
            console.log(imageRef);
            const imageUpload=await uploadBytes(imageRef,uploadImage);
            console.log(imageUpload);
            const imgURL =  await  getDownloadURL(imageUpload.ref)  
            console.log(imgURL);
            set(ref(db, 'products/' + newPostKey), {
              title:input.productTitle,
              description:input.productDesc,
              price:input.productPrice,
              user:uid,
              imageUrl:imgURL
              
            });
            navigate('/home')
          } catch(error){
            console.log(error);
          }
          
          

        }
        const [input, setInput] = useState({});
        const inputChangeHandler=(e)=>{
          setInput(prev=>({
            ...prev,
            [e.target.id]:e.target.value
          }))

        }
        console.log(input);



  return (<Stack>
    <Navbar value='Buy'/>
    <Stack sx={{
      mt :'5px',
      gap:'2px'
    }}>
    <TextField sx={{
      m:'5px',
      gap :'2px'
    }} id='productTitle' label='Product Title' variant='outlined' onChange={inputChangeHandler} />
    <TextField  sx={{
      m:'5px',
      gap :'2px'
    }}id='productDesc' label='Product Description' variant='outlined' onChange={inputChangeHandler} />
    <TextField sx={{
      m:'5px',
      gap :'2px'
    }} id='productPrice' label='Product Price' variant='outlined' type='number' onChange={inputChangeHandler} />


    <input  type="file"  accept='image/png,image/jpeg' onChange={(e) =>{
      ImageHandler(e);
      setUploadImage(e.target.files[0]);
    }} />
    {image && <img src={image} alt='Product image' width={200} height={200} />}

    {/* <Button onClick={uploadImage}   sx={{
      mt :"10px",
      gap:'2px'
      }} variant='contained'>
      upload
    </Button> */}
    <Button onClick={sendDataToDatabaseHandler}   sx={{
      mt :"10px",
      gap:'2px'
      }} variant='contained'>
      ADD
    </Button>

    </Stack>

 

  </Stack>
    
  )
}

export default Sell;