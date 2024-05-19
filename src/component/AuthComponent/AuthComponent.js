import React, { useRef, useState } from 'react'
import style from './authComponent.module.css'
import Login from '../Login/Login';
import Register from '../Register/Register';
import { loginApi } from '../../api/auth';
import { registerApi } from './../../api/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const AuthComponent = ({isLogin}) => {
    const [login,setLogin] = useState(isLogin);
    const [processing,setProcessing] = useState(false);
    const navigate = useNavigate();
    const submitRef = useRef();
    const handleChange = (login) => {
        console.log(login,"pintu",isLogin);
        if(login){
            navigate("/login");
        }else{
            navigate("/register");
        }
    }

    const handleParentButtonClick = () => {
        console.log(submitRef);
        if (submitRef.current) {
          submitRef.current.handleSubmit();
        }
      };
    const handleSubmit = async (formData) => {
        if(processing) return;
        console.log(formData);
        setProcessing(true);
        try{
           if(login){
            const res = await loginApi(formData);
            if(res){
                navigate("/");
            }
           }else{
            const res = await registerApi(formData);
            console.log(res);
            if(res){
                navigate("/login");
            }
           }
           setProcessing(false);
        }catch(error){
            setProcessing(false);
           console.log(error);
        }
    }
  return (
    <div className={style.container}>
      
        <div className={style.card}>
              
             <h1 className={style.title}>QUIZZIE {isLogin} </h1>
             <div className={style.auth}>
                <h2 className={`${style.authTitle} ${!login&&style.selectedAuth}`} onClick ={()=> handleChange(false)}>Sign Up</h2>
                <h2 className={`${style.authTitle} ${login&&style.selectedAuth}`} onClick ={()=> handleChange(true)}>Log In</h2>
             </div>
             {login ?(<Login ref={submitRef} onSubmit={handleSubmit} />):<Register ref={submitRef} onSubmit={handleSubmit} />}
             <button className={style.submit} onClick={handleParentButtonClick}>{processing?<Spinner />:(login?"Log In":"Sign-Up")}</button>
        </div>
    </div>
  )
}

export default AuthComponent