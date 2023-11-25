import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { CircularProgress ,Stack,Button,TextField, Typography } from "@mui/material";
import { auth} from '../config/FirebaseAuth';






const Login = () => {
    const [authData, setAuthData] = useState({});
    console.log(authData);
    const navigate=useNavigate();
onAuthStateChanged(auth, (user) => {
    if (user) {
        
      
      const uid = user.uid;
    } else {
      console.log("nouser")
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const setIsLoadingHandler=()=>{
        setIsLoading(prev=>!prev);
    }

  const signInHandler = () => {
    setIsLoadingHandler();
    signInWithEmailAndPassword(auth, authData.email, authData.password)
    .then((userCredential) => {
      // Signed in 
    setIsLoadingHandler();
    navigate('/home');

      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      setIsLoadingHandler();
      navigate('/')

      const errorCode = error.code;
      const errorMessage = error.message;
    //   setError(errorCode)
    });}

    const setInputHandler=(e)=>{
        setAuthData(prev=>(
            {
                ...prev,
                [e.target.id]:e.target.value
            }
           
        ))
    }

    const backToSignUp=()=>{
        navigate('/');
    }

    return (
        <Stack justifyContent={'center'} alignItems={'center'} height={'100vh'} bgcolor={"rgb(115,64,193)"}>
            <Stack sx={{
                boxShadow : "0px 10px 10px 0px gray",
                borderRadius: "10px",
                gap:"20px",
                p:10,
                bgcolor:"white"
                
            }}>
                <Stack justifyContent={"center" } alignItems={'center'}  >
                    <Typography>
                        Login
                    </Typography>
                </Stack>
                <Stack >
                    <TextField id="email" onChange={setInputHandler} label={"Email"} placeHolder={"Email..."}/>
                </Stack>
                <Stack>
                    <TextField id="password"  onChange={setInputHandler} type='password' label={"Password"} placeHolder={"Password..."}/>
                </Stack>
                <Stack>
                <Button variant='contained'  sx={{
        background: 'rgb(91,152,217,0.7)',
        background: 'linear-gradient(124deg, rgba(91,152,217,0.7) 27%, rgba(155,212,134,0.7) 100%)'
        
                }}
                onClick={signInHandler}>
                    {isLoading?<CircularProgress sx={{color:'white'}}/>:'Login'}
                </Button>
                </Stack>
                <Stack>
                    <Button  sx={{
        background: 'rgb(91,152,217,0.7)',
        background: 'linear-gradient(124deg, rgba(91,152,217,0.7) 27%, rgba(155,212,134,0.7) 100%)'
        
                }} onClick={backToSignUp}>Sign Up</Button>
                </Stack>
          
    
    
               
    
            </Stack>
    
    
        </Stack>
        
        
      )
 
}

export default Login