import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './login.module.css';

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
        <div className={styles.container}>
          <div className={styles.inputContinaer}>
            <label htmlFor="email" className={`${styles.label} poppins-600 light-black`}>Email </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContinaer} >
            <label htmlFor="password" className={`${styles.label} poppins-600 light-black`}>Password </label>
            <input
              type="password"
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
      );
    });

export default Login