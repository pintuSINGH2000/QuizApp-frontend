import React, { forwardRef, useImperativeHandle, useState } from "react";
import style from "./register.module.css";

const Register = forwardRef(({ onSubmit }, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr:""
  });

  useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z\s]+$/;
  const passwordRegex =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; 
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // Simple client-side validation
    let flag=true;
    if (formData.name.trim().length===0 || !nameRegex.test(formData.name.trim())) {
       setFormError((prev) => ({...prev,"nameErr":"Invalid Name"}));
       setFormData((prev)=>({...prev,name:""}));
       flag=false;
    }else{
        setFormError((prev) => ({...prev,"nameErr":""}));
    }
    if (!emailRegex.test(formData.email.trim())) {
        setFormError((prev) => ({...prev,"emailErr":"Invalid Email"}));
        setFormData((prev)=>({...prev,email:""}));
        flag=false;
     }else{
        setFormError((prev) => ({...prev,"emailErr":""}));
     }
     if (!passwordRegex.test(formData.password.trim())) {
        setFormError((prev) => ({...prev,"passwordErr":"Weak password"}));
        setFormData((prev)=>({...prev,password:""}));
        flag=false;
     }else{
        setFormError((prev) => ({...prev,"passwordErr":""}));
     }
     if (confirmPassword.trim()!==formData.password.trim()) {
        setFormError((prev) => ({...prev,"confirmPasswordErr":"password doesn’t match"}));
        setConfirmPassword("")
        flag=false;
     }else{
        setFormError((prev) => ({...prev,"confirmPassword":""}));
     }
     if(flag){
        onSubmit(formData);
     }
  };
  return (
    <div className={style.container}>
      <div className={`${style.inputContinaer} flexbox-center`}>
        <label htmlFor="name"  className={`${style.label} poppins-600`}>Name </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`${formError.nameErr&&formData.name.length===0&&style.error} border-none ${style.input}`}
          value={formData.name}
          onChange={handleChange}
          placeholder={formError.nameErr}
        />
      </div>
      <div className={`${style.inputContinaer} flexbox-center`}>
        <label htmlFor="email" className={`${style.label} poppins-600`}>Email </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`${formError.emailErr&&formData.email.length===0 && style.error} border-none ${style.input}`}
          value={formData.email}
          onChange={handleChange}
          placeholder={formError.emailErr}
        />
      </div>
      <div className={`${style.inputContinaer} flexbox-center`} >
        <label htmlFor="password" className={`${style.label} poppins-600`}>Password </label>
        <input
          type="password"
          name="password"
          className={`${formError.passwordErr&&formData.password.length===0&&style.error} border-none ${style.input}`}
          value={formData.password}
          onChange={handleChange}
          placeholder={formError.passwordErr}
        />
      </div>
      <div className={`${style.inputContinaer} flexbox-center`}>
        <label htmlFor="confirmPassord" className={`${style.label} poppins-600`}>Confirm Password </label>
        <input
          type="password"
          id="confirmPassord"
          className={`${formError.confirmPasswordErr&&confirmPassword.length===0&&style.error} border-none ${style.input}`}
          value={confirmPassword}
          placeholder={formError.confirmPasswordErr}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );
});

export default Register;
