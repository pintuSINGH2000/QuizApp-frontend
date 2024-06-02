import React, { useRef, useState } from 'react'
import styles from './authComponent.module.css'
import Login from '../Login/Login';
import Register from '../Register/Register';
import { loginApi } from '../../api/auth';
import { registerApi } from './../../api/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const AuthComponent = ({isLogin}) => {
    const [login] = useState(isLogin);
    const [processing,setProcessing] = useState(false);
    const navigate = useNavigate();
    const submitRef = useRef();
    const handleChange = (login) => {
        if(login){
            navigate("/login");
        }else{
            navigate("/register");
        }
    }

    const handleAuthButtonClick = () => {
        if (submitRef.current) {
          submitRef.current.handleSubmit();
        }
      };
    const handleSubmit = async (formData) => {
        if(processing) return;
        setProcessing(true);
        try{
           if(login){
            const res = await loginApi(formData);
            if(res){
                navigate("/");
            }
           }else{
            const res = await registerApi(formData);
            if(res){
                navigate("/login");
            }
           }
           setProcessing(false);
        }catch(error){
            setProcessing(false);
        }
    }
  return (
    <div className={`${styles.container} flexbox-center`}>
      
        <div className={`${styles.card} flexbox-center bg-white`}>
              
             <h1 className={`${styles.title} light-black`}>QUIZZIE {isLogin} </h1>
             <div className={`${styles.auth} flexbox-space-between`}>
                <h2 className={`${styles.authTitle} poppins-600 cursor-pointer light-black ${!login&& `${styles.selectedAuth} flexbox-center bg-white border-radius-primary`}`} onClick ={()=> handleChange(false)}>Sign Up</h2>
                <h2 className={`${styles.authTitle} poppins-600 cursor-pointer light-black ${login&& `${styles.selectedAuth} flexbox-center bg-white border-radius-primary`}`} onClick ={()=> handleChange(true)}>Log In</h2>
             </div>
             {login ?(<Login ref={submitRef} onSubmit={handleSubmit} />):<Register ref={submitRef} onSubmit={handleSubmit} />}
             <button className={`${styles.submit} light-black poppins-600 flexbox-center border-none cursor-pointer border-radius-primary ${login&&styles.login}`} onClick={handleAuthButtonClick} >{processing?<Spinner />:(login?"Log In":"Sign-Up")}</button>
        </div>
    </div>
  )
}

export default AuthComponent