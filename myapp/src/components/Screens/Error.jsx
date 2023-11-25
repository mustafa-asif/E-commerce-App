import React, {useNavigate} from 'react';
import { CircularProgress ,Stack,Button,TextField, Typography } from "@mui/material";


const Error = () => {
    const navigate=useNavigate();
    const signUpHandlrer=()=>{
        navigate('/');
    }
  return (<>
    <div>no such page found</div>;
    <div><Button onClick={signUpHandlrer}>
        Sign Up</Button></div>
  </>

  )
}

export default Error;