import React, { forwardRef, useImperativeHandle, useState } from 'react';
import style from './login.module.css';

const Login = forwardRef(({ onSubmit }, ref) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      useImperativeHandle(ref, () => ({
        handleSubmit
      }));

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
            onSubmit(formData);
      };

      return (
        <div className={style.container}>
          <div className={style.inputContinaer}>
            <label htmlFor="email" className={style.label}>Email </label>
            <input
              type="email"
              id="email"
              name="email"
              className={style.input}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={style.inputContinaer} >
            <label htmlFor="password" className={style.label}>Password </label>
            <input
              type="password"
              name="password"
              className={style.input}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
      );
    });

export default Login